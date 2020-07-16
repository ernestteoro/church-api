const mongoose = require('mongoose');
const ProgramModel = require('../model/program');

// get all programs or one program using its id
exports.get_program = (req, res, next) => {
    const programId = req.params._id;
    if (programId) {
        ProgramModel.findById({programId}).
        select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec(function(err,program){
            if(err){
                return res.status(404).json(err.message);
            }
            return res.status(200).json(program);
        });
    } else {
        ProgramModel.find()
        .select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec(function(err,programs){
            if(err){
                return res.status(404).json({
                    message:err.message
                });
            }
            return res.status(200).json(programs);
        });
        
    }
}


// get programs of one or all churches using its id
exports.get_programs_of_eglise = (req, res, next) => {
    const egliseId = req.params._id;
    if (egliseId) {
        ProgramModel.find({eglise:egliseId})
        .select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec()
        .then(programs=>{
            if(programs){
                return res.status(200).json(programs);
            }
            return res.status(404).json({
                     message:"No programs data found"
                });
        }).catch(err=>{
            return res.status(404).json({
                message:err.message
            });
        });
    } else {
        ProgramModel.find()
        .select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec(function(err,programs){
            if(err){
                return res.status(404).json({
                    message:err.message
                });
            }
            return res.status(200).json(programs);
        });
    }
}


// get programs of one or all events using
exports.get_programs_of_event = (req, res, next) => {
    const eventId = req.params._id;
    if (eventId) {
        ProgramModel.find({event:eventId})
        .select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec()
        .then(programs=>{
            if(programs){
                return res.status(200).json(programs);
            }
            return res.status(404).json({
                     message:"No programs data found"
                });
        }).catch(err=>{
            return res.status(404).json({
                message:err.message
            });
        });
    } else {
        ProgramModel.find().
        select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec(function(err,programs){
            if(err){
                return res.status(404).json({
                    message:err.message
                });
            }
            return res.status(200).json(programs);
        });
    }
}

// Method to add a program
exports.add_program=(req, res, next)=>{

    // creating program object
    const program = new ProgramModel({
        _id:new mongoose.Types.ObjectId(),
        titre:req.body.titre,
        dateDebut:req.body.dateDebut,
        dateFin: req.body.dateFin,
        jour:req.body.jour,
        heure:req.body.heure,
        duree:req.body.duree,
        eglise:req.body.eglise,
        event:req.body.event,
        lieu:req.body.lieu,
        created:Date.now(),
        updated: Date.now(),
        description:req.body.description
    });

    //Saving program
    program.save().then(savedprogram=>{
        ProgramModel.find({_id:savedprogram._id}).
        select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec(function(err,programs){

            console.log(programs);

            if(err){
                return res.status(404).json(err.message);
            }
            return res.status(200).json(programs[0]);
        });
        //return res.status(200).json(savedprogram)
    }).catch(err=>{
        return res.status(500).json(err.message);
    });

}

// Method to update a program
exports.update_program=(req, res, next)=>{
    const _id = req.params._id;
    const program ={
        titre:req.body.titre,
        dateDebut:req.body.dateDebut,
        jour:req.body.jour,
        heure:req.body.heure,
        duree:req.body.duree,
        eglise:req.body.eglise,
        event:req.body.event,
        updated: Date.now(),
        description:req.body.description
    };
    ProgramModel.update({_id:_id},program).then(updatedprogram=>{
        ProgramModel.find({_id:updatedprogram._id}).
        select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec(function(err,programs){
            if(err){
                return res.status(404).json(err.message);
            }
            return res.status(200).json(programs);
        });
        //res.status(200).json(updatedprogram)
    }).catch(err=>{
        return res.status(500).json(err.message);
    });
}

// Method to delete a program
exports.delete_program=(req, res, next)=>{
    const _id = req.params._id;
    ProgramModel.deleteOne({_id:_id}).then(deletedprogram=>{
        ProgramModel.find({_id:deletedprogram._id}).
        select('_id titre dateDebut jour heure duree description')
        .populate("eglise","nom description logitude latitude")
        .populate("lieu"," nom description")
        .exec(function(err,programs){
            if(err){
                return res.status(404).json(err.message);
            }
            return res.status(200).json(programs);
        });
    }).catch(err=>{
        return res.status(500).json(err.message);
    });

}