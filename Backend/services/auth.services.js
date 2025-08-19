import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

const login=async(data)=>{
  const existingUser = await User.findOne({email:data.email});
  if(!existingUser) throw new Error("Email or password doesn't match");
  const isMatch=bcrypt.compareSync(data.password,existingUser.password);
  if(!isMatch) throw new Error("Email or Password doesn't match");
  return {
     id:existingUser._id,
     name:existingUser.name,
     email: existingUser.email,
     roles:existingUser.roles,
  };
 }

 const register=async(data)=>{
    const userExist= await User.findOne({email:data.email});
    if (userExist) throw new Error("Email already exists");
    const hashPassword=bcrypt.hashSync(data.password)
    const createdUser=await User.create({
        name:data.name,
        email:data.email,
        password:hashPassword,
        roles:data.roles,
    })
    return {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        roles: createdUser.roles,
      };
 }
 export default {
    login,register
}