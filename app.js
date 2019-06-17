'use strict'
const express= require('express')
const logger= require('morgan')

const app=express();

//---------middelware--------
app.use(logger('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Conecttion to db
app.set(require('./config/db'))

//load routes
const userRoutes=require("./routes/user")
app.use("/api",userRoutes)

app.listen(3000,(req,res)=>{
    console.log(`runnig on port: 3000`);
})