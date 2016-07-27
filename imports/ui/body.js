import { Avatars } from '../api/avatars.js';
import { Rooms } from '../api/rooms.js';
import { Messages } from '../api/messages.js';
import { currentAvatar, currentRoom } from '../util/global-trackers.js';

import './forms/forms.js';
import './avatars.js';
import './rooms.js';
import './messages.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('avatars');
  Meteor.subscribe('rooms');
  Meteor.subscribe('messages');
});

Template.body.helpers({
  userAvatars() {
    return Avatars.find({owner: Meteor.userId()});
  },
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