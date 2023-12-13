const mongoose = require('mongoose')

const Schema = mongoose.Schema

const skattSchema = new Schema ({
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
    dateOfBirth: {
        type: String,
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
    grossIncome: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const skattUser = mongoose.model('skattUser', skattSchema)

module.exports = skattUser