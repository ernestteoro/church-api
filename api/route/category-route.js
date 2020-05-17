const mongoose = require('mongoose');
const CategoryModel = require('../model/category');
const express = require('express');
const authCheck = require('../middleware/check-auth');
const categoryController = require('../controller/category-controller');

const route = express.Router();

route.get('/',categoryController.get_all_categories);
route.get('/:_id',categoryController.get_all_categories);
route.post('/',categoryController.add_category);
route.post('/update',categoryController.update_category);
route.post('/delete',categoryController.delete_category);


module.exports=route;
