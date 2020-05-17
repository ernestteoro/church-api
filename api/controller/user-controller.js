const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// get all users
exports.get_user = (req, res, next) => {
    const userId = req.params._id;
        if (userId) {
            UserModel.findById(userId)
            .select('_id firstName lastName login email address telephone gender role')
            .populate("quartier","_id nom description created")
            .populate("eglise","_id nom description category logitude latitude created ")
            .exec(function(err,user){
                if(err){
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
                return res.status(200).json(user);
            });
        } else {
            UserModel.find()
            .select('_id firstName lastName login email address telephone gender role')
            .populate("quartier","_id nom description created")
            .populate("eglise","_id nom description category logitude latitude created")
            .exec(function(err,users){
                if(err){
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
                return res.status(200).json(users);
            });
        }
}


// get all users that provide services
exports.get_users_of_eglise = (req, res, next) => {
    const _egliseId = req.params._id;
        if (_egliseId) {
            UserModel.find({eglise:_egliseId})
            .select('_id firstName lastName login email address telephone gender role')
            .populate("quartier","_id nom description created")
            .populate("eglise","_id nom description category logitude latitude created ")
            .exec(function(err,user){
                if(err){
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
                return res.status(200).json(user);
            });
            
        } else {
            return res.status(404).json({
                message: 'No user data found'
            });
        }
}


// method to signup a user
exports.create_user = (userData) => {
    if (!userData) {
        return null;
    } else {

        db.initialize(dbName,collectionName,
            function(dbCollection){

                dbCollection.findOne({ email: userData.email},(err, user)=>{
                    if(err) {
                        return response.status(404).json({
                            message: error.message
                        });
                    }
                    if (!user) {
                        bcrypt.hash(userData.password,10, (err, result) => {
                            if (err) {
                                console.log(err);
                                return null;
                            }
                            if (result) {
                                userData={
                                email:req.body.email,
                                login:req.body.login,
                                firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                address:req.body.address,
                                gender:req.body.gender,
                                telephone:req.body.telephone,
                                password:result,
                                eglise:req.body.eglise._id,
                                quartier:req.body.quartier._id,
                                role:req.body.role,
                                created:Date.now(),
                                updated:Date.now()
                                }
                                dbCollection.insert(userData, (error, user) => {
                                    if(error) {
                                        return response.status(500).json({
                                            message:error.message
                                        });
                                    }
                                    return res.status(404).json(user);
                                });
                            }
                        });
                    }else {
                        console.log("The user already exist");
                        return null;
                    }
                });
            },
            function(err){
                return res.status(404).json({
                    message: err.message
                });
            }
        );
    }
}

// add user
exports.add_user = (req, res, next) => {
    UserModel.findOne({
        email: req.body.email
    }).exec().then(user => {
        if (!user) {
            UserModel.findOne({
                login: req.body.login
            }).exec().then(userLogin=>{
                if(!userLogin){
                    bcrypt.hash(req.body.password,10, (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                message:err.message
                            });
                        }
                        if (result) {
                            const addUser = new UserModel({
                                _id: new mongoose.Types.ObjectId(),
                                email:req.body.email,
                                login:req.body.login,
                                firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                address:req.body.address,
                                gender:req.body.gender,
                                telephone:req.body.telephone,
                                password:result,
                                eglise:req.body.eglise._id,
                                quartier:req.body.quartier._id,
                                role:req.body.role,
                                created:Date.now(),
                                updated:Date.now()
                            });
        
                            addUser.save().then((savedUser) => {
                                UserModel.findById(savedUser._id)
                                .select('_id firstName lastName login email address telephone gender role')
                                .populate("quartier","_id nom description created")
                                .populate("eglise","_id nom description category logitude latitude created ")
                                .exec(function(err,user){
                                    if(err){
                                        return res.status(404).json({
                                             message: 'No user data found'
                                        });
                                    }
                                    return res.status(200).json(user);
                                });
                                //return res.status(200).json();
                            }).catch((err) => {
                                return res.status(500).json({
                                    message:err.message
                                });
                            });
                        }
                    });
                }else {
                    return res.status(500).json({
                        message:"The user already exists"
                    });
                }
            });
        } else {
            return res.status(500).json({
                message:"The user already exists"
            });
        }
    });
    
}

// delete user
exports.delete_user = (req, res, next) => {

}

// User login
exports.login = (req, res, next) => {
    UserModel.findOne({
        email: req.body.email
    }).then(usr => {
        if (usr) {
            bcrypt.compare(req.body.password, usr.password, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({
                        message: 'Not authorized'
                    });
                }
                if (result) {
                    console.log("User after hashing passwor")
                    console.log(usr)
                    token = jwt.sign({
                        username: usr.email,
                        userId: usr._id
                    }, 'secret');

                    const user={
                        email:usr.email,
                        role:usr.role,
                        token: token
                    }
                    return res.status(200).json(user);
                }

                return res.status(401).json({
                    message: 'Not authorized'
                }); 
            });
        }else{
            UserModel.findOne({
                login: req.body.login
            }).exec().then(userLogin=>{
                bcrypt.compare(req.body.password, userLogin.password, (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(401).json({
                            message: 'Not authorized'
                        });
                    }
                    if (result) {
                        token = jwt.sign({
                            username: userLogin.login,
                            userId: userLogin._id
                        }, 'secret');
    
                        const userInfos={
                            email:userLogin.email,
                            role:userLogin.role,
                            token: token
                        }
                        return res.status(200).json(userInfos);
                    }

                    return res.status(401).json({
                        message: 'Not authorized'
                    }); 
                });
            })
        }
    }).catch(err => {
        console.log(err)
        return res.status(404).json({
            message: "Not authorized"
        });
    })
    
}