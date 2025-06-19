// logevents.js
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs');
const fspromises = fs.promises;
const express=require('express');
const app=express();

const logEvents = async (message) => {
    const datetime = format(new Date(), "yyyy:MM:dd\tHH:mm:ss");
    const logitem = `${datetime}\t${uuid()}\t${message}\n`;  // \n to break lines
    try {
        const logDir = path.join(__dirname, 'logs');
        if (!fs.existsSync(logDir)) {
            await fspromises.mkdir(logDir);
        }
        await fspromises.appendFile(path.join(logDir, 'eventlog.txt'), `${logitem}\n`);
    } catch (error) {
        console.log(error.message);
    }
};
const logger=app.use((req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'eventlog.txt')
    console.log(req.method,req.url);
    next()
    
})
module.exports = {logEvents,logger}; 
