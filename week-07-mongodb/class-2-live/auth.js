const jwt = require("jsonwebtoken");
const JWT_SECRET = "itsasecret";

function auth(req, res, next) {
  const token = req.headers.authorization;
  try {
    const decodedInfo = jwt.verify(token, JWT_SECRET);
    req.userId = decodedInfo.userId;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid Token" });
  }
}

module.exports = { auth, JWT_SECRET };
