const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb')
// const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
//  const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();


// database connection
const dbURI = 'mongodb+srv://Test:Passord1@minveimain.pinxpui.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));