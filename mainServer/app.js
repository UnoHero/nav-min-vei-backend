const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// listen for requests
const port = 3000;
app.listen(port);
console.log(`Listening for request on port ${port}`);

// database connection
const dbURI = 'mongodb+srv://Test:Passord1@minveimain.pinxpui.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));
  