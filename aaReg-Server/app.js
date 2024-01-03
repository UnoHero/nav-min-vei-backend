require('dotenv').config()
const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()
const port = process.env.PORT_AAREG
const mongoose = require("mongoose")
const aaRegModel = require("./models/aaRegModel")

// waiting on get request
app.get("/user/:id", async (req, res) => {
    let data = await test(req.params.id)
    try{
      let {firstName, middleName, lastName, dateOfBirth, country, city, address, postalCode, insurance} = data.result
      data = new aaRegModel({firstName, middleName, lastName, dateOfBirth ,country, city, address, postalCode, insurance})
      res.status(202).send(data)
    }catch(error){
      res.status(400).send("Cannot find user with specified id: " + req.params.id)
    }
})

// connect to mongoDB
const dbURI = process.env.MONGO_URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));


async function test(id){
  const client = new MongoClient(dbURI)
  try {
    
    // connects to aa-reg collection in database
    const database = client.db("Min-Vei-main")
    const aareg = database.collection("AA-reg")

    // Query for everything with the name "test"
    const query = { id : Number(id) }

    // Execute query
    const result = await aareg.findOne(query)

    return {result}
  } finally {
    await client.close()
  }
}
  
