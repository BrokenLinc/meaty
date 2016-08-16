import { Meat } from 'meteor/brokenlinc:meat';

import './avatars.html';

// TODO: look for leaner way to handle view toggling (no routes)
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

    Meat.createAvatar(form.name.value, null, function(error, id){
      if(error && error.error === 'avatar-name-taken') {
        toastr.error(e.reason);
        return;
      }
      form.name.value = '';
      showAvatarCreate.set(false);
      Meat.selectAvatar(id);
    });
  },
  // TODO look into lean way to restrict field input, or abstract it out.
  'keyup .js-avatarname'(event) {
    const el = event.target;
    let sanitized = Meat.sanitizeAvatarName(el.value);
    if(sanitized !== el.value) el.value = sanitized;
  },
});

Template.avatarManageListItem.events({
  'click .js-select'(event) {
    event.preventDefault();

    // TODO: move ownership check into Meat, return error in callback/try/catch
    if(Meat.isMyAvatar(this)) {
      Meat.selectAvatar(this._id);
    } else {
      bootbox.alert("You don't own that!");
    }
  },
  'click .js-remove'(event) {
    event.preventDefault();

    const avatar = this;

    // TODO: move ownership check into Meat, return error in callback/try/catch
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