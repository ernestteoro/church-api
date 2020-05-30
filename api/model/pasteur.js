const mongoose = require('mongoose');

const pasteurSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        require:true
    },
    lastName:{
        type:String,
        require:true,
    },
    firstName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    quartier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quartier',
        require:true
    },
    telephone:{
        type:String,
        require:true,
    },
    telephone2:{
        type:String,
        require:false,
    },
    gender:{
        type:String,
        require:true
    },
    eglise:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'eglise',
        require:false
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    },
    updated:{
        type:Date,
        require:true,
        default:Date.now()
    }
});


module.exports= mongoose.model('pasteur',pasteurSchema);