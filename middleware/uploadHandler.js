const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'user/prescription/')
    },
    filename: function(req,file,cb){
        
        let ext = path.extname(file.originalname)
        const fileName = file.originalname + Date.now()+ext
        //console.log(fileName)

        cb(null,fileName)
    }
})

const upload = multer({storage:storage,
            fileFilter : function(req,file,cb){
                if(
                    file.mimetype == 'image/png' || file.mimetype ==  'image/jpeg' || 
                    file.mimetype == 'image/jpg'
                ){
                    cb(null,true);
                }else{
                    throw new Error("only jpg, png & jpeg file supported")
                }
            }
                })


module.exports = upload