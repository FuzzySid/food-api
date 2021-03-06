const mongoose=require('mongoose');

const itemSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    itemImage:{
        type: String
    }
})

module.exports= mongoose.model('Item',itemSchema);
