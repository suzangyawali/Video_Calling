import express from "express";// Importing Express.js framework for building the server
import dotenv from 'dotenv';
import bodyParser from "body-parser";//user JSON POST request is stored in req.body,bodyparser help u read data from body parser
import connectDB from "./database.js";// Custom module for MongoDB database using mongoose
import cookieParser from "cookie-parser";// Parses into JSON cookies sent by user browser and store in req.cookies 
import cors from 'cors';// Enables Cross-Origin Resource Sharing (allows frontend & backend on different domains to communicate)
import meeting from "./routes/meeting.route.js";
import user from "./routes/user.routes.js";
import logger from "./middleware/logger.middleware.js";

import { connectToSocket } from "./controllers/socket.controller.js";
import { createServer } from "node:http";
const app=express();
const server = createServer(app);
const io = connectToSocket(server);


dotenv.config(); 
connectDB();//calling connectDB function
// parse application/json
app.use(bodyParser.json());// parsed JSON { name: "John Doe", age: 30 } initial json { "name": "RAM"}
app.use(bodyParser.urlencoded({ extended: false }));//urlencoded data from HTMl like name=John+Doe&age=30 to JSON
app.use(logger);
app.use(cookieParser());//Cookie: username=JohnDoe; into req.cookies inform of JSON
app.use(
    cors({
      origin: process.env.APP_URL,//allow req from this domain only
    })
);

const PORT= process.env.PORT;

app.get("/",(req,res)=>{
    res.json({
        app:"Nodejs",
        version:"1.0",
    });
});
app.use("/api/user",user);
app.use("/api/meeting",meeting);

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`);
})