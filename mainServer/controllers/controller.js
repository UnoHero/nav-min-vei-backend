const mongoose = require("mongoose")
const finalUser = require("../models/model")

module.exports.get_info = async (req, res) => {
  try {
    const [SkattResponse, FolkRegResponse, AARegResponse] = await Promise.allSettled([
      fetch(`http://localhost:${process.env.PORT_SKATT}/hent/${req.params.id}`),
      fetch(`http://localhost:${process.env.PORT_FOLKREG}/hent/${req.params.id}`),
      fetch(`http://localhost:${process.env.PORT_AAREG}/hent/${req.params.id}`)
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
    
    let test = [SkattData, FolkRegData, AARegData]
    let obj = []
    try{
      test.forEach(e => {
        if(e == SkattData){
          var model = skattModel
          var user = skattUser
        }
        if(e == FolkRegData){
          var model = folkRegModel
          var user = folkRegUser
        }
        if(e == AARegData){
          var model = aaRegModel
          var user = aaRegUser
        }
    
        const {firstName, middleName, lastName, dateOfBirth, country, city, address, postalCode, grossIncome, relations, insurance, _id} = e.result

        user = new model({firstName, middleName, lastName, dateOfBirth ,country, city, address, postalCode, grossIncome, relations, insurance, _id})
        
        obj = obj.concat(user) 
        
      });

      var finalUserData

      const {firstName, middleName, lastName, dateOfBirth, country, city, address, postalCode, grossIncome,} = obj[0]
      const {relations} = obj[1]
      const {insurance} = obj[2]
      
      finalUserData = new finalUser({firstName, middleName, lastName, dateOfBirth, country, city, address, postalCode, grossIncome, relations, insurance})
      
      //console.log(SkattData)
      } catch(error){
        console.log(error)
      }
    
    res.status(202).send(finalUserData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}