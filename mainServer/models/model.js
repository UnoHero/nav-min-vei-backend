const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    firstName:{
        skattReg: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    middleName:
    {
        skattReg: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    }, 
    lastName: 
    {
        skattReg: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    }, 
    dateOfBirth: {
        skattReg: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    country: {
        skattReg: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    city: {
        skattReg: {type: String},
        folkReg: {type: String},
        aaReg: {type: String},
    },
    postalCode: {
        skattReg: {type: Number},
        folkReg: {type: Number},
        aaReg: {type: Number},
    },
    address: {
        skattReg: {type: String},
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