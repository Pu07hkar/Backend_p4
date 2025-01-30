import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.backend_project4, 
    api_key: process.env.COUDINARY_API_KEY, 
    api_secret: process.env.COUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

const cloudinaryUpload = async (filePath)=>{
    try {
        if(!filePath) return null
        const response = await cloudinary.uploader.upload(filePath)
        console.log("file uploaded successfully",response.url)
        return response;
    } catch (error) {
        fs.unlink(filePath) // it will remove the locally saved files
        return null;
    }
}

export {cloudinaryUpload}