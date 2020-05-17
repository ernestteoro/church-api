const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        require:true,
        unique:true,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    },
    login:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    quartier:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'quartier',
        require:true
    },
    telephone:{
        type:Number,
        require:true,
        match:/^\d{9}$/
    },
    gender:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true,
        default:'user'
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


module.exports= mongoose.model('utilisateur',userSchema);