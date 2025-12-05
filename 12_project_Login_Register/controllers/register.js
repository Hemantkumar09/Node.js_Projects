import { UserInfo } from "../Model/UserInfo.js";
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({ 
    cloud_name: 'dhuaumafl', 
    api_key: '617585827482663', 
    api_secret: 'FwA-gvvsswjj7IFdDr6msMEx1XI' 
});

export const registerUserInfo = async (req, res) => {
    const file = req.file.path
    const cloudinaryRes = await cloudinary.uploader.upload(file,{
        folder:"Node.js_Project_User_Info"
    });
    console.log("response:- ", cloudinaryRes);
    const {name, email, password} = req.body;

    //saving User details to DB
    const dbSave = await UserInfo.create({
        name,
        email,
        password,
        filename : file.originalName,
        public_id: cloudinaryRes.public_id,
        imgUrl: cloudinaryRes.secure_url
    })

    res.redirect('/login-page');
    
}