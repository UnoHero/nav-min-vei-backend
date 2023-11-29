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
    const [SkattResponse, FolkRegResponse, AARegResponse] = await Promise.all([
      fetch(`http://localhost:${process.env.PORT_SKATT}/hent/${req.params.firstName}`),
      fetch(`http://localhost:${process.env.PORT_FOLKREG}/hent/${req.params.firstName}`),
      fetch(`http://localhost:${process.env.PORT_AAREG}/hent/${req.params.firstName}`)
    ]);

    const SkattStatus = SkattResponse.status;
    const FolkRegStatus = FolkRegResponse.status;
    const AARegStatus = AARegResponse.status;

    const SkattData = await SkattResponse.json();
    const FolkRegData = await FolkRegResponse.json();
    const AARegData = await AARegResponse.json();

    console.log(SkattStatus);
    console.log(FolkRegStatus);
    console.log(AARegStatus);
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
