require('dotenv').config();
const express=require('express');
const app=express();
const{userRouter}=require('./routes/user');
const{adminRouter}=require('./routes/admin');


app(express.json());

