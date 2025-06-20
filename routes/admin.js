const Router=require('express');
const adminRouter=Router();
const {adminModel,courseModel}=require('../db');
const {auth}=require('../middlewares/admin');

const jwt=require ('jsonwebtoken');
const JWT_SECRET=process.env.JWT_ADMIN_PASSWORD;

const {z}=require('zod');
const bcrypt = require ('bcrypt');
const { upload } = require('../middlewares/multer');

adminRouter.post('/signup',async (req,res) => {

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
            await adminModel.create({
                username,
                email,
                password:hashedpassword
            })
            res.json({
                Message:"Admin Signed up"
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

adminRouter.post('/signin',async (req,res) => {
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
            const response=await adminModel.findOne({
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
                    Message: "Admin Signed in successfully"
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

adminRouter.post('/uploadCourse', auth, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), async (req, res) => {
    // Zod Validation
    const requiredBody = z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(), 
        adminId: z.string(),
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: parsedBody.error.errors
        });
    }

    const { title, description, price, adminId } = req.body;

    const thumbnailFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    const videoFile = req.files['video'] ? req.files['video'][0] : null;

    if (!thumbnailFile || !videoFile) {
        return res.status(400).json({ message: "Thumbnail and video are required" });
    }

    const thumbnailUrl = `/uploads/${thumbnailFile.filename}`;
    const videoUrl = `/uploads/${videoFile.filename}`;

    try {
        const course = await courseModel.create({
            title,
            description,
            price,
            adminId,
            thumbnailUrl,
            videoUrl
        });

        res.json({ message: "Course uploaded", course });
    } catch (err) {
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

adminRouter.get('/uploadedCourse',auth, async (req,res) => {
    
})

adminRouter.put('/course',auth, async (req,res) => {

})

module.exports={
    adminRouter
}