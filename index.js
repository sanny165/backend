const express=require('express');
const app=express();
const path=require('path');
const cookieParser=require('cookie-parser');
const port=process.env.PORT || 3000
const {logger}=require('./middleware/logevents')
const errorhandler=require('./middleware/errhandler')
const homerouter=require('./routes/homerouter')
const employeeRouter=require('./routes/api/employeerouter')
const verifyJWT=require('./middleware/verifyJWT') //middleware to verify JWT token

 
const registerRouter = require('./routes/registerroute');
const authrouter=require('./routes/authrouter')
const errorHandler = require("./middleware/errhandler");


app.use(express.urlencoded()) //parses data from req body
app.use(express.json());
 //parse json
app.use(express.static(path.join(__dirname,'public'))) //helps us use static files directly

//3rd part
const credentials = require('./middleware/credentials');
app.use(credentials);
const cors=require('cors')
const corsoptions=require('./config/corsoptions');
app.use(cors(corsoptions)) //allows cross origin requests
app.use(cookieParser()) //parses cookies from req

//custom middleware
app.use(logger)
app.use(require('./middleware/credentials'))

//api routes
// app.use("/subdir",subdirrouter)
app.use("/",homerouter)
app.use('/register',registerRouter)
app.use('/auth',authrouter) 
app.use('/refresh',require('./routes/refreshRouter')) //refresh token route
app.use('/logout',require('./routes/logoutRouter'))

//api routes
app.use('/api/employee',verifyJWT,employeeRouter)


app.all(/^\/.*/,(req,res)=>{ //all means rest all defective urls
    res.status(404);
  if (req.accepts("html"))
    res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.send({ error: "404 Not Found" });
  else res.type("txt"), send("404 Not Found");
});

app.use(errorhandler)

app.listen(port,()=>{
    console.log('server running');
    
}) 