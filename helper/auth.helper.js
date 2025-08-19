import jwt from "jsonwebtoken"
const createAuthToken=(data)=>{
const token=jwt.sign(data,process.env.JWT_SECRET,{
    expiresIn:86400, // 1 day
});
return token;
}
export {createAuthToken};