import { User } from "../model/user.js";
import { sendCookie } from "../utils/sendCookie.js";
import bcrypt from 'bcrypt';


export const register = async (req, res, next) => {
 try {
   const { name, email, pass } = req.body;
   let user = await User.findOne({ email });
   if (user) {
     return res.status(404).json({
       success: false,
       messsage: 'User already exist'
     });
   }
   const hashedPass = await bcrypt.hash(pass, 10);
   user = await User.create({ name, email, pass: hashedPass });
   sendCookie(user, res, 'Registration successful', 202);
 } catch (error) {
   next(error);
  }
  
}


export const login = async (req, res,next) => {
  try {
    const { email, pass } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User doesnot exit'
      })
    }
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message:'Invalid email or pass'
      })
    }
    sendCookie(user, res, `welcome back ${user.name}`, 202);
  } catch (error) {
    next(error)
  }
}


export const getProfile = async (req, res) => {
  res.json({
    user: req.Uuser
  })
}

export const logout = (req, res) => {
  res.status(202).cookie('token', "", {
    expires: new Date(Date.now())
  }).json({
    success:true
  });
}