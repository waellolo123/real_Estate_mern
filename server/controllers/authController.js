import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET='mijpztrgoigîjgêzaijgjôziej'

// sign up
export const signup = async (req, res, next) => {
  const {username, email, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({username, email, password: hashedPassword});
  try {
    await newUser.save();
    res.status(201).json(newUser)
  } catch (error) {
    next(error);
  }
}

// sign in
export const signin = async (req, res, next) => {
  const { email, password} = req.body;
  try {
    const validUser = await User.findOne({email});
    if (!validUser) return next(errorHandler(404, 'user not found'));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if(!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({id: validUser._id}, JWT_SECRET);
    const {password: pass, ...rest} = validUser._doc; 
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
// google signin
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({email});
    if(user){
      const token = jwt.sign({id: user._id}, JWT_SECRET);
    const {password: pass, ...rest} = user._doc; 
    res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), 
        email: req.body.email, 
        password: hashedPassword,
        avatar: req.body.photo
      });
      await newUser.save();
      const token = jwt.sign({id: newUser._id}, JWT_SECRET);
      const {password: pass, ...rest} = newUser._doc;
      await res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
}

// signout 
export const signout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('user has been logged out');
  } catch (error) {
    next(error);
  }
}


