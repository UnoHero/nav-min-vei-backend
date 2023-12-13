require('dotenv').config()
const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()
const port = process.env.PORT_FOLKREG
const mongoose = require("mongoose")
const FolkRegModel = require("./models/folkRegModel")

// waiting on get request
app.get("/hent/:firstName", async (req, res) => {
    let data = await test(req.params.firstName)

    let {firstName, middleName, lastName, dateOfBirth, country, city, address, postalCode, relations, insurance, _id} = data.result

    data = new FolkRegModel({firstName, middleName, lastName, dateOfBirth ,country, city, address, postalCode, relations, insurance, _id})

    //console.log(req.params)
    //console.log(data)
    res.status(202).send(data)
})

// connect to mongoDB
const dbURI = process.env.MONGO_URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));


async function test(firstName){
  const client = new MongoClient(dbURI)
  try {
    
    // connects to FolkReg collection in database
    const database = client.db("Min-Vei-main")
    const folkereg = database.collection("FolkReg")

    // Query for everything with the name "test"
    const query = { firstName : {"$regex": firstName, "$options": "i"} }
    //const query2 = { firstName : {"$regex": `.*${firstName}.*`, "$options": "i" } }

    // Execute query
    const result = await folkereg.findOne(query)
    //const results = await folkereg.find(query2).toArray()
    /*
    //Finds all documents in collection
    const allDocuments = await folkereg.find().toArray()
    // Print the document returned by findOne()
    */
    //console.log(result);
    //console.log(allDocuments)
  

    return {result, /*allDocuments, results*/}
  } finally {
    await client.close()
  }
}
  
