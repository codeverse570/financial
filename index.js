const dotenv = require('dotenv')
const express = require("express")
dotenv.config({ path: './config.env' })
const fs = require('fs');
const cors= require("cors")
const errorHandler=require('./controllers/errControler').errorHandler
const userroute= require("./routes/User")
const app =express();
const sanitize = require("express-mongo-sanitize")
const cookieparse = require("cookie-parser")
const xss = require("xss-clean")
const hpp = require("hpp")
const compression= require("compression")
const helmet = require("helmet")
const morgan =require('morgan')
const path=require('path')
const rateLimiter=require('express-rate-limit')
const mongoose=require("mongoose")
app.enable("trust proxy")
app.use(express.json({ limit: '10kb' }))
app.use(cookieparse())
app.use(sanitize())
app.use(helmet())
app.use(cors())
app.options("*",cors())
app.use(morgan("tiny"))
app.use(xss())
app.use(hpp({
    whitelist: ["duration"]
}))

// console.log(process.env.DATABASE) 
const limiter = rateLimiter({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests please try later"
})
mongoose.connect('mongodb://localhost:27017/finanical');
app.use('/api', limiter)
// app.set("view engine", "pug")
// app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'public')))
app.use(compression())
app.use("/api/v1/user",userroute)
app.use(errorHandler) 
app.listen(3000,()=>{
    console.log("server is listening...")
})