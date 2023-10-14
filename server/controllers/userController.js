import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcrypt';

// update user
export const updateUser = async (req, res, next) => {
    // if(req.user.id !== req.params.id) return next(errorHandler(403, "you can update only your account"))
    try {
      if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password, 10);
      }
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar
        }
      }, {new: true})
      const {password, ...rest} = updateUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
}
// delete user 
export const deleteUser = async (req, res, next) => {
  // if(req.user.id !== req.params.id) return next(errorHandler(401, 'you can delete only your account'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
}









































