import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

const JWT_SECRET='mijpztrgoigîjgêzaijgjôziej'

export const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, 'Unauthorized'));
  jwt.verify(token,JWT_SECRET, (err, user)=>{
    if(err) return next(errorHandler(403, 'Forbideb'));
    req.user=user;
    next();
  })
}