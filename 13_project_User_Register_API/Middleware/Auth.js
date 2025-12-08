import { UserDetails } from "../Model/User.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req,res,next) => {
    const token = req.header('Auth');   
    if(!token) return res.json({message: "Login First!"});

    const decode = jwt.verify(token,'userProtected');
    const id = decode.userId;
    let user = await UserDetails.findById(id);

    if(!user) return res.json({message: "User not Found."})

    req.user = user
    next();
}