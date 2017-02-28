import { Meat } from 'meteor/brokenlinc:meat';

import './rooms.html';

Template.roomListItem.helpers({
  avatarCount() {
    return Meat.getRoomRoster(this._id).count();
  },
  isSelected() {
    return Meat.isCurrentRoom(this._id);
  },
});

Template.roomListItem.events({
  'click .js-enterroom'(event) {
    event.preventDefault();
    Meat.enterRoom(this._id);
  }
});

Template.roomCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
    const form = event.target;
    Meat.createRoom(form.name.value);
    form.name.value = '';
  },
});

Template.roomDetail.helpers({
  avatarCount() {
    return Meat.getRoomRoster(this._id).count();
  },
  avatars() {
    return Meat.getRoomRoster(this._id);
  },
});

Template.roomDetail.events({
  'click .js-exitroom'(event) {
    event.preventDefault();
    Meat.exitRoom();
  }
});

