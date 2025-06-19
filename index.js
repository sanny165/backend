const express=require('express');
const app=express();
const path=require('path');
const port=process.env.PORT || 3000
const {logger}=require('./middleware/logevents')
const errorhandler=require('./middleware/errhandler')
const subdirrouter=require('./routes/subdir')
const homerouter=require('./routes/api/homerouter')
const employeeRouter=require('./routes/api/employeerouter')
const registerRouter=require('./routes/api/registerroute')
const authrouter=require('./routes/api/authrouter')

app.use(express.urlencoded()) //parses data from req body
app.use(express.json()) //parse json
app.use(express.static(path.join(__dirname,'./public'))) //helps us use static files directly
app.use('/subdir',express.static(path.join(__dirname,'./public'))) //helps us use static files directly

//3rd part
const cors=require('cors')
const corsoptions=require('./config/corsoptions');
const { register } = require('module');
app.use(cors(corsoptions)) //allows cross origin requests

//custom middleware
app.use(logger)

//api routes
app.use("/subdir",subdirrouter)
app.use("/",homerouter)
app.use('/register',registerRouter) 
app.use('/auth',authrouter) 

//api routes
app.use('/api/employee',employeeRouter)

app.all(/^\/.*/,(req,res)=>{ //all means rest all defective urls
    res.status(404)
    if(req.accepts('html'))
        res.sendFile(path.join(__dirname,'nodejs_web_server-main','views','404.html'))
    else if(req.accepts('json'))
        res.send({error:"404 not found"})
    else
        res.type('txt').send('404 not found')
})

app.use(errorhandler)

app.listen(port,()=>{
    console.log('server running');
    
})