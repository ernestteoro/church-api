const express = require('express');
const authCheck = require('../middleware/check-auth');
const userController = require('../controller/user-controller');

const route = express.Router();

route.get('/',userController.get_user);
route.get('/:_id',userController.get_user);
route.post('/',userController.add_user);
route.post('/login',userController.login);
route.post('/delete',userController.delete_user);

module.exports=route;