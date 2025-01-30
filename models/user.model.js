import mongoose , {Schema} from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    avatar:{
        type:String
    },
    coverImage:{
        type: String
    },
    refreshToken:{
        type:String
    }
},{timestamps: true});

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password, 10);
        next();
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.accessTokeGenerator= function (){
    return  jwt.sign({
        _id:this._id,
        email:this.email,
        fullName: this.fullName,
        username: this.username
    },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
    }
    )
}

userSchema.methods.refreshTokeinGenerator= function (){
    return  jwt.sign({
        _id:this._id
        
    },process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

const User = mongoose.model("User", userSchema);
export default User;