import { Avatars } from '../api/avatars';

import './avatars.html';

const showAvatarCreate = new ReactiveVar(false);

Template.avatarSelection.events({
  'click .js-showavatarcreate'(event) {
    event.preventDefault();
    
    showAvatarCreate.set(true);
  }
});

Template.avatarSelection.helpers({
  showAvatarCreate() {
    return showAvatarCreate.get() || Avatars.find({owner: Meteor.userId()}).count === 0;
  },
  userAvatars() {
    return Avatars.find({owner: Meteor.userId()});
  },
});

Template.avatarCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
 
    const form = event.target;

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

      if(this.owner === Meteor.userId()) {
        Session.set('avatarId', this._id);
      } else {
        bootbox.alert("You don't own that!");
      }
    };
  },
});

Template.avatarManageListItem.events({
  'click .js-select'(event) {
    event.preventDefault();

    if(this.owner === Meteor.userId()) {
      Session.set('avatarId', this._id);
    } else {
      bootbox.alert("You don't own that!");
    }
  },
  'click .js-remove'(event) {
    event.preventDefault();

    const id = this._id;

    if(this.owner === Meteor.userId()) {
      bootbox.confirm('Delete "'+this.name+'"?', (didConfirm)=> {
        if(didConfirm) {
          Meteor.call('avatars.remove', id);
        }
      });
    } else {
      bootbox.alert("You don't own that!");
    }
  },
});