const logger=(req,res,next)=>{
    console.log(`Method:${req.method} \nURL: ${req.originalUrl}`);
    // if(req.method === "DELETE"){
    //    return res.status(405).send("Delete not allowed");
    // }
    next();
};
export default logger;