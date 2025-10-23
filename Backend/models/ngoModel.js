import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ngoSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:String,
    }
})

export const ngoModel = mongoose.model("ngoUsers",ngoSchema);

const ngoData = new Schema({
    title:{
        type:String,
    },
    desc:{
        type:String,
    },
    startDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    },
    location:{
        type:String,
    },
    postType:{
        type:String,
    },
    ngoUserId:{type:mongoose.Types.ObjectId,ref:'ngoUsers',required:true},
   
})

export const ngoDataModel = mongoose.model("ngoData",ngoData);

