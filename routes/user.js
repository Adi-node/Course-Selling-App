const Router=require('express');
const userRouter=Router();
const {userModel, courseModel, boughtModel}=require('../db');

const jwt=require ('jsonwebtoken');
const JWT_SECRET=process.env.JWT_USER_PASSWORD;

const {z}=require('zod');
const bcrypt = require ('bcrypt');

userRouter.post('/signup', async (req,res) => {

    //zod validation

    const requiredBody= z.object({
        username:z.string().min(3).max(100),
        email:z.string().email(),
        password:z.string()
    })
    const parsedBody=requiredBody.safeParse(req.body);


    if(parsedBody.success){
        const{username,email,password}=req.body;

        //Hashing password

        const hashedpassword= await bcrypt.hash(password,5);

        //Inserting in DB

        try{
            await userModel.create({
                username,
                email,
                password:hashedpassword
            })
            res.json({
                Message:"User Signed up"
            })
        }catch(err){
            res.json({
                Message:"Database not found"
            })
        }

    }else{
        res.status(400).json({
            Message:"Zod validation failed",
            errors:parsedBody.error.errors
        })
    }


})

userRouter.post('/signin', async (req,res) => {
   //zod validation

    const requiredBody= z.object({
        email:z.string().email(),
        password:z.string()
    })

    const parsedBody=requiredBody.safeParse(req.body);

    if(parsedBody.success){
        const{email,password}=req.body;

        try{
            //Finding email in DB
            const response=await userModel.findOne({
                email
            })
            if(!response){
                res.status(401).json({
                    Message:"Wrong email or password"
                })
            }

            //Matching password

            const passwordMatch= await bcrypt.compare(password,response.password);
            if(!passwordMatch){
                res.status(401).json({
                    Message: "Wrong email or password"
                })
            }else{
                const token=jwt.sign({id:response._id.toString()},JWT_SECRET);
                res.cookie('token',token);
                res.json({
                    Message: "User Signed in successfully"
                })
            }
            
            

        }catch(err){
            req.status(500).json({
                Message:"Internal server error"
            })
        }
        
    }else{
        res.status(400).json({
            Message:"Zod validation failed",
            errors:parsedBody.error.errors
        })
    }


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
