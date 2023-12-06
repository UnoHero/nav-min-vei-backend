require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/authRoutes');
//const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT_MAIN;
const ports = [process.env.PORT_SKATT, process.env.PORT_FOLKREG, process.env.PORT_AAREG]

app.listen(port, () => {
  console.log('Server running on port 3000')
})

app.use(authRoutes)