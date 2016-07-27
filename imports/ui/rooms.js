import { Avatars } from '../api/avatars';
import { currentRoom } from '../util/global-trackers';

import './rooms.html';

Template.roomListItem.helpers({
  avatarCount() {
    return Avatars.find({roomId: this._id}).count();
  },
  isSelected() {
    if(!currentRoom.get()) return false;
    return this._id === currentRoom.get()._id;
  },
  onSelect() {
    return (event) => {
      event.preventDefault();

      const roomId = this._id;

      Meteor.call('avatars.update', Session.get('avatarId'), { roomId });
    }
  }
});

Template.roomCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
 
    const form = event.target;

    Meteor.call('rooms.insert', form.name.value);
    form.name.value = '';
  },
});

Template.roomListItem.events({
  'click .me-remove'(event) {
    event.preventDefault();

    const roomId = this._id;

    if(this.owner === Meteor.userId()) {
      bootbox.confirm('Delete "'+this.name+'"?', (didConfirm)=> {
        if(didConfirm) {
          Meteor.call('rooms.remove', roomId);
        }
      });
    } else {
      bootbox.alert("You don't own that!");
    }
  },
});

Template.roomDetail.helpers({
  avatarCount() {
    return Avatars.find({roomId: this._id}).count();
  },
  avatars() {
    return Avatars.find({roomId: this._id});
  },
});

