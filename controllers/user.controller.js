import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import userService from "../services/user.services.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

const registerUser = async (req, res) => {
    const errors = validationResult(req);   //if separate middleware is there, this can be handled there only.
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { fullname, email, password} = req.body;

    const isUserAlready  = await userModel.findOne({ email });

    if(isUserAlready){
        return res.status(400).json({ message: "User already exist" });
    }

    const hashedPassword = await userModel.hashPassword(password);   //as it is statics not methods, thats why called with userModel not user like generateAuhToken() below.

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user});
};

const loginUser =  async(req, res) => {
    const errors =  validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');   //by default, it will not select password due to 'select: false' in userModel

    if(!user){
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();

    //adding token as cookie as well(if authenticating using without header 'authrorization'
    res.cookie('token', token);

    res.status(200).json({ token, user});
}

const getUserProfile = async(req, res) => {
    const user = req.user;

    res.status(200).json({ user });
}

const logoutUser = async(req, res) => {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({ token});     //still need to update authUser mw to detect blacklisted token as user can use it.

    res.status(200).json({ message: "Logged out"});
}

export default {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
}