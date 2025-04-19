import mongoose from "mongoose";
const meetingSchema = new mongoose.Schema({
    user_id: 
    { 
        type:String 
    },
    meetingCode:
     { 
        type: String, 
        required: true
     },
    scheduledAt:
     { 
        type: Date,
         default: Date.now(), 
         required: true }
});
export default mongoose.model("Meeting",meetingSchema);