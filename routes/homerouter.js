const express=require('express')
const homerouter=express.Router()

const path=require('path')

homerouter.get(/^\/$|^\/index(\.html)?/,(req,res)=>{ 
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})

homerouter.get(/^\/new-page(\.html)?/,(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','new-page.html'))
})

homerouter.get(/^\/old-page(\.html)?/,(req,res)=>{
    res.redirect(301,'/new-page.html')
})
module.exports=homerouter 