import { Avatars } from '../api/avatars';
import { Rooms } from '../api/rooms';
import { Messages } from '../api/messages';
import { currentAvatar, currentRoom } from '../util/global-trackers';
import { messageEmitter } from '../util/global-emitters';

import './forms/forms';
import './avatars';
import './rooms';
import './messages';
import './mainmenu';
import './body.html';

Template.body.onCreated(() => {
  Meteor.subscribe('avatars');
  Meteor.subscribe('rooms');
  Meteor.subscribe('messages');

  // This is what the game will listen to for player actions
  Session.set('messageLog', []);
  messageEmitter.on('message-new', (message) => {
    var messageLog = Session.get('messageLog');
    messageLog.push(message);
    Session.set('messageLog', messageLog);
  });
});

Template.body.helpers({
  currentAvatar() {
    return currentAvatar.get();
  },
  rooms() {
    return Rooms.find({});
  },
  currentRoom() {
    return currentRoom.get();
  },
  messageLog() {
    return function() {
      return Session.get('messageLog');
    }
  },
});