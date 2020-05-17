const EgliseModel = require('../model/eglise');
const mongoose = require('mongoose');

exports.get_eglise=(req, res, next) =>{
    const idEglise = req.params._id;
    if(idEglise){
        EgliseModel.findById(idEglise).
        select('nom description category logitude latitude created')
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
        EgliseModel.find().select('nom description category logitude latitude created')
        .populate("quartier","nom description created")
        .populate("category","title description created")
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
exports.add_eglise= (req, res, next) =>{
    const eglise = new EgliseModel({
        _id:new mongoose.Types.ObjectId(),
        nom:req.body.nom,
        description:req.body.description,
        category:req.body.category,
        logitude:req.body.logitude,
        latitude:req.body.latitude,
        quartier:req.body.quartier,
        created:Date.now(),
        updated:Date.now()
    });
    eglise.save().then((savedEglise) => {
        return res.status(200).json(savedEglise)
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