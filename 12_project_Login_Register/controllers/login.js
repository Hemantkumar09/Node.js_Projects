import { UserInfo } from "../Model/UserInfo.js";
// import { v2 as cloudinary } from 'cloudinary';


// cloudinary.config({ 
//     cloud_name: 'dhuaumafl', 
//     api_key: '617585827482663', 
//     api_secret: 'FwA-gvvsswjj7IFdDr6msMEx1XI' 
// });

export const UserLogin = async (req, res) => {
    // const file = req.file.path
    // const cloudinaryRes = await cloudinary.uploader.upload(file,{
    //     folder:"Node.js_Project_User_Info"
    // });
    // console.log("response:- ", cloudinaryRes);
    const {email, password} = req.body;

    const user = await UserInfo.findOne({email});
    if(user.email !== email){
        res.render("login.ejs");
    }else if(user.password !== password){
        res.render("login.ejs");
    }else{
        res.render("Profile.ejs", {user});
    }
    //res.redirect('/login-page');
    
}