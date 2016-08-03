import { Meaty } from 'meteor/brokenlinc:meat';

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
    return showAvatarCreate.get() || Meaty.getMyAvatars().count() === 0;
  },
  userAvatars() {
    return Meaty.getMyAvatars();
  },
});

Template.avatarCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
    const form = event.target;

    //Meaty.createAvatar(form.name.value, callback);

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

      if(Meaty.isMyAvatar(this)) {
        Meaty.selectAvatar(this._id);
      } else {
        bootbox.alert("You don't own that!");
      }
    };
  },
});

Template.avatarManageListItem.events({
  'click .js-select'(event) {
    event.preventDefault();

    if(Meaty.isMyAvatar(this)) {
      Meaty.selectAvatar(this._id);
    } else {
      bootbox.alert("You don't own that!");
    }
  },
  'click .js-remove'(event) {
    event.preventDefault();

    const avatar = this;

    if(Meaty.isMyAvatar(avatar)) {
      bootbox.confirm('Delete "'+avatar.name+'"?', (didConfirm)=> {
        if(didConfirm) {
          Meaty.removeAvatar(avatar._id);
        }
      });
    } else {
      bootbox.alert("You don't own that!");
    }
  },
});