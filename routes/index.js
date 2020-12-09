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
router.get('/catalog', function (req, res) {
  res.sendFile(path.resolve(html + '/catalog.html'));
});
router.get('/search', function (req, res) {
  res.sendFile(path.resolve(html + '/search.html'));
});

router.post('/get_goods', jsonParser, function (req, res) {
  let goods;
  console.log(req.body.search);
  if (req.body.search == '' || req.body.search == null) goods = db.select_objs('products');
  else goods = db.search_obj('products', 'name', req.body.search);
  res.send(goods)
});

router.post('/picture', jsonParser, function (req, res) {
  console.log(req.body.id);
  res.send({status:'ok'})
});

module.exports = router;