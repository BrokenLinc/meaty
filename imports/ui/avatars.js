import './avatars.html';

Template.avatarCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
 
    const form = event.target;

    Meteor.call('avatars.insert', form.name.value);
    form.name.value = '';
  },
});

Template.avatarManageListItem.helpers({
  isSelected() {
    return Session.equals('avatarId', this._id);
  },
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