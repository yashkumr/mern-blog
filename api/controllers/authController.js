import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

//register
export const signup = async(req, res) => {
  try {
    const { name, email, password } = req.body;

    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: false,
        message: "Already register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration ",
      error,
    });
  }
};

//login
export const signin = async(req, res)=>{
  try{
    const{email, password} = req.body;
    //validation
    if(!email || !password){
      return res.status(404).send({
        success:false,
        message:"Invalid email or password",
      })
    }
    //check user
    const user = await userModel.findOne({email})
    if(!user){
      return res.status(404).send({
        success:false,
        message:"Email is not registered",
      })
    }
    const match = await comparePassword(password, user.password);
    if(!match){
          res.status(200).send({
            success:false,
            message:"invalid password",
          });
    }
    //token
    const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
      expiresIn:"7d",
    });
    res.status(200).send({
      success:true,
      message:"login successfully",
      user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
      },
      token,
    });

  }catch(error){
    console.log(error)
  res.status(500).send({
    success:false,
    message:"error in login",
    error,
  })
  }
}

//google
export const google = async (req, res) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      //token
    const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
      expiresIn:"7d",
    });
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .send({
          success:true,
          message:"thanks for again login"
        })
        .json(rest);
    }
     else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new userModel({
        name:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
        
      });
      await newUser.save();
      //token
    const token = await JWT.sign({id: newUser._id}, process.env.JWT_SECRET,{
      expiresIn:"7d",
    });
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          
        })
        .send({
          success:true,
          message:"Thanks for Google login"
        })
        .json(rest);
    }
  } 
  catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in google login",
      error,
    })
  }
};
