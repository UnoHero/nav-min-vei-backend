const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
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
    postalCode: {
        type: Number,
        required: true
    },
    address: {
        type: Number,
        required: true
    },
    relations: {
        type: String,
        required: false
    },
    grossIncome: {
        type: Number,
        required: true
    },
    insurance: {
        type: String,
        required: false
    },

}, { timestamps: true })

const finalUser = mongoose.model('user', userSchema)

module.exports = finalUser