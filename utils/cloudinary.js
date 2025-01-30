import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.COUDINARY_CLOUD_NAME, 
    api_key: process.env.COUDINARY_API_KEY, 
    api_secret: process.env.COUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

const cloudinaryUpload = async (filePath)=>{
    console.log(filePath)
    try {
        if(!filePath){
            return null;
        }
        const response = await cloudinary.uploader.upload(filePath,{resource_type:"auto"})
        fs.unlinkSync(filePath);
        console.log("file uploaded successfully",response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
       console.log("cloudinary upload is failed")
        return null;
    }
}

export {cloudinaryUpload}