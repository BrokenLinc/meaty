// Keep scrolling to the bottom on every new message
export const ScrollDowner = function ScrollDowner(selectorFn, fn) {
  if (typeof selectorFn === 'function' && typeof fn === 'function') {
    this.messageTrackerComputation = Tracker.autorun(() => {
      fn(); //create a dependency

      // Allow time for re-render
      Meteor.setTimeout(() => {
        var container = selectorFn();
        container.scrollTop = container.scrollHeight;
      }, 1);
    });
  }
};
ScrollDowner.prototype.destroy = function() {
  if(this.messageTrackerComputation) {
    this.messageTrackerComputation.stop();
    delete this.messageTrackerComputation;
  }
};
