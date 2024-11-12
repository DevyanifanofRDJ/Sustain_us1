const mongoose=require('mongoose');

const carbonSchema=new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    milesDriven:{type:Number,required:true},
    energy:{type:Number,required:true},
    efficiency:{type:Number,required:true}
});

module.exports=mongoose.model('carbon',carbonSchema);