const mongoose = require('mongoose');
const VilleModel = require('../model/ville');

// get all communs or one commun using its id
exports.get_ville = (req, res, next) => {
    const villeId = req.params._id;
    if (villeId) {
        VilleModel
        .findById(villeId)
        .select('_id nom description created')
        .populate('pays','nom description created')
        .then(ville => {
            return res.status(200).json(ville);
        }).catch(err => {
            console.log(err);
            return res.status(404).json({
                message: 'No commun data found'
            });
        });
    } else {
        VilleModel.find()
        .select('_id nom description created')
        .populate('pays','nom description created')
        .then(villes => {
            if (villes) { 
              return res.status(200).json(villes);
            } else {
                return res.status(404).json({
                    message: 'No commun data found'
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: err.message
            });
        });
    }
}


// Method to add a commun
exports.add_ville=(req, res, next)=>{
    const ville = new VilleModel({
        _id:new mongoose.Types.ObjectId(),
        nom:req.body.nom,
        description:req.body.description,
        pays:req.body.pays,
        created: Date.now(),
        updated: Date.now()
    });
    ville.save().then(savedcommun=>{
        res.status(200).json(savedcommun)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a commun
exports.update_ville=(req, res, next)=>{
    const _id = req.params._id;
    const ville ={
        nom:req.body.nom,
        description:req.body.description,
        pays:req.body.pays,
        updated: Date.now()
    };
    VilleModel.update({_id:_id},ville).then(updatedcommun=>{
        ville._id=_id;
        res.status(200).json(ville)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a commun
exports.delete_ville=(req, res, next)=>{
    const _id = req.params._id;
    VilleModel.deleteOne({_id:_id}).then(deletedcommun=>{
        res.status(200).json(deletedcommun)
    }).catch(err=>{
        res.status(500).json({
            message:err.message
        });
    });

}