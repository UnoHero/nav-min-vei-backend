const mongoose = require('mongoose')

const Schema = mongoose.Schema

const aaRegSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    insurance: {
        type: String,
        required: true
    },
}, { timestamps: true })

const aaRegUser = mongoose.model('aaRegUser', aaRegSchema)

module.exports = aaRegUser