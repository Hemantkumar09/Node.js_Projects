import { User } from "../Model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const userRegister = async (req, res) => {
    const {name, email, password} = req.body;
    console.log("req body- ", req.body);
    let user = await User.findOne({email});
    console.log("user - ", user);
    if(user) return res.json({"message" : "User already exists.", success: false})

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name,
        email,
        password: hashPassword
    })

    return res.json({"message": "User Registered!", user, success: true})
    
}

export const userLogin = async (req,res) => {
    const {email, password} = req.body;

    let user = await User.findOne({email})
    if(!user) return res.json({"message" : "User doesn't exists.", success : false});

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) return res.json({"message" : "Invalid Password!", success : false});

    const token = jwt.sign({ userId: user._id }, process.env.JWT, {expiresIn: '1d'});

    return res.json({"message" : `Login Successful. Welcome ${user.name}`, token, success : true})

}