require('dotenv').config()
const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()
const port = process.env.PORT_AAREG
const mongoose = require("mongoose")

// waiting on get request
app.get("/hent/:name", async (req, res) => {
    const data = await test(req.params.firstName)
    console.log(req.params)
    console.log(data)
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
    
    // connects to aa-reg collection in database
    const database = client.db("Min-Vei-main")
    const aareg = database.collection("AA-reg")

    // Query for everything with the name "test"
    const query = { firstName : firstName }
    const query2 = { firstName : {"$regex": `.*${firstName}.*`, "$options": "i" } }

    // Execute query
    const result = await aareg.findOne(query)
    const results = await aareg.find(query2).toArray()
    //Finds all documents in collection
    const allDocuments = await aareg.find().toArray()
    // Print the document returned by findOne()
    //console.log(result);
    //console.log(allDocuments)

    return {result : result, allDocuments, results}
  } finally {
    await client.close()
  }
}
  
