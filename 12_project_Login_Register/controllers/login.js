import { UserInfo } from "../Model/UserInfo.js";

export const UserLogin = async (req, res) => {
    const {email, password} = req.body;

    const user = await UserInfo.findOne({email});
    if(user.email !== email){
        res.render("login.ejs");
    }else if(user.password !== password){
        res.render("login.ejs");
    }else{
        res.render("Profile.ejs", {user});
    }
    
}