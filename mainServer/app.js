require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb")
const authRoutes = require('./routes/authRoutes');
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
  
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT_MAIN, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 