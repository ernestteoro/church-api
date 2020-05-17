const express = require('express');
const authCheck = require('../middleware/check-auth');
const pasteurController = require('../controller/pasteur-controller');

const route = express.Router();

route.get('/',pasteurController.get_pasteurs);
route.get('/:_id',pasteurController.get_pasteurs);
route.post('/',pasteurController.add_pasteur);
route.post('/update',pasteurController.update_pasteur);
route.post('/delete',pasteurController.delete_person);


module.exports=route;