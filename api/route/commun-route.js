const mongoose = require('mongoose');
const VilleModel = require('../model/ville');
const express = require('express');
const authCheck = require('../middleware/check-auth');
const communeController = require('../controller/commun-controller');

const route = express.Router();

route.get('/',communeController.get_ville);
route.get('/:_id',communeController.get_ville);
route.post('/',communeController.add_ville);
route.post('/update',communeController.update_ville);
route.post('/delete',communeController.delete_ville);


module.exports=route;