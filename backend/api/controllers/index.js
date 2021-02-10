const serverless = require('serverless-http');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const LoginService = require('../login');
const RegisterService = require('../register');
const ReturnService = require('../returnLoans');
const StoreService = require('../storeLoan');
const UpdateService = require('../updateLoan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  base url to test our API
app.get('/', async (req, res) => {
   res.send("<h2>Welcome to the Prestamos API for STB serverless App By Anima, Powered by Globant - 2020-2021</h2>")
});

app.post('/api/login', async (req, res) => {
  try {
      let ls = await LoginService.login(req, res);
      res.status(ls.status).json(ls);
  } catch (error) {
      res.status(500).json(error);
  }
 
});

app.post('/api/register', async (req, res) => {
  try {
      let ls = await RegisterService.register(req, res);
      res.status(ls.status).json(ls);
  } catch (error) {
      res.status(500).json(error);
  }
 
});

app.post('/api/returnLoans', async (req, res) => {
  try {
      let ls = await ReturnService.returnLoans(req, res);
      res.status(ls.status).json(ls);
  } catch (error) {
      res.status(500).json(error);
  }
 
});

app.post('/api/storeLoan', async (req, res) => {
  try {
      let ls = await StoreService.store(req, res);
      res.status(ls.status).json(ls);
  } catch (error) {
      res.status(500).json(error);
  }
 
});

app.post('/api/updateLoan', async (req, res) => {
  try {
      let ls = await UpdateService.update(req, res);
      res.status(ls.status).json(ls);
  } catch (error) {
      res.status(500).json(error);
  }
 
});

module.exports.handler = serverless(app);
