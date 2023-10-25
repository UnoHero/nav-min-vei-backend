const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")

app.get("/", (req, res) => {
    res.send("Hello World")
    console.log("request answered")
})

app.get("/lol", (req, res) => {
    res.send("lol")
    console.log("lol")
})

app.listen(port, () =>{
    console.log("e")
})

/*
const dbURI = 'mongodb+srv://Test:Passord1@minveimain.pinxpui.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

*/
