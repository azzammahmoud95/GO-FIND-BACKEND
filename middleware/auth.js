import jwt from "jsonwebtoken";

export const checkAuth = (req, res) => {
  try {
    if(token == null){
        res.status(403).send({message: "Unauthorized You need to login as user"});
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = decoded;
    // console.log(req.userData);
    next();
  } catch (err) {
    res.status(403).json({ message: "Authentication Failed" });
  }
};
