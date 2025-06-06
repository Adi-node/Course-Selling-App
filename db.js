const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userSchema= new Schema({
    username:String,
    email:{type:String,unique:true},
    password:String
})

const adminSchema= new Schema({
    username:String,
    email:{type:String,unique:true},
    password:String
})

const courseSchema= new Schema({
    title:String,
    discription:String,
    price:Number,
    adminId:ObjectId
})

const boughtSchema= new Schema({
    courseId:ObjectId,
    userId:ObjectId
})

const userModel=mongoose.Model('user',userSchema);
const adminModel=mongoose.Model('admin',adminSchema);
const courseModel=mongoose.Model('course',courseSchema);
const boughtModel=mongoose.Model('bought',boughtSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    boughtModel
}

