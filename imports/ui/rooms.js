import { Meaty } from 'meteor/brokenlinc:meat';

import './rooms.html';

Template.roomListItem.helpers({
  avatarCount() {
    return Meaty.getRoomRoster(this._id).count();
  },
  isSelected() {
    return Meaty.isCurrentRoom(this._id);
  },
});

Template.roomListItem.events({
  'click .js-selectroom'(event) {
    event.preventDefault();
    Meaty.selectRoom(this._id);
  }
});

Template.roomCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
    const form = event.target;
    Meaty.createRoom(form.name.value);
    form.name.value = '';
  },
});

Template.roomDetail.helpers({
  avatarCount() {
    return Meaty.getRoomRoster(this._id).count();
  },
  avatars() {
    return Meaty.getRoomRoster(this._id);
  },
});

Template.roomDetail.events({
  'click .js-deselectroom'(event) {
    event.preventDefault();
    Meaty.exitRoom();
  }
});

