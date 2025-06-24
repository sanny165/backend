const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log("JWT verification error:", err.message);
        return res.sendStatus(403); // Forbidden
      }

      console.log("Decoded token:", decoded);

      req.user = decoded.UserInfo.username;
      req.roles = Object.values(decoded.UserInfo.roles); // ✅ convert to array


      next();
    }
  );
};

module.exports = verifyJWT;
