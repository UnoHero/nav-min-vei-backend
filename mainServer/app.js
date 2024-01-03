require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors')
//const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT_MAIN;

app.use(cors())

app.listen(port, () => {
  console.log('Server running on port 3000')
})

app.use(authRoutes)