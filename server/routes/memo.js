const express = require('express');
const router = express.Router();
const { Memo } = require("../models/Memo");
const mongoose = require('mongoose');

const multer = require("multer");


var storage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null,'uploads/')
    },
    filename: function(req, file, cb){
      cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, res, cb)=>{
      const ext = path.extname(file.originalname)
      
      if(ext !== '.jpg' && ext !== '.png' && ext !== '.mp4'){
        return cb(res.status(400).end('only jpg,png,mp4 is allowed'), false)
      }
      cb(null, true)
    }
  })

const upload = multer({storage : storage}).single("file");
//client 쪽에서 보통은 <input type = file 의 name값을 가지고 .single('')안에 써주지만,
// formData.append('file',file) 형식으로 보낼때엔, apeend함수안에 보내는 이름으로 적어줘야함
router.post("/upload",upload, (req, res) => {
    
    //
    // const {videoFile, title, description} = req.body;
    //client에서 post하면 일반적인경우 body의 내용을 서버에서는 client의 input 태그의 name속성 값으로 조회해볼수있음
    //BUT!!!!!!!
    //multer를 이용한 즉,videos폴더를 통한 URL방식으로 접근되는 파일은
    //서버에서 req.file이라는 변수명으로 접근할수있음(변수명고정임)
  
        const memo = new Memo({
            writer:req.body.writer,
            category:req.body.category,
            title:req.body.title,
            description:req.body.description,
            wedo:req.body.wedo,
            kungdo:req.body.kungdo,
            filePath:req.file.path,
        }
        );
        memo.save((err, memo)=>{
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true,memo}); 
        })
    
 
});

router.get("/get", (req, res) => {
    
    Memo.find().populate('writer')
    .exec((err, doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({success:true, doc})
    })
 
});



module.exports = router;
