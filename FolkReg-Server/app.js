require('dotenv').config()
const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()
const port = process.env.PORT_FOLKREG
const mongoose = require("mongoose")
const FolkRegModel = require("./models/folkRegModel")

// waiting on get request
app.get("/user/:id", async (req, res) => {
    let data = await getUser(req.params.id)
    try{
      let {firstName, middleName, lastName, dateOfBirth, country, city, address, postalCode, relations, insurance} = data.result
      data = new FolkRegModel({firstName, middleName, lastName, dateOfBirth ,country, city, address, postalCode, relations, insurance})
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


async function getUser(id){
  const client = new MongoClient(dbURI)
  try {
    
    // connects to FolkReg collection in database
    const database = client.db("Min-Vei-main")
    const folkereg = database.collection("FolkReg")

    // Query for everything with the id "id"
    const query = { id : id }

    // Execute query
    const result = await folkereg.findOne(query)
    return {result}
  } finally {
    await client.close()
  }
}
  
