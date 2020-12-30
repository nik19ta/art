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
router.get('/product', function (req, res) {
  res.sendFile(path.resolve(html + '/product.html'));
});
router.get('/search', function (req, res) {
  res.sendFile(path.resolve(html + '/search.html'));
});

router.post('/get_goods', jsonParser, function (req, res) {
  let goods;
  if (req.body.params != null) {

    goods = db.search_obj('products', 'category', req.body.params);
    res.send(goods)
  } else {
    res.send(db.select_objs('products'))
  }
});
router.post('/get_product', jsonParser, function (req, res) {
  if (req.body.id) {
    data = db.search_obj_int('products', 'id', req.body.id);
    similar_data = db.search_obj_similar('products', 'category', data[0].category, 'id', data[0].id);
    console.log(data);
    res.send({"status":"ok", "data": data, "similar": similar_data})
  } else {
    res.send({"status":"error"})
  }
});

router.post('/picture', jsonParser, function (req, res) {
  res.send({status:'ok'})
});

module.exports = router;