import express from "express";
import { addToHistory, getUserHistory } from "../controllers/meeting.controllers.js";
import auth from "../middleware/auth.middleware.js"


const router = express.Router();
//api/meeting/add_to_activity
router.post("/add_to_activity",auth,addToHistory);

// api/meeting/get_all_activity
router.get("/get_all_activity",auth,getUserHistory);

export default router;
