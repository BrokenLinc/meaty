import { currentAvatar } from '../util/global-trackers';
import { messageEmitter } from '../util/global-emitters';

import './messages.html';

Template.messageCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
 
    const form = event.target;

    Meteor.call(
      'messages.insert', 
      currentAvatar.get()._id,
      form.name.value,
      {}
    );
    form.name.value = '';
  },
});

// This is what the game will listen to for player actions
messageEmitter.on('message-new', function(message) {
  console.log(message);
});