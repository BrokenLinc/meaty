import { Meaty } from '../../meaty/imports/meaty';

import '../startup/template-helpers.js';
import './avatars';
import './rooms';
import './messages';
import './mainmenu';

import './body.html';

Template.body.helpers({
  currentAvatar() {
    return Meaty.getCurrentAvatar();
  },
  rooms() {
    return Meaty.getRooms();
  },
  currentRoom() {
    return Meaty.getCurrentRoom();
  },
  messageLog() {
    return function() {
      return Session.get('messageLog');
    }
  },
});