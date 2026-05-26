const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

async function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  try {
    const decodedInfo = await jwt.verify(token, JWT_ADMIN_SECRET);
    req.userId = decodedInfo.userId;

    next();
  } catch (e) {
    res.status(403).json({
      msg: "Invalid token",
    });
  }
}

module.exports = { adminMiddleware };
