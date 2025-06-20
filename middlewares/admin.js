const jwt=require ('jsonwebtoken');
const JWT_SECRET=process.env.JWT_ADMIN_PASSWORD;

async function userAuth(req,res,next) {
    const token=req.cookies.token;

    if(!token){
        res.status(401).json({
            Message: "No token found"
        })
    }

    try{
        const verifyed=jwt.verify(token,JWT_SECRET);
        req.adminId=verifyed.id;
        next();
    }catch(err){
        res.status(401).json({
            Message: "Invalid token"
        })
    }
}