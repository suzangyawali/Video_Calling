import meetingService from "../services/meeting.services.js"

const getUserHistory= async(req,res)=>{

    // The user is already authenticated by the middleware, and req.user contains the decoded payload
    const userId = req.user.id; // Extract the user ID from the decoded token
    try{
        // Step 2: Call the service function to fetch the user's meeting history
       const meetings = await meetingService.getUserMeetingsByToken(userId);
        res.json(meetings);
    }catch(error){
       res.status(500).send(error.message);
    }
    
 }



const addToHistory = async (req, res) => {
   try {
     const userId = req.user?.id;
     const { meeting_code } = req.body;
 
     if (!userId || !meeting_code) {
       return res.status(400).send( "Missing required fields" );
     }
 
     const savedMeeting = await meetingService.addToHistory({ userId, meeting_code });
 
     res.status(201).send( "Added code to history");
   } catch (err) {
     console.error(err);
     res.status(500).send( "Server error" );
   }
 };

export  {getUserHistory,addToHistory};