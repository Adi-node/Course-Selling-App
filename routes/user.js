const Router=require('express');
const userRouter=Router();
const {userModel, courseModel, boughtModel}=require('../db');

userRouter.post('/signup', async (req,res) => {
    
})

userRouter.post('/signin', async (req,res) => {

})

userRouter.get('/course', async (req,res) => {

})

userRouter.post('buyingCourse', async (req,res) => {

})

userRouter.get('boughtCourse', async (req,res) => {

})

userRouter.get('watchCourse', async (req,res) => {

})

module.exports={
    userRouter
}
