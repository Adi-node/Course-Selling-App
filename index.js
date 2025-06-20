require('dotenv').config();
const express=require('express');
const app=express();
const{userRouter}=require('./routes/user');
const{adminRouter}=require('./routes/admin');
const {z}=require('zod');
const bcrypt = require ('bcrypt');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
// const Router=require('express');


app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);

async function main (){
    mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log ("listining on port 3000");
}

main();
