const mongoose=require('mongoose');
const schema=mongoose.Schema;

const chatSchema=new schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
});

const chat=mongoose.model('chat',chatSchema);

module.exports=chat;