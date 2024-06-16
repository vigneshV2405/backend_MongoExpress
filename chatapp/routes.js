const express = require('express');
const { getFriends } = require('./controllers');
const Router = express.Router();

Router.get('/',getFriends)

module.exports = Router;