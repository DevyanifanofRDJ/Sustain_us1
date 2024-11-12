const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const bodyparser=require('body-parser');

const userRoutes=require('./routes/register');
const loginRoutes=require('./routes/login');
const carbonFootprintRoutes=require('./routes/carbon');
const badgeRoutes=require('./routes/badge');
const chatRoutes=require('./routes/chat');
const productRoutes=require('/routes/product');
const {verifyToken}=require('.middleware/auth');

dotenv.config();

const app=express();
const PORT=process.env.PORT||5000;

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

app.use('/api/carbon',carbonFootprintRoutes);
app.use('/api/users',userRoutes);
app.use('/api/users',loginRoutes);
app.use('/api/badges',badgeRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/products',productRoutes);

mongoose
    .connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log('connected to mongoDB')
    })
    .catch((error)=>console.log('connection failed: ',error));

const server=http.createServer(app);
const io=socketIo(server);

io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('sendMessage',(message)=>{
        io.emit('receiveMessage',message);
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
});

app.get('/',(req,res)=>{
    res.send('sustainable API');
});

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
});
