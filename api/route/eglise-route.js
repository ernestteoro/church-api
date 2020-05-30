const express = require('express');
const authCheck = require('../middleware/check-auth');
const egliseController = require('../controller/eglise-controller');

const route = express.Router();

route.get('/',egliseController.get_eglise);
route.get('/:_id',egliseController.get_eglise);
route.get('/:_id/categories',egliseController.get_eglise_by_category);
route.post('/',egliseController.add_eglise);
route.post('/update',egliseController.update_eglise);
route.post('/delete',egliseController.delete_eglise);


module.exports=route;

