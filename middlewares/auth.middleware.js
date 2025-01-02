import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


export const authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];    //i.e. Authorization: "Bearer tokenId" as key-value pair in headers

    if(!token){
        return res.status(401).json({ message: "Unauthorized notken" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);     //verify not decode as used in food app(there is auth0 involved)
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: error.toString() });
    }
}