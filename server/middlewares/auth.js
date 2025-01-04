const {validateToken} = require("../models/user");

async function authMiddleware(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({error: "Token is required"});
  }

  token = token.replace("Bearer ", "");
  try {
    const payload = await validateToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({error: "Invalid token"});
  }
}

async function adminOnlyMiddleware(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({error: "Forbidden"});
  }
  next();
}

async function adminOrTeacherMiddleware(req, res, next) {
  if (req.user.role !== "admin" && req.user.role !== "teacher") {
    return res.status(403).json({error: "Forbidden"});
  }
  next();
}

module.exports = {
  authMiddleware,
  adminOnlyMiddleware,
  adminOrTeacherMiddleware
};
