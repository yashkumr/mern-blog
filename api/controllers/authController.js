import { hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

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
