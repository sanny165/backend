const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  }
};

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password are required" });

  const duplicate = usersDB.users.find(user => user.username === username);
  if (duplicate)
    return res.status(409).json({ message: "Username already exists" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      roles: { "User": 2001 }  
    };

    usersDB.setUsers([...usersDB.users, newUser]);
    console.log("New user created:", newUser);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(usersDB.users, null, 2)
    );

    res.status(201).json({ message: "New user created" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
