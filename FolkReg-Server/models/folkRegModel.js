const mongoose = require('mongoose')

const Schema = mongoose.Schema

const folkRegSchema = new Schema ({
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
    relations: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
}, { timestamps: true, _id : false })

const folkRegUser = mongoose.model('folkRegUser', folkRegSchema)

module.exports = folkRegUser