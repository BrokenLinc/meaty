import { Meat } from 'meteor/brokenlinc:meat';

import './messages.html';

Template.messageCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
    const form = event.target;
    Meat.sendMessage(form.text.value, {});
    form.text.value = '';
  },
});

// Keep scrolling to the bottom on every new message
let messageTrackerComputation;
Template.messageList.onRendered(function() {
  if (typeof this.data.messages === 'function') {
    var template = this;

    messageTrackerComputation = Tracker.autorun(() => {
      template.data.messages(); //create a Message dependency

      // Allow time for re-render
      Meteor.setTimeout(() => {
        var container = template.find('.js-scrollContainer');
        container.scrollTop = container.scrollHeight;
      }, 1);
    });
  }
});
Template.messageList.onDestroyed(function() {
  if(messageTrackerComputation) messageTrackerComputation.stop();
});