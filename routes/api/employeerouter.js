const express=require('express');
const app=express();
const path=require('path');
const employeeRouter=express.Router()
const {getallemployess,updateemployee,createemployee,deleteemployee,getemployee}=require('../../controllers/empcontroller') 

employeeRouter.route('/')
.get(getallemployess)
.post(createemployee)
.put(updateemployee)
.delete(deleteemployee)

employeeRouter.route("/:id")
    .get(getemployee)



module.exports=employeeRouter