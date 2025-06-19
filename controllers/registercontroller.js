const userDB={
    users:require("../nodejs_web_server-main/models/users.json"),
    setUsers: function(data) {
        this.employees = data;
    }
};

const fspromises=require('fs').promises 
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser=async(req,res)=>{
    const{username,password}=req.body;
    if(!username || !password){
        return res.status(400).json({"message":"username and password are required"})
    }
    const duplicate=userDB.users.find(user=>user.username===username);
    if(duplicate){
        return res.sendStatus(409).json({"message":"username already exists"})
    }
    try{
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser={
            "username":username,
            "password":hashedpassword
        }
        usersDB.setUsers([...userDB.users,newUser]);
        console.log(newUser);
        
        await fspromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),JSON.stringify(usersDB.users))
            res.status(201).json({"message":"new user created"})
        
    }catch(err){
        console.error(err);
        res.status(500).json({"message":err.message});
    }
    
}
module.exports={handleNewUser};