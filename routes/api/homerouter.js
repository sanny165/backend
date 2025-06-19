const express=require('express')
const homerouter=express.Router()

const path=require('path')

homerouter.get(/^\/$|^\/index(\.html)?/,(req,res)=>{
    res.sendFile('./nodejs_web_server-main/views/index.html',{root:__dirname})
})

homerouter.get(/^\/new-page(\.html)?/,(req,res)=>{
    res.sendFile('./nodejs_web_server-main/views/new-page.html',{root:__dirname})
})

homerouter.get(/^\/old-page(\.html)?/,(req,res)=>{
    res.redirect(301,'/new-page.html')
})
module.exports=homerouter