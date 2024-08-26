import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokenSetCookie.js";

export const updateFullname=async(req,res)=>{
    try
    {
        const userId = req.user._id;
        const {fullName:newFullName}=req.body;

        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        user.fullName=newFullName;
        await user.save();
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            gender:user.gender,
        });
    }
    catch(err)
    {
        console.log("error in updateFullname: ",err);
        res.status(500).json({ error: "internal server error" });
    }
}

export const updateUsername= async (req,res)=>{
    try
    {
        const userId = req.user._id;
        const {userName:newUserName}=req.body;

        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const already = await User.findOne({ userName:newUserName });
        if (already) {
          return res.status(400).json({ error: "username already exists" });
        }

        user.userName=newUserName;
        await user.save();
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            gender:user.gender,
        });
    }
    catch(err)
    {
        console.log("error in updateUsername: ",err);
        res.status(500).json({ error: "internal server error" });
    }
}

export const updatePassword=async(req,res)=>{
    try
    {
        const userId = req.user._id;
        const {oldPassword,newPassword,confirmPassword}=req.body;

        if(newPassword!=confirmPassword) return res.status(400).json({error:"passwords dont match"});
        if(oldPassword===newPassword)  return res.status(400).json({error:"New password cant be the same as old one"});

        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        const correctPassword = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!correctPassword) {
            return res.status(400).json({
                error: "Invalid credentials",
            });
        }

        const salt = await bcrypt.genSalt();
        const newHashedPassword=await bcrypt.hash(newPassword,salt);
        user.password=newHashedPassword;

        await user.save();
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            gender:user.gender,
        });
    }
    catch(err)
    {
        console.log("error in updatePassword: ",err);
        res.status(500).json({ error: "internal server error" });   
    }
    
}