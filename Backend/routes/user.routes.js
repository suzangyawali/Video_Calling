import express from "express";
import { login, register } from "../controllers/user.controllers.js";


const router=express.Router();
//api/user/login
router.post("/login",login)
//api/user/register
router.post("/register",register)

export default router;