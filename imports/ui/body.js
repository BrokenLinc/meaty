import { Meat } from 'meteor/brokenlinc:meat';

import '../startup/template-helpers.js';
import './avatars';
import './rooms';
import './messages';
import './mainmenu';

import './body.html';

Template.body.helpers({
  currentAvatar() {
    return Meat.getCurrentAvatar();
  },
  rooms() {
    return Meat.getRooms();
  },
  currentRoom() {
    return Meat.getCurrentRoom();
  },
  messageLog() {
    return function() {
      return Session.get('messageLog');
    }
  },
});