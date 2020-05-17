const express = require('express');
const authCheck = require('../middleware/check-auth');
const quartierController = require('../controller/quartier-controller');

const route = express.Router();

route.get('/',quartierController.get_quartier);
route.get('/:_id',quartierController.get_quartier);
route.post('/',quartierController.add_quartier);
route.post('/update',quartierController.update_quartier);
route.post('/delete',quartierController.delete_quartier);

module.exports=route;