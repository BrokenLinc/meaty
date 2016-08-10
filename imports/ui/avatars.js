import { Meat } from 'meteor/brokenlinc:meat';

import './avatars.html';

const showAvatarCreate = new ReactiveVar(false);

Template.avatarSelection.events({
  'click .js-showavatarcreate'(event) {
    event.preventDefault();
    showAvatarCreate.set(true);
  },
  'click .js-hideavatarcreate'(event) {
    event.preventDefault();
    showAvatarCreate.set(false);
  }
});

Template.avatarSelection.helpers({
  showAvatarCreate() {
    return showAvatarCreate.get();
  },
  userAvatars() {
    return Meat.getMyAvatars();
  },
  hasAvatars() {
    return Meat.getMyAvatars().count() > 0;
  },
});

Template.avatarCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
    const form = event.target;

    //Meat.createAvatar(form.name.value, callback);

    Meteor.call('avatars.insert', form.name.value, function(error, id){
      form.name.value = '';
      showAvatarCreate.set(false);
      Session.set('avatarId', id);
    });
  },
});

Template.avatarManageListItem.helpers({
  onSelect() {
    return (event) => {
      event.preventDefault();

      if(Meat.isMyAvatar(this)) {
        Meat.selectAvatar(this._id);
      } else {
        bootbox.alert("You don't own that!");
      }
    };
  },
});

Template.avatarManageListItem.events({
  'click .js-select'(event) {
    event.preventDefault();

    if(Meat.isMyAvatar(this)) {
      Meat.selectAvatar(this._id);
    } else {
      bootbox.alert("You don't own that!");
    }
  },
  'click .js-remove'(event) {
    event.preventDefault();

    const avatar = this;

    if(Meat.isMyAvatar(avatar)) {
      bootbox.confirm('Delete "'+avatar.name+'"?', (didConfirm)=> {
        if(didConfirm) {
          Meat.removeAvatar(avatar._id);
        }
      });
    } else {
      bootbox.alert("You don't own that!");
    }
  },
});