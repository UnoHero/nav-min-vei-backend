const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb")
//const authRoutes = require('./routes/authRoutes');
//const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.get("/hent/:name", async (req, res) => {
  const response = await fetch(`http://localhost:3001/hent/${req.params.name}`)
  const status = response.status
  const data = await response.json()
  console.log(status)
  console.log(req.params)
  console.log(data)
  res.send(data)
  res.status(202)
})

app.get("/hent/:name", async (req, res) => {
  const response = await fetch(`http://localhost:3002/hent/${req.params.name}`)
  const status = response.status
  const data = await response.json()
  console.log(status)
  console.log(req.params)
  console.log(data)
  res.send(data)
  res.status(202)
})

app.get("/hent/:name", async (req, res) => {
  const response = await fetch(`http://localhost:3003/hent/${req.params.name}`)
  const status = response.status
  const data = await response.json()
  console.log(status)
  console.log(req.params)
  console.log(data)
  res.send(data)
  res.status(202)
})

// database connection
const dbURI = 'mongodb+srv://Test:Passord1@minveimain.pinxpui.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));
  