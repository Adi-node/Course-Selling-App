require('dotenv').config();
const express=require('express');
const app=express();
const{userRouter}=require('./routes/user');
const{adminRouter}=require('./routes/admin');
const mongoose = require('mongoose');

app.use(express.json());

async function main (){
    mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}

main();
