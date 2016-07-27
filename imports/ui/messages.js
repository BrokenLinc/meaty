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

messageEmitter.on('message-new', function(id, fields) {
  console.log(id);
  console.log(fields);
});