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
    console.log('session', req.session);
    console.log('cookies', req.cookies);
    let eventInfo = {
      event_name: req.body.eventName,
      time: req.body.dateTime,
      location: req.body.location,
      category: req.body.category,
      description: req.body.description,
      profile_id: req.session.passport.user
    };
    let newEvent = models.Event.forge(eventInfo);
    return newEvent.save()
    .then(() => {
      res.status(201).send('saved: ' + newEvent.get('event_name'));
    })
    .catch((err) => {
      res.status(400).send('error: ' + err);
    });
  });


module.exports = router;
