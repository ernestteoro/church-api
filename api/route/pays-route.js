const express = require('express');
const authCheck = require('../middleware/check-auth');
const paysController = require('../controller/pays-controller');

const route = express.Router();

route.get('/',paysController.get_pays);
route.get('/:_id',paysController.get_pays);
route.post('/',paysController.add_pays);
route.post('/update',paysController.update_pays);
route.post('/delete',paysController.delete_pays);

module.exports=route;