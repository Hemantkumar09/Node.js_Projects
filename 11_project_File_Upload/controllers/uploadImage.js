import { v2 as cloudinary } from 'cloudinary';
import { ImageFile } from '../Model/Image.js';

cloudinary.config({ 
        cloud_name: 'dhuaumafl', 
        api_key: '617585827482663', 
        api_secret: 'FwA-gvvsswjj7IFdDr6msMEx1XI' 
    });

export const uploadImage = async (req, res) => {
  const file = req.file.path
  const cloudinaryRes = await cloudinary.uploader.upload(file,{
    folder:"Node.js_Project_File_Upload"
  });

  //save in DB
  const dbSave = await ImageFile.create({
    filename: file.originalname,
    public_id: cloudinaryRes.public_id,
    imageUrl: cloudinaryRes.secure_url
  }) 

  res.render("index.ejs", {url: cloudinaryRes.secure_url});
}