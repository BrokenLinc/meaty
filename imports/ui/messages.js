import { Meaty } from 'meteor/brokenlinc:meat';

import './messages.html';

Template.messageCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
    const form = event.target;
    Meaty.sendMessage(form.text.value, {});
    form.text.value = '';
  },
});

Template.messageList.onRendered(function() {
  if (typeof this.data.messages === 'function') {
    var template = this;

    //TODO: desotry this when the template is destroyed
    // causes error when switchig rooms
    Tracker.autorun(() => {
      template.data.messages();

      // Allow time for re-render
      Meteor.setTimeout(() => {
        var container = template.find('.js-scrollContainer');
        container.scrollTop = container.scrollHeight;
      }, 1);
    });
  }
});
