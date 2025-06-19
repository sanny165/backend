const express = require('express');
const path=require('path');
const employeeRouter=express.Router()
const fs=require('fs')

const data={
    employees:require(path.join(__dirname, '../nodejs_web_server-main/models/employees.json')),
    setemployee:function(data){
        this.employees=data
    }
}


const getallemployess=((req,res)=>{
    res.json(data.employees)
})
const updateemployee=((req,res)=>{
    const employee=data.employees.find(emp=>emp._id===parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({"message":`emp id ${req.body.id} not found`})
    }
    if(req.body.firstname) employee.firstname=req.body.firstname
    if(req.body.lastname) employee.lastname=req.body.lastname
    const filterarray=data.employees.filter(
        emp=>emp._id!==parseInt(req.body.id)
    )
    const unsortedArray=[...filterarray,employee]
    data.setemployee(unsortedArray.sort((a,b)=>a._id>b._id?1:-1))
    res.json({ message: 'Employee updated', employee });

    
})
const createemployee=((req,res)=>{
    const newemployee={
        _id:data.employees[data.employees.length-1]._id+1 || 1,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
    }
    if(!newemployee.firstname || !newemployee.lastname){
        return res.status(400).json({"message":"firstname and lastname are required"})
    }
    data.setemployee([...data.employees,newemployee])
    res.status(201).json(newemployee)
    fs.writeFile(path.join(__dirname, '..', 'nodejs_web_server-main', 'models', 'employees.json'), JSON.stringify(data.employees),(err)=>{
    if(err){
        console.error(err)
    }
})
})
const deleteemployee=((req,res)=>{
    const employee=data.employees.find(emp=>emp._id===parseInt(req.body.id))
    if(!employee){
        return res.status(400).json({"message":`emp id ${req.body.id} not found`})
    }
    const filterarray=data.employees.filter(
        emp=>emp._id!==parseInt(req.body.id)
    )
    data.setemployee([...filterarray])
    res.json(data.employees)
})
const getemployee=((req,res)=>{
        const employee=data.employees.find(emp=>emp._id===parseInt(req.params.id))
        if(!employee){
            return res.status(400).json({"message":`emp id ${req.params.id} not found`})
        }
        res.json(employee)
    })



module.exports={
    getallemployess,
    updateemployee,
    createemployee,
    deleteemployee,
    getemployee
}