import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(401).json({ error: "unauthorized: no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "unauthorized: invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(404).json({ error: "user not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("error in protect route middleware: ", err);
    res.status(500).json({ error: "internal server error" });
  }
};

export default protectRoute;
