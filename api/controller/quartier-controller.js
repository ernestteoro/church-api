const mongoose = require('mongoose');
const QuartierModel = require('../model/quartier');

// get all areas or one area using its id
exports.get_quartier = (req, res, next) => {
    const idQuartier = req.params._id;
    if (idQuartier) {
        QuartierModel.findById(idQuartier).select('_id nom description created').populate('ville','nom description created').then(quartier => {
            return res.status(200).json(quartier);
        }).catch(err => {
            return res.status(404).json({
                message: 'No area data found with id'
            });
        });
    } else {
        QuartierModel.find().select('_id nom description created').populate('ville','nom description created').then(quartiers => {
            if (quartiers) {
                return res.status(200).json(quartiers);
            } else {
                return res.status(404).json({
                    message: 'No area data found'
                });
            }
        }).catch(err => {
            return res.status(404).json({
                message: err.message
            });
        });
    }
}


// Method to add a area
exports.add_quartier=(req, res, next)=>{
    const quartier = new QuartierModel({
        _id:new mongoose.Types.ObjectId(),
        nom:req.body.nom,
        description:req.body.description,
        ville:req.body.ville,
        created:Date.now(),
        updated:Date.now()
    });
    quartier.save().then(savedquartier=>{
        return res.status(200).json(savedquartier)
    }).catch(err=>{
        return res.status(500).json({
            message:err.message
        });
    });

}


// Method to update a quartier
exports.update_quartier=(req, res, next)=>{
    const _id = req.params._id;
    const quartier ={
        name:req.body.name,
        description:req.body.description,
        updated:Date.now()
    };
    QuartierModel.update({_id:_id},quartier).then(updatedquartier=>{
        quartier._id=_id;
        return res.status(200).json(quartier)
    }).catch(err=>{
       return res.status(500).json({
            message:err.message
        });
    });
}

// Method to delete a area
exports.delete_quartier=(req, res, next)=>{
    const _id = req.params._id;
    QuartierModel.deleteOne({_id:_id}).then(deletedquartier=>{
        return res.status(200).json(deletedquartier)
    }).catch(err=>{
        return res.status(500).json({
            message:err.message
        });
    });

}