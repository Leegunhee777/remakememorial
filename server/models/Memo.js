const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memoSchema = mongoose.Schema({
    writer:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    filePath:{
        type:String
    },
    category:{
        type:String
    },
    title:{
        type:String,
        maxlength: 50
    },
    description:{
        type: String
    },
    wedo:{
        type: String
    },
    kungdo:{
        type: String
    },
    
    
},{timestamps:true}) //timestamps를통해 생성시간과 업데이트시간에 대한 기록을 남길수있음(해당필드가 자동으로추가됨)



const Memo = mongoose.model('memo', memoSchema);

module.exports = { Memo }