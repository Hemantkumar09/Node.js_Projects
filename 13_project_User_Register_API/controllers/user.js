import { UserDetails } from '../Model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config({path: '.env'});

export const register = async (req,res) => {
    console.log('req body- ', req.body);
    const {name, email, password} = req.body;
    if(name === "" || email === "" || password === "") return res.json({message : "All fields are required", success: false});
    
    //findind if email is available in database
    let user = await UserDetails.findOne({email});
    if(user) return res.json({message: "User already exists.", success: false});
        
    //hashing password
    const hashPassword = await bcrypt.hash(password, 10)
    //save in DB
    user = await UserDetails.create({
        name: name,
        email: email,
        password: hashPassword
    })

    return res.json({message: "User created successfully", success: true, user})
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    if(email === "" || password === "") return res.json({message : "All fields are required", success: false});

    //finding if email is available in database
    let user = await UserDetails.findOne({email});
    if(!user) return res.json({message: "Email doesn't exists, please Register.", success: false});

    //checking password from DB
    const ValidPassword = await bcrypt.compare(password, user.password);
    if(!ValidPassword) return res.json({message: "Invalid Password, please enter correct password!", success: false});

    var token = jwt.sign({ userId: user._id }, process.env.JWT, {expiresIn : '1d'});

    return res.json({message:`Login successful, Welcome ${user.name}`, token, success: true});
}