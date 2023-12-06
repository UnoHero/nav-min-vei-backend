require('dotenv').config()
const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()
const port = process.env.PORT_SKATT
const mongoose = require("mongoose")

// waiting on get request
app.get("/hent/:firstName", async (req, res) => {
    const data = await test(req.params.firstName)
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
    
    const database = client.db("Min-Vei-main")
    const skatteetatten = database.collection("Skatteetaten")

    // Query for everything with the name "test"
    const query = { firstName : {"$regex": firstName, "$options": "i"} }
    //const query2 = { firstName : {"$regex": `.*${firstName}.*`, "$options": "i" } }

    // Execute query
    const result = await skatteetatten.findOne(query)
    //const results = await skatteetatten.find(query2).toArray()
    /*
    //Finds all documents in collection
    const allDocuments = await skatteetatten.find().toArray()
    // Print the document returned by findOne()
    //console.log(result);
    //console.log(allDocuments)
    */

    return {result, /*allDocuments, results*/}
  } finally {
    await client.close()
  }
}
