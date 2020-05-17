const mongoose = require('mongoose');
const PasteurModel = require('../model/pasteur');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// add a pasteur
exports.add_pasteur=(req,res,next)=>{

    //const reqPasteur = req.body.pasteur;
    const pasteurModel = new PasteurModel({
        _id: new mongoose.Types.ObjectId(),
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        telephone:req.body.telephone,
        telephone2: req.body.telephone2,
        eglise:req.body.eglise,
        quartier:req.body.quartier,
        gender:req.body.gender,
        created:Date.now(),
        updated:Date.now()
    });
        if(req.body){
            pasteurModel.save().then((result) => {
                return res.status(200).json(result)
            }).catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
        }else{
            return res.status(500).json({
                message:'Merci de renseigner les bon champs'
            });
        }
}

// get one or all pasteur
exports.get_pasteurs=(req, res,next)=>{
    const pasteurId = req.params._id;
        if (pasteurId) {
            PasteurModel.findById(pasteurId)
            .select('_id firstName lastName email telephone telephone2 gender created')
            .populate("quartier","_id nom description created")
            .populate("eglise","_id nom description")
            .exec(function(err,pasteur){
                if(err){
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
                return res.status(200).json(pasteur);
            });
        } else {
            PasteurModel.find()
            .select('_id firstName lastName email telephone telephone2 gender created')
            .populate("quartier","_id nom description created")
            .populate("eglise","_id nom description")
            .exec(function(err,pasteurs){
                if(err){
                    return res.status(404).json({
                        message: 'No user data found'
                    });
                }
                return res.status(200).json(pasteurs);
            });
        }
}


// Method to update a pasteur
exports.update_pasteur=(req, res, next)=>{
    const _id = req.params._id;
    const pasteur ={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        telephone:req.body.telephone,
        quartier:req.body.quartier,
        eglise:req.body.eglise,
        telephone2: req.body.telephone2,
        gender:req.body.gender,
        updated:Date.now()
    };
    QuartierModel.update({_id:_id},pasteur).then(updatedPasteur=>{
        pasteur._id=_id;
        return res.status(200).json(pasteur)
    }).catch(err=>{
       return res.status(500).json({
            message:err.message
        });
    });
}

// delete a pasteur
exports.delete_person= (req,res, next)=>{
    const _id = req.params._id;
    PasteurModel.deleteOne({_id:_id}).then(deletedPasteur=>{
        return res.status(200).json(deletedPasteur)
    }).catch(err=>{
        return res.status(500).json({
            message:err.message
        });
    });
}

