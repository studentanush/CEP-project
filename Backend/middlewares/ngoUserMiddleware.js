import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../routes/authRouter.js";

export const ngoUserMiddleware = (req,res,next)=>{

    const header = req.headers["authorization"];
    const decoded = jwt.verify(header,JWT_SECRET);
    if(decoded){
        req.ngoUserId = decoded.id;
        next();
    }else{
        res.json({
            message:"Error occured",
        })
    }

}