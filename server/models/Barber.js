const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const barberSchema = Schema({
    name: {
        type: String,
        required: true
    },
    appointments: {
        type: Array
    }
});

const Barber = mongoose.model('Barber', barberSchema)
module.exports = Barber;
