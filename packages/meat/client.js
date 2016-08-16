import { Meat } from './meat';

Meteor.startup(() => {
  Meteor.subscribe('avatars');
  Meteor.subscribe('rooms');
  Meteor.subscribe('messages');

  // This is what the game will listen to for player actions
  Session.set('messageLog', []);

  Meat.emitter.on('message-new', (message) => {
    var messageLog = Session.get('messageLog');
    messageLog.push(message);
    Session.set('messageLog', messageLog);
  });
});