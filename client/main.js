import { Meat } from 'meteor/brokenlinc:meat';

import '../imports/ui/body.js';

// TODO: move into Meat, leave in session
//  then build in "/r" function by looking in session
Meteor.startup(() => {
  // This is what the game will listen to for player actions
  Session.set('messageLog', []);

  Meat.emitter.on('message-new', (message) => {
    var messageLog = Session.get('messageLog');
    messageLog.push(message);
    Session.set('messageLog', messageLog);
  });
});
