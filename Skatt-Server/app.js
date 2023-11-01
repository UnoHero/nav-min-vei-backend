const express = require("express")
const { MongoClient } = require("mongodb")
const app = express()
const port = 3000
const mongoose = require("mongoose")

app.get("/", (req, res) => {
    res.send("Hello World")
    console.log("request answered")
})

const dbURI = "mongodb+srv://Test:Passord1@minveimain.pinxpui.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));


const client = new MongoClient(dbURI)

test()

async function test(){
  try {
    const database = client.db("Min-Vei-main")
    const skatteetatten = database.collection("Skatteetaten")

    // Query for everything with the name "test"
    const query = { name : "test" }
   
    // Execute query
    const result = await skatteetatten.findOne(query)
    //Finds all documents in collection
    const allDocuments = await skatteetatten.find().toArray()
    // Print the document returned by findOne()
    console.log(result);
    console.log(allDocuments)

  } finally {
    await client.close()
  }
}
  
