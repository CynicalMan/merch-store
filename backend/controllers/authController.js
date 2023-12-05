import mongoose from "mongoose";
import UserData from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookie from "cookie-parser";
export const Register= async(req , res )=>
{
    try {
        const {email , password , name , phone , address}=req.body;
        if(!email || !password || !name || !phone || !address){
            return res.status(400).json({message : "All fields are required"});
        }
        const foundUser = await UserData.findOne({email}).exec();
        if(foundUser){
            return res.status(401).json({message : "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const user = await UserData.create({
            email,
            password:hashedPassword,
            name,
            phone,
            address,  
        });
        const accessToken = jwt.sign({
            UserInfo:{
                id:user._id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        const refreshToken = jwt.sign({
            UserInfo:{
                id:user._id,
            }
        }, process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
        res.cookie("jwt",refreshToken),{
            httpOnly:true,
            secure: true ,
            sameSite:"None",
            maxAge:1000*60 *60 * 24 * 7
        };
        res.json({accessToken,email:user.email ,
        name:user.name });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const Login= async(req , res)=>
{
    try {
        const {email , password }=req.body;
        if(!email || !password){
            return res.status(400).json({message : "All fields are required"});
        }
        const foundUser = await UserData.findOne({email}).exec();
        if(!foundUser){
            return res.status(401).json({message : "User Doesnt exist"});
        }

        const isMatched = await bcrypt.compare(password,foundUser.password);
        if(!isMatched){
            return res.status(401).json({message : "Wrong password"});
        }

        const accessToken = jwt.sign({
            UserInfo:{
                id:foundUser._id
            }
        },process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken,email:foundUser.email ,
        name:foundUser.name });

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const Logout = (req, res)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    res.clearCookie("jwt",{
        httpOnly:true,
        sameSite:"None",
        secure:true,
    })
    res.json({message:"Cookie Cleared"})

} 

