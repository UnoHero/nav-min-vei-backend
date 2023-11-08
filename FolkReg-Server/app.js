const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()
const port = 3002
const mongoose = require("mongoose")

// waiting on get request
app.get("/hent/:name", async (req, res) => {
    const data = await test(req.params.name)
    console.log(req.params)
    console.log(data)
    res.status(202).send(data)
})

// connect to mongoDB
const dbURI = "mongodb+srv://Test:Passord1@minveimain.pinxpui.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));


async function test(name){
  const client = new MongoClient(dbURI)
  try {
    
    // connects to FolkReg collection in database
    const database = client.db("Min-Vei-main")
    const skatteetatten = database.collection("FolkReg")

    // Query for everything with the name "test"
    const query = { name : name }
    const query2 = { name : {"$regex": `.*${name}.*`, "$options": "i" } }

    // Execute query
    const result = await skatteetatten.findOne(query)
    const results = await skatteetatten.find(query2).toArray()
    //Finds all documents in collection
    const allDocuments = await skatteetatten.find().toArray()
    // Print the document returned by findOne()
    console.log(result);
    console.log(allDocuments)

    return {result2 : result, allDocuments, results}
  } finally {
    await client.close()
  }
}
  
