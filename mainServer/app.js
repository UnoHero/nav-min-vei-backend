require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb")
const authRoutes = require('./routes/authRoutes');
//const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT_MAIN;

app.get("/hent/:name", async (req, res) => {
  const SkattResponse = await fetch(`http://localhost:3001/hent/${req.params.name}`)
  const FolkRegResponse = await fetch(`http://localhost:3002/hent/${req.params.name}`)
  const AARegResponse = await fetch(`http://localhost:3002/hent/${req.params.name}`)
  const SkattStatus = SkattResponse.status
  const FolkRegStatus = FolkRegResponse.status
  const AARegStatus = AARegResponse.status
  const SkattData = await SkattResponse.json()
  const FolkRegData = await FolkRegResponse.json()
  const AARegData = await AARegResponse.json()
  console.log(SkattStatus)
  console.log(FolkRegStatus)
  console.log(AARegStatus)
  console.log(req.params)
  console.log(SkattData)
  console.log(FolkRegData)
  console.log(AARegData)
  let data = {SkattData, FolkRegData, AARegData}
  res.status(202).send(data)
})

// database connection
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));
  