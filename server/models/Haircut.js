const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const haircutSchema = Schema({
    customerID: Schema.ObjectId,
    title: {
        type: String,
        required: true,
        trim: true
    },
    start: {
        type: String,
        required: true,
        trim: true
    },
    end: {
        type: String,
        required: true,
        trim: true
    }
});

const Haircut = mongoose.model('Haircut', haircutSchema)

module.exports = Haircut;
