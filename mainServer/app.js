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

app.get("/hent/:name", async (req, res) => {
  const data = []

  for (host in ports){
    const response = await fetch(`http://localhost:${ports[host]}/hent/${req.params.name}`)
    const status = response.status
    if(status === 202){
      const jsonData = await response.json()
      data.push(jsonData)
    }
  }
  res.status(202).send(data)
})