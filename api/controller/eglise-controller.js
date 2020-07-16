const EgliseModel = require('../model/eglise');
const mongoose = require('mongoose');

exports.get_eglise=(req, res, next) =>{
    const idEglise = req.params._id;
    if(idEglise){
        EgliseModel.findById(idEglise).
        select('_id nom description logitude latitude created')
        .populate("quartier","nom description created")
        .populate("category","title description created")
        .exec(function(error, eglise){
            if(error){
                return res.status(error.status).json({
                    message:error.message
                })
            }
            return res.status(200).json(eglise)
        })
    }else{
        EgliseModel.find().select('_id nom description logitude latitude created')
        .populate("quartier","_id nom description created")
        .populate("category","_id title description created")
        .exec(function(error,eglises){
            if(error){
                return res.status(error.status).json({
                    message: error.message
                })
            }

            return res.status(200).json(eglises)
        })
    }
}


// List of churches using cate Id
exports.get_eglise_by_category=(req, res, next) =>{
    const catId = req.params._id;
    if(catId){
        EgliseModel.find({category:catId}).
        select('_id nom description logitude latitude created')
        .populate("quartier","_id nom description created")
        .populate("category","_id title description created")
        .exec(function(error, eglise){
            if(error){
                return res.status(error.status).json({
                    message:error.message
                })
            }
            return res.status(200).json(eglise)
        })
    }else{
        return res.status(200).json({
            message:"Pas de données disponible"
        })
    }
}


exports.add_eglise= (req, res, next) =>{
    const eglise = new EgliseModel({
        _id:new mongoose.Types.ObjectId(),
        nom:req.body.nom,
        description:req.body.description,
        category:req.body.category._id,
        logitude:req.body.logitude,
        latitude:req.body.latitude,
        quartier:req.body.quartier._id,
        created:Date.now(),
        updated:Date.now()
    });
    eglise.save().then((savedEglise) => {
        if(savedEglise){
            EgliseModel.findById(savedEglise._id)
            .select('_id nom description logitude latitude created')
            .populate("quartier","nom description created")
            .populate("category","title description created")
            .exec(function(error, response){
                if(error){
                    return res.status(error.status).json(error.message);
                }
                return res.status(200).json(response)
            });
        }else{
            return res.status(error.status).json(error.message);
        }

    }).catch((err) => {
        return res.status(500).json({
            message:'Erreur enregistrement'
        })
    });

}

exports.update_eglise=(req, res, next) =>{
    const idEglise = params._id
    const eglise = {
        nom:req.body.nom,
        description:req.body.description,
        category:req.body.category,
        logitude:req.body.logitude,
        latitude:req.body.latitude,
        quartier:req.body.quartier,
        updated:Date.now()
    };

    EgliseModel.update({_id:idEglise},eglise).then(updatedEglise=>{
        return res.status(200).json(updatedEglise)
    }).catch(error=>{
        return res.status(error.status).json({
            message:error.message
        })
    })
}

exports.delete_eglise=(req, res, next) =>{
    const idEglise = params._id
    EgliseModel.deleteOne({_id:idEglise}).then((deletedEglise) => {
        return res.status(200).json(deletedEglise)
    }).catch((err) => {
        return res.status(err.status).json({
            message:err.message
        })
    });
}