const Router=require('express');
const adminRouter=Router();
const {adminModel,courseModel}=require('../db');

adminRouter.post('/signup',async (req,res) => {

})

adminRouter.post('/signin',async (req,res) => {

})

adminRouter.post('/uploadCourse',async (req,res)=>{

})

adminRouter.get('/uploadedCourse', async (req,res) => {

})

adminRouter.put('/course', async (req,res) => {

})

module.exports={
    adminRouter
}