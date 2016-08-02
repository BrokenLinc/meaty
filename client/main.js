import { Meaty } from '../meaty/imports/meaty';

import '../imports/ui/body.js';

Meteor.startup(() => {
  // This is what the game will listen to for player actions
  Session.set('messageLog', []);

  Meaty.emitter.on('message-new', (message) => {
    var messageLog = Session.get('messageLog');
    messageLog.push(message);
    Session.set('messageLog', messageLog);
  });
});
