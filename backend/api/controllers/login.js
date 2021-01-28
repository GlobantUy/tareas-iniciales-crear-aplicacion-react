const serverless = require('serverless-http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const LoginService = require('../login');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.post('/api/login', async (req, res) => {
    try {
        let ls = await LoginService.login(req, res);
        res.status(200).json(ls);
    } catch (error) {
        res.status(500).json(error);
    }
   
});

module.exports.handler = serverless(app);
