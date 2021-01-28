const serverless = require('serverless-http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.get('/', async (req, res) => {
   res.send("<h2>Welcome to the Prestamos API for STB serverless App By Anima, Powered by Globant - 2020-2021</h2>")
});

module.exports.handler = serverless(app);
