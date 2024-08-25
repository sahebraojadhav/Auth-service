const express=require('express');
const {PORT}=require('./config/serverConfig.js');
const apiRoutes=require('./routes/index');
const bodyParser=require('body-parser');
const UserService = require('./services/user-service.js');

const app=express();


prepareAndStartServer=async()=>{

    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


    app.use('/api',apiRoutes);

    console.log(PORT);

    app.listen(PORT,()=>{
        console.log("server is running on port",PORT)
    })

    app.get("/",(req,res)=>{
       res.send("hellwo from sahebrao");
    })

   const service=new UserService();
   //console.log("User service",service.createToken);
   //const newToken=service.createToken({email:'sahebraoj1@gmail.com',id:1});
   //console.log("newToken is=",newToken);
    const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaGVicmFvajFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTcyNDU3NDgzNywiZXhwIjoxNzI0NjYxMjM3fQ.-J3M2um3PVjF_CS-x4ffnanBNhSk7ZEqKE-kCFztgA0";
   const response=service.verifyToken(token);
   console.log(response);
}

prepareAndStartServer();