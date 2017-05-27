'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../db/models');

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

// create event in the events table
router.route('/createEvent')
  .post((req, res) => {
    let eventInfo = {
      event_name: req.body.eventName,
      time: req.body.time,
      location: req.body.location,
      category: req.body.category,
    };
    let newEvent = models.Event.forge(eventInfo);
    return newEvent.save()
    .then(() => {
      res.status(201).send('saved: ' + newEvent.get('event_name'));
    });
  });


module.exports = router;
