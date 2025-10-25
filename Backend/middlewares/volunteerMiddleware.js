
import jwt from "jsonwebtoken";
export const volunteerMiddleware = (req,res,next)=>{
    const header = req.headers["authorization"];
        const decoded = jwt.verify(header,process.env.JWT_SECRET_VOL);
        if(decoded){
            req.userId = decoded._id;
            next();
        }else{
            res.json({
                message:"Error occured",
            })
        }
}