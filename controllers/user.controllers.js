import authService from '../services/auth.services.js'; 
import { createAuthToken } from "../helper/auth.helper.js";
   
    const login= async (req,res)=>{
     const data=req.body;
         try{ 
        const user= await authService.login(data);//database bata info jikerw JSON format ma dinxa valid vaye
        const token=createAuthToken(user);//User Json bata token generate garne
        res.cookie("AuthToken",token,{httpOnly:true});//only server access cookie
        res.json({...user,token});
        }catch(error){
        res.status(500).send(error.message);
        }
     }
    
     const register=async(req,res)=>{
        const data=req.body;
        if(!data.name|| !data.email || !data.password){
            return  res.status(422).send("Required data are missing");
        }
        if(data.password!==data.confirmPassword){
            return res.status(400).send("Password don't match");
        }
        if(data.password.length<6){
            return res.status(400).send("Password length must be greater than 6");
        }
        try{
            const user= await authService.register(data);
            const token = createAuthToken(user);
            res.cookie("authToken",token);
            res.json(user);
        }catch(error){
            res.status(500).send(error.message);
        }
        
     }
     export  {register,login};
     

