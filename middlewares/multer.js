const { error } = require('console');
const multer=require('multer');
const path = require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../uploads'));
    },
    filename:function(req,file,cb){
        const ext=path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,file.fieldname+ '-' +uniqueSuffix+ext);
    }
})

const upload=multer({
    storage,
    fileFilter:function(req,file,cb){
        if (file.fieldname==="thumbnail"){
            if(!file.mimetype.startsWith('image/')){
                return cb(new error("Only images are accepted"),false);
            }
            cb(null,true);
        }else if(file.filename==="video"){
            if(!file.mimetype.startsWith('video/')){
                return cb(new error("Only videos are accepted"),false);
            }
            cb(null,true);
        }
        return cb(new error("Field is not allowed"),false);
    }
});

module.exports={
    upload
}