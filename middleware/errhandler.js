const {logEvents}=require('./logevents')

const errorhandler=(err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`,'errLog.text')
    console.error(err.stack)
    res.status(500).send(err.message)
}
module.exports=errorhandler
