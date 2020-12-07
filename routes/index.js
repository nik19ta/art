const cookieParser = require('cookie-parser');
const express = require('express');
const router = express.Router();
const path = require('path');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const db = require('../db')

const html = './public/html';

const urlgenerator = require('urlgenerator');

router.get('/', function (req, res) {
  res.sendFile(path.resolve(html + '/index.html'));
});

router.post('/get_goods', jsonParser, function (req, res) {
  let goods;
  console.log(req.body.search);
  if (req.body.search == '' || req.body.search == null) goods = db.select_objs('products');
  else goods = db.search_obj('products', 'name', req.body.search);
  res.send(goods)
});

module.exports = router;