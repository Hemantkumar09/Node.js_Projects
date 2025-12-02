import { Url } from "../Models/Url.js"
import shortid from "shortid"


export const shortUrl = async (req, res) => {
    const longUrl = req.body.longUrl
    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:2000/${shortCode}` 

    //save to database
    const newUrl = new Url({shortCode,longUrl});
    await newUrl.save();

    console.log("Url saved in DB: ", newUrl);
    res.render("index.ejs", {shortUrl});
}

export const getOriginalUrl = async (req,res) => {
   //get shortCode as Params
    const shortCode = req.params.shortCode;

    //find shortCode in DB
    const OriginalUrl = await Url.findOne({shortCode});

    if(OriginalUrl){
        res.redirect(OriginalUrl.longUrl);
    }else{
        res.json({message : "Invalid Short Code"})
    }
}