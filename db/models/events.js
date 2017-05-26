const db = require('../');
const Promise = require('bluebird');

const Event = db.Model.extend({
  tableName: 'events',
  profiles: function() {
    return this.belongsToMany(Profile).through(Event_Profile);
  },
  // comments: function() {
  //   return this.hasMany('Comment');
  // },
});

module.exports = db.model('Event', Event);
