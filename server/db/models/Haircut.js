const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const haircutSchema = Schema({
    customerID: Schema.ObjectId,
    title: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
    }
});

const Haircut = mongoose.model('Haircut', haircutSchema)

module.exports = Haircut;

/**
 * 	"haircut": {
		"customerID": "5e8bbba497362d5644a22933",
		"title": "Natalie's haircut",
		"time": {
			"from": "10a",
			"to": "11a"
		}
	}
 */