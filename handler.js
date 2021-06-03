'use strict';

require('./src/index');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const cors = require('cors');
const express = require('express');
const ShoppingListControllers = require('./src/index');

const corsOptions = {
  optionsSuccessStatus: 200
};

const app = express().use('*', cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/shopping-list/create', (req, res) => {
  ShoppingListControllers.create(req, res);
});

app.get('/shopping-list/get/:id', (req, res) => {
  ShoppingListControllers.findOne(req, res);
});

app.get('/shopping-list/get', (req, res) => {
  ShoppingListControllers.findAll(req, res);
});

app.put('/shopping-list/update/:id', (req, res) => {
  ShoppingListControllers.update(req, res);
});

app.delete('/shopping-list/delete/:id', (req, res) => {
  ShoppingListControllers.delete(req, res);
});

app.delete('/shopping-list/delete', (req, res) => {
  ShoppingListControllers.deleteAll(req, res);
});

module.exports.handler = serverless(app);
