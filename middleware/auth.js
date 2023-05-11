import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(403).send({ message: "Unauthorized. You need to login as a user" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Authentication Failed" });
  }
};
