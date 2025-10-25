import Router from "express";
import { googleLogin } from "../controllers/authController.js";
import { appliedVolunteerDataModel, feedbackModel, ngoDataModel, ngoModel } from "../models/ngoModel.js";
export const JWT_SECRET = "Myselt goku but u can call me kakorot";
import jwt from "jsonwebtoken";
import { ngoUserMiddleware } from "../middlewares/ngoUserMiddleware.js";
import bcrypt from "bcrypt";
import { volunteerMiddleware } from "../middlewares/volunteerMiddleware.js";
export const router = Router();
router.get("/google", googleLogin);

export const ngoRouter = Router();
ngoRouter.post("/signup", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const number = req.body.number;

    console.log(password);
    const ngoExist = await ngoModel.findOne({
        email: email,
    })
    console.log(ngoExist);
    if (!ngoExist) {
        try {
            console.log("eherere");
            const hashPassword = await bcrypt.hash(password, 4);
            await ngoModel.create({
                name: name,
                password: hashPassword,
                email: email,
                number: number
            })
            console.log("djgd");
            res.json({
                message: "Signup successfull...!",
            })
        } catch (error) {
            console.log(error);
            res.json({
                error: error,
            })
        }

    } else {
        res.json({
            message: "This organisation already exist...try login",
        })
    }

})
ngoRouter.post("/signin", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const ngoExist = await ngoModel.findOne({
        email: email,
    })
    if (ngoExist) {
        try {
            const passwordMatch = await bcrypt.compare(password, ngoExist.password);
            console.log(passwordMatch);
            if (passwordMatch) {
                const token = jwt.sign({
                    id: ngoExist._id.toString()
                }, JWT_SECRET);
                res.json({
                    message: "Login successfull",
                    token: token,
                    user: ngoExist,
                })
            } else {
                res.json({
                    message: "Incorrect password",
                })
            }
        } catch (error) {
            console.log(error);
            res.json({
                message: error,
            })
        }
    } else {
        res.json({
            message: "User not found...!",
        })
    }
})
ngoRouter.post("/post", ngoUserMiddleware, async (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const location = req.body.location;
    const postType = req.body.postType;
    const status = "active";
    try {
        await ngoDataModel.create({
            title: title,
            desc: desc,
            startDate: startDate,
            endDate: endDate,
            location: location,
            postType: postType,
            status: status,
            ngoUserId: req.ngoUserId,
        })
        res.json({
            message: "submitted successfully..."
        })

    } catch (error) {
        res.json({
            error: error,
        })
    }
})
ngoRouter.get("/posts", async (req, res) => {
    try {
        const response = await ngoDataModel.find({}).populate("ngoUserId","name");

        res.json({
            posts: response,
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
})
ngoRouter.get("/myposts", ngoUserMiddleware, async (req, res) => {
    try {
        const response = await ngoDataModel.find({
            ngoUserId: req.ngoUserId,
        }).populate("ngoUserId", "name email");
        console.log(response);
        res.json({
            posts: response
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        })
    }
})
ngoRouter.delete("/myposts", async (req, res) => {
    const id = req.body.id;


    await ngoDataModel.deleteOne({
        _id: id,
    })

    res.json({
        message: "Deleted successfully",
    })
})

ngoRouter.post("/feedback", volunteerMiddleware, async (req, res) => {
    const feedback = req.body.feedback;
    const rating = req.body.rating;
    const ngoUserId = req.boby.ngoUserId;
    const date = req.body.date;

    try {
        await feedbackModel.create({
            feedback,
            rating,
            date,
            userId: req.userId,
            ngoUserId: ngoUserId,
        })
        res.json({
            message: "Feedback submitted..!",
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        })
    }

})
ngoRouter.get("/feedback", ngoUserMiddleware, async (req, res) => {
    try {
        const response = await feedbackModel.find({
            ngoUserId: req.ngoUserId,
        }).populate("userId", "name email")
        console.log(response.feedback);  
        res.json({
            message: response,
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        })
    }
})
ngoRouter.post("/apply", volunteerMiddleware, async (req, res) => {
    const approve = "n";
    const ngoDataId = req.body.ngoDataId;
    const ngoUserId = req.body.ngoUserId;
    const apply = req.body.apply;
    try {
        await appliedVolunteerDataModel.create({
            approve: approve,
            ngoDataId: ngoDataId,
            userId: req.userId,
            ngoUserId:ngoUserId,
            apply:apply,
        })
        res.json({
            message: "Applied successfully.."
        })
    } catch (error) {
        res.json({
            error: error,
        })
    }
})
ngoRouter.get("/appliedUsers", ngoUserMiddleware, async (req, res) => {
    try {
        const res1 = await appliedVolunteerDataModel.find({
                ngoUserId:req.ngoUserId,
        })
       

        res.json({
            res1:res1,
            
        })


    } catch (error) {
        console.log(error);
        res.json({
            error:error,
        })
    }
})
ngoRouter.get("/applyUsers",async(req,res)=>{
    try {
        const ngoDataId = req.query.ngoDataId;
        const res2 = await appliedVolunteerDataModel.find({
            ngoDataId:ngoDataId,
        }).populate("userId", "name email");
        res.json({
            res2:res2,
        })

    } catch (error) {
        console.log(error)
        res.json({
            error:error,
        })
    }
})
//  TODO : update post route 