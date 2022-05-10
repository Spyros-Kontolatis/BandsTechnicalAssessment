const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bandRoutes = require("./routes/band");

var corsOptions = {
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
    preflightContinue: true, //DEBUG changed from false
    optionsSuccessStatus: 204
  }
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
  app.use(bodyParser.json());

var db = require('./config/keys').Bands;

    
const port = process.env.PORT || 5000;
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB Connected...')


      app.use("/api/band", bandRoutes);

      app.listen(port, ()=> console.log(`Server started on port ${port}`));
    })
    .catch(err => console.log(err));
