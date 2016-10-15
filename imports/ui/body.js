import { Meat } from 'meteor/brokenlinc:meat';

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
    return Session.get.bind(Session, 'messageLog');
  },
});