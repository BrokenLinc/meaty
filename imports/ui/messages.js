import { Meat } from 'meteor/brokenlinc:meat';
import { Sauce } from 'meteor/brokenlinc:sauce';

import './messages.html';

Template.messageCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
    const form = event.target;
    Meat.parseCommand(form.text.value);
    form.text.value = '';
  },
});

let messageScrollDowner;
Template.messageList.onRendered(function() {
  messageScrollDowner = new Sauce.ScrollDowner(
    this.find.bind(this, '.js-scrollContainer'), 
    this.data.messages
  );
});
Template.messageList.onDestroyed(function() {
  messageScrollDowner.destroy();
});