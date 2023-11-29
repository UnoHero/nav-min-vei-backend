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

app.get("/hent/:firstName", async (req, res) => {
  try {
    const [SkattResponse, FolkRegResponse, AARegResponse] = await Promise.allSettled([
      fetch(`http://localhost:${process.env.PORT_SKATT}/hent/${req.params.firstName}`),
      fetch(`http://localhost:${process.env.PORT_FOLKREG}/hent/${req.params.firstName}`),
      fetch(`http://localhost:${process.env.PORT_AAREG}/hent/${req.params.firstName}`)
    ]);

    let SkattData = "";
    let FolkRegData = "";
    let AARegData = "";

    if (SkattResponse.status === "fulfilled") {
      SkattData = await SkattResponse.value.json();
    } 

    if (FolkRegResponse.status === "fulfilled") {
      FolkRegData = await FolkRegResponse.value.json();
    } 

    if (AARegResponse.status === "fulfilled") {
      AARegData = await AARegResponse.value.json();
    } 
    console.log(req.params);
    console.log(SkattData);
    console.log(FolkRegData);
    console.log(AARegData);

    let data = { SkattData, FolkRegData, AARegData };
    res.status(202).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
