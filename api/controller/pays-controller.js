const mongoose = require('mongoose');
const PaysModel = require('../model/pays');

// get all countrys or one country using its id
exports.get_pays = (req, res, next) => {
    const paysId = req.params._id;
    if (paysId) {
        PaysModel.findById(paysId).select('_id nom description created').then(pays => {
            return res.status(200).json(pays);
        }).catch(err => {
            return res.status(404).json({
                message: 'No user data found'
            });
        });
    } else {
        PaysModel.find().select('_id nom description created').then(pays => {
            if (pays) {
                return res.status(200).json(pays);
            } else {
                return res.status(404).json({
                    message: 'No user data found'
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: err.message
            });
        });
    }
}


// Method to add a country
exports.add_pays=(req, res, next)=>{
    const pays = new PaysModel({
        _id:new mongoose.Types.ObjectId(),
        nom:req.body.nom,
        description:req.body.description,
        created:Date.now(),
        updated: Date.now()
    });
    pays.save().then(paysenregistrer=>{
        res.status(200).json(paysenregistrer)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a country
exports.update_pays=(req, res, next)=>{

    const _id = req.params._id;
    const pays ={
        nom:req.body.nom,
        description:req.body.description,
        updated:Date.now()
    };
    PaysModel.update({_id:_id},pays).then(resultat=>{
        pays._id=_id;
        res.status(200).json(pays)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a country
exports.delete_pays=(req, res, next)=>{
    const _id = req.params._id;
    PaysModel.deleteOne({_id:_id}).then(supprimer=>{
        res.status(200).json(supprimer)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}