const mongoose=require('mongoose');

const userbadgeSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    badge:{type:mongoose.Schema.Types.ObjectId,ref:'badge',required:true},
    earneddate:{type:Date,default:Date.now},
    progress:{type:Number,default:0}
});

module.exports=mongoose.model('userbadge',userbadgeSchema);