const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    created:{
        type:Date,
        require:true,
        default:Date.now()
    },
    image:{
        type:String
    },
    updated:{
        type:Date,
        require:true,
        default:Date.now()
    }
    
});


module.exports = mongoose.model('category',categorySchema);