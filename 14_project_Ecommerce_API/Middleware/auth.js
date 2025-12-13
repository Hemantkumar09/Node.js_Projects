import jwt from 'jsonwebtoken'
import { User } from '../Model/User.js';

export const isAuthenticated = async (req,res,next) => {
    const token = req.header('Auth');
    if(!token) return res.json({"message" : "Login First!"});

    const decode = jwt.verify(token, process.env.JWT)

    if(!decode) return res.json({"message" : "Incorrect token found."})

    const id = decode.userId;

    const user = await User.findById(id);

    if (!user) return res.json({"message" : "User not Found!", success : false})

    req.user = user;
    next();
}