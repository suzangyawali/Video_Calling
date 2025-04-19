import Meeting from "../model/meeting.model.js";
import User from "../model/user.model.js"
const getUserMeetingsByToken= async (data)=>{
     
      const user = await User.findById(data);
      if (!user) {
        throw new Error("User not found");
      }
      // Step 2: Fetch all meetings associated with the user's ID
     const meetings = await Meeting.find({ user_id: user._id }).sort({ scheduledAt: -1 });
     return meetings;
}


const addToHistory= async ({ userId, meeting_code }) => {
    if (!userId || !meeting_code) {
      throw new Error("Missing user ID or meeting code.");
    }

    const meeting = new Meeting({
      user_id: userId,
      meetingCode: meeting_code,
    });

    await meeting.save();
    return meeting;
  }


export default {
    getUserMeetingsByToken,addToHistory
};