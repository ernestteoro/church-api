const express = require('express');
const authCheck = require('../middleware/check-auth');
const programmController = require('../controller/program-controller');

const route = express.Router();

route.get('/',programmController.get_program);
route.get('/:_id',programmController.get_program);
route.post('/',programmController.add_program);
route.post('/update',programmController.update_program);
route.post('/delete',programmController.delete_program);

module.exports=route;