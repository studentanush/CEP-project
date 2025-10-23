import Router from "express";
import { googleLogin } from "../controllers/authController.js";
import { ngoDataModel, ngoModel } from "../models/ngoModel.js";
export const JWT_SECRET = "Myselt goku but u can call me kakorot";
import jwt from "jsonwebtoken";
import { ngoUserMiddleware } from "../middlewares/ngoUserMiddleware.js";
import bcrypt from "bcrypt";
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
    try {
        await ngoDataModel.create({
            title: title,
            desc: desc,
            startDate: startDate,
            endDate: endDate,
            location: location,
            postType: postType,
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
        const response = await ngoDataModel.find({});

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
        }).populate("ngoUserId","name email");
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
ngoRouter.delete("/myposts",ngoUserMiddleware,async(req,res)=>{
    const id  = req.body.id;

    const ngoID = req.ngoUserId;
    await ngoDataModel.deleteOne({
        _id:id,
    }) 

    res.json({
        message:"Deleted successfully",
    })
})

