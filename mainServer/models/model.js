const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    firstName:{
        skatt: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    middleName:
    {
        skatt: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    }, 
    lastName: 
    {
        skatt: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    }, 
    dateOfBirth: {
        skatt: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    country: {
        skatt: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    city: {
        skatt: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    postalCode: {
        skatt: {type: Number},
        folkReg: {type: Number},
        aaReg: {type: Number},
    },
    address: {
        skatt: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    relations: {
        type: String
    },
    grossIncome: {
        type: Number
    },
    insurance: {
        type: String
    },
}, { timestamps: true , _id : false})

const finalUser = mongoose.model('user', userSchema)

module.exports = finalUser