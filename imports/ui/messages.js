import { currentAvatar } from '../util/global-trackers';

import './messages.html';

Template.messageCreate.events({
  'submit .js-create'(event) {
    event.preventDefault();
 
    const form = event.target;

    Meteor.call(
      'messages.insert', 
      currentAvatar.get()._id,
      form.text.value,
      {}
    );
    form.text.value = '';
  },
});

Template.messageList.onRendered(function() {
  if (typeof this.data.messages === 'function') {
    var _this = this;
    Tracker.autorun(() => {
      this.data.messages();

      // Allow time for re-render
      Meteor.setTimeout(() => {
        var container = _this.find('.js-scrollContainer');
        container.scrollTop = container.scrollHeight;
      }, 1);
    });
  }
});
