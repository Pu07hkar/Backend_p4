import User from "../models/user.model.js"
import {cloudinaryUpload} from "../utils/cloudinary.js";

const registerUser = async (req,res)=>{
    const {email,username,password, fullName}=req.body;

    if(!email || !username || !password || !fullName){
        return res.status(400).json({message: "all fields are required!"})
    };
    
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message: "This Email already exists!"})
    }
    
    const avatarLocalPath = req.files.avatar[0].path;
    const coverImageLocalPath = req.files.coverImage[0].path;

    if(!avatarLocalPath){
        return res.status(400).json({message: "Avatar is required!"})
    }

    const avatar = await cloudinaryUpload(avatarLocalPath)
    const coverImage = await cloudinaryUpload(coverImageLocalPath);
    
    if(!avatar){
        return res.status(400).json({message: "Avatar upload failed!"})
    }

    const newUser =new  User({
        email,
        username: username.toLowerCase(),
        password,
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || ""

    });
    await newUser.save()
    return res.status(200).json({message: "new user is created succussfully"});

};

export {registerUser};