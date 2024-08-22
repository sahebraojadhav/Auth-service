const express=require('express');
const {PORT}=require('./config/serverConfig.js');

const app=express();

prepareAndStartServer=()=>{

    app.set('views', __dirname + '../views/index.ejs');  // 'views' is the folder where your EJS files will go
    app.set('view engine', 'ejs');

    console.log(PORT);

    app.use(express.urlencoded({ extended: true }));

    app.listen(PORT,()=>{
        console.log("server is running on port",PORT)
    })

    app.get("/",(req,res)=>{
       res.send("hellwo from sahebrao")
    })
    
}

prepareAndStartServer();