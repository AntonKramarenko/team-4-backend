const { Schema, model } = require('mongoose')

const object = new Schema({
    classification: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coordinates: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    attributes: {
        type: Boolean,
        required: true
    }
})

module.exports = model('Object', object)
