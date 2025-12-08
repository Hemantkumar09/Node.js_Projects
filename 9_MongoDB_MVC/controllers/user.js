
import {User} from '../Models/User.js'

export const registerUser = async (req,res)=> {
    try{
        let user = await User.create(req.body);
        res.json({
            message: "Your form has been submitted successfully.", 
            newUser: user,
            success: true
        })
    }catch(err){
        res.json({
            message: err.message
        })
    }
}