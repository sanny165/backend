const fspromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const usersDB={
    users:require(path.join(__dirname,'..','models','users.json')),
    setUsers:function(data) {
        this.users=data;
    }
};



const jwt=require("jsonwebtoken");
const { access } = require('fs');
require('dotenv').config();

const handleLogin = async (req, res) => {
    console.log("BODY:", req.body);

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }

    const foundUser = usersDB.users.find(person => person.username === username);
    if (!foundUser) {
  return res.status(401).json({ message: "User not found" });
}
    const roles = Object.values(foundUser.roles || {});

    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        const accessToken=jwt.sign(
            {"UserInfo":{'username': foundUser.username,"roles":roles}},

            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'120s'}      
                );
            const refreshToken=jwt.sign(
            {'username': foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}      
                );
            const otherUsers= usersDB.users.filter(person => person.username !== foundUser.username);
            const currentUser={...foundUser,refreshToken}
            usersDB.setUsers([...otherUsers,currentUser]);
            await fspromises.writeFile(
  path.join(__dirname, '..', 'models', 'users.json'),
  JSON.stringify(usersDB.users, null, 2)
);
            res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'none',secure:true})
            res.json({accessToken});
    } else {
        res.sendStatus(401); // Unauthorized
    }
}
module.exports = {handleLogin};