import { Vendor } from "../model/vender.js";
import {  sendCookie2 } from "../utils/sendCookie.js";
import bcrypt from "bcrypt";
export const register = async (req, res, next) => {
  try {
      const { name, email, pass } = req.body;
    
    let user = await Vendor.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "Vender Exist",
      });
    }
    const hashedPass = await bcrypt.hash(pass, 10);
    user = await Vendor.create({ name, email, pass: hashedPass });
    sendCookie2(user, res, "register successfully", 200);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, pass } = req.body;
    let user = await Vendor.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Vendor doesnot exit",
      });
    }
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or pass",
      });
    }
    sendCookie2(user, res, `welcome back ${user.name}`, 202);
  } catch (error) {
    next(error);
  }
};


export const logout = (req, res) => {
  res
    .status(202)
    .cookie("token2", "", {
      expires: new Date(Date.now()),
    })
    .json({
      logout: "success",
    });
};