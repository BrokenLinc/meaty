import { Meat } from 'meteor/brokenlinc:meat';

import './messages.html';

Template.messageCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
    const form = event.target;
    Meat.parseCommand(form.text.value);
    form.text.value = '';
  },
});

Template.messageListItem.helpers({
  authorLabel() {
    // if I sent a public message, show who it went to instead
    // TODO: template helper for this in Meat
    if(this.subtype === 'PRIVATE' && this.avatarId === Meat.getCurrentAvatar()._id) {
      if(this.recipientAvatarId === this.avatarId) {
        return Meat.friendlyAvatarName(this.recipientAvatarName + '\'s inner monologue');
      }
      return 'to ' + Meat.friendlyAvatarName(this.recipientAvatarName);
    }
    return Meat.friendlyAvatarName(this.avatarName);
  }
});

// Keep scrolling to the bottom on every new message
// TODO: link a [tracked function] to a [selector string] helper for this in a UI package
//    as in: Potato.stayScrolledDown(selector, fn);
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