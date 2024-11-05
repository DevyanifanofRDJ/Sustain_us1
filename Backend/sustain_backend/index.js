const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const carbonFootprintRoutes=require('./routes/carbon');
const userRoutes=require('./routes/user');

dotenv.config();

const app=express();
const PORT=process.env.PORT||5000;

app.use(express.json());

app.use('/api/carbon-footprint',carbonFootprintRoutes);
app.use('/api/users',userRoutes);

mongoose
    .connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log('connected to mongoDB')
    })
    .catch((error)=>console.log('connection failed: ',error));

app.get('/',(req,res)=>{
    res.send('sustainable test');
});

app.listen(PORT,()=>console.log(`server running on http://localhost:${PORT}`));
