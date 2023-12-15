import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import { Vendor } from "../model/vender.js";


export const userAuthentication = async(req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: 'login first'
        });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.Uuser = await User.findById(decoded._id);
    next();

}
export const vendorAuthentication = async(req, res, next) => {
    const { token2 } = req.cookies;
    if (!token2) {
        return res.status(404).json({
            success: false,
            message: 'login first'
        });
    }
    const decoded = jwt.verify(token2, process.env.JWT_SECRET);
    req.Vuser = await Vendor.findById(decoded._id);
    next();

}