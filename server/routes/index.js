var express = require('express');
var router = express.Router();
const yelp = require('yelp-fusion')
const client = yelp.client('_Xq8DjGJagkvgDYErQGLNgiugLE7JwUQWyL4ToKmbS0KQ0VNxRx0fjDUH_hOeXLaxnjt0xik72kSGFd2IG1srO90u_iwNz0izf69AVfOWzf7-CjuLwi6dGgyhP_qW3Yx')

/* GET home page. */
router.get('/auto', (req, res, next) => {
  client.autocomplete({
    'text': req.query.text,
    'latitude': req.query.latitude,
    'longitude': req.query.longitude
  }).then(
    results => {
      res.status(200).send(results)
    }
  )
    .catch(err => {
      res.send(err.statusCode).send({ message: err.message, error: err })
    })
});

router.get('/business/search/noLoc', (req, res) => {

  console.log(req.query.term, typeof req.query.term)

  let options = {
    location: `${req.query.city}, ${req.query.state}`,
    categories: 'restaurants',
    price: req.query.price,
    open_now: true,
  }

  if (req.query.term !== null && req.query.term !== 'null') {
    options.term = req.query.term
  }

  client.search(options)
    .then(results => {
      console.log(results)
      res.status(200).send(results)
    })
    .catch(err => {
      res.status(err.statusCode).send({ message: err.message, error: err })
    })
})

router.get('/business/search/Loc', (req, res) => {
  loc = `${req.query.city}, ${req.query.state}`
  client.search({
    latitude: req.query.latitude,
    longitude: req.query.longitude,
    categories: 'restaurants',
    price: req.query.price,
    open_now: true,
    term: req.query.term !== null || undefined || '' ? req.query.term : '*'
  })
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      res.status(err.statusCode).send({ message: err.message, error: err })
      console.log(err)
    })
})

module.exports = router;
