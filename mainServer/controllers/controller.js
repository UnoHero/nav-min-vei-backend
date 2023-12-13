const mongoose = require("mongoose")
const finalUser = require("../models/model")

module.exports.get_info = async (req, res) => {
  try {
    const [SkattResponse, FolkRegResponse, AARegResponse] = await Promise.allSettled([
      fetch(`http://localhost:${process.env.PORT_SKATT}/hent/${req.params.firstName}`),
      fetch(`http://localhost:${process.env.PORT_FOLKREG}/hent/${req.params.firstName}`),
      fetch(`http://localhost:${process.env.PORT_AAREG}/hent/${req.params.firstName}`)
    ]);


    let SkattData = "";
    let FolkRegData = "";
    let AARegData = "";

    if (SkattResponse.status === "fulfilled") {
      SkattData = await SkattResponse.value.json();
    } 

    if (FolkRegResponse.status === "fulfilled") {
      FolkRegData = await FolkRegResponse.value.json();
    } 

    if (AARegResponse.status === "fulfilled") {
      AARegData = await AARegResponse.value.json();
    } 
    
  
    const {dateOfBirth, country, city, address, postalCode} = SkattData
    const {
      firstName: skattFirstName,
      middleName: skattMiddleName, 
      lastName: skattLastName,
      dateOfBirth: skattDateOfBirth, 
      country: skattCountry,
      city: skattCity,
      address: skattAddress,
      postalCode: skattPostalCode,
      grossIncome
    } = SkattData
    const {
      firstName: folkRegFirstName,
      middleName: folkRegMiddleName, 
      lastName: folkRegLastName,
      dateOfBirth: folkRegDateOfBirth, 
      country: folkRegCountry,
      city: folkRegCity,
      address: folkRegAddress,
      postalCode: folkRegPostalCode,
      relations} = FolkRegData
    const {
      firstName: aaRegFirstName, 
      middleName: aaRegMiddleName, 
      lastName: aaRegLastName, 
      dateOfBirth: aaRegDateOfBirth, 
      country: aaRegCountry,
      city: aaRegCity,
      address: aaRegAddress,
      postalCode: aaRegPostalCode,
      insurance} = AARegData

    let finalUserData = new finalUser({
      firstName:{
        skatt: skattFirstName,
        folkReg: folkRegFirstName,
        aaReg: aaRegFirstName,
      }, 
      middleName:{
        skatt: skattMiddleName,
        folkReg: folkRegMiddleName,
        aaReg: aaRegMiddleName,
      },
      lastName:{
        skatt: skattLastName,
        folkReg: folkRegLastName,
        aaReg: aaRegLastName
      },
      dateOfBirth:{
        skatt: skattDateOfBirth,
        folkReg: folkRegDateOfBirth,
        aaReg: aaRegDateOfBirth
      }, 
      country:{
        skatt: skattCountry,
        folkReg: folkRegCountry,
        aaReg: aaRegCountry
      }, 
      city:{
        skatt: skattCity,
        folkReg: folkRegCity,
        aaReg: aaRegCity
      },
      address:{
        skatt: skattAddress,
        folkReg: folkRegAddress,
        aaReg: aaRegAddress
      }, 
      postalCode:{
        skatt: skattPostalCode,
        folkReg: folkRegPostalCode,
        aaReg: aaRegPostalCode
      },
      grossIncome,
      relations, 
      insurance
    })
    
    res.status(202).send(finalUserData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}