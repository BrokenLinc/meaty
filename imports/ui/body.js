import { Avatars } from '../api/avatars';
import { Rooms } from '../api/rooms';
import { Messages } from '../api/messages';
import { currentAvatar, currentRoom } from '../util/global-trackers';

import './forms/forms';
import './avatars';
import './rooms';
import './messages';
import './mainmenu';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('avatars');
  Meteor.subscribe('rooms');
  Meteor.subscribe('messages');
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
  roomMessages() {
    if(!currentRoom.get()) return;
    return Messages.find({ roomId: currentRoom.get()._id },
      {sort: {createdAt : -1}, limit: 10 }).fetch().reverse();
  },
});