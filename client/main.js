import { Meat } from 'meteor/brokenlinc:meat';

import '../imports/ui/body.js';

Meteor.startup(() => {
  // This is what the game will listen to for player actions
  Session.set('messageLog', []);

  Meat.emitter.on('message-new', (message) => {
    var messageLog = Session.get('messageLog');
    messageLog.push(message);
    Session.set('messageLog', messageLog);
  });
});
