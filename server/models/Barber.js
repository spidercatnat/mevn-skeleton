const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const barberSchema = Schema({
    name: {
        type: String,
        required: true
    }
});

const Barber = mongoose.model('Barber', barberSchema)

module.exports = Barber;
