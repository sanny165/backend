const express = require('express');
const employeeRouter = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const ROLES_LIST= require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
employeeRouter.use(verifyJWT);

const {
  getallemployess,
  updateemployee,
  createemployee,
  deleteemployee,
  getemployee
} = require('../../controllers/empcontroller');

employeeRouter.route('/')
  .get(verifyJWT, getallemployess)
  .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createemployee)
  .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),updateemployee)
  .delete(verifyRoles(ROLES_LIST.Admin),deleteemployee);

employeeRouter.route('/:id')
  .get(getemployee);

module.exports = employeeRouter;
