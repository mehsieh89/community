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
      // FIXME: replace the hard-coded data with info from req.body
      event_name: 'picnic',
      time: '06/07/2018',
      location: 'San Francisco',
      category: 'Food',
    };
    let newEvent = models.Event.forge(eventInfo);
    return newEvent.save()
    .then(() => {
      res.status(201).send('saved: ' + newEvent.get('event_name'));
    });
  });


module.exports = router;
