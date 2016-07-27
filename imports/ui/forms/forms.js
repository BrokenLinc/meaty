import './forms.html';

Template.checkbox.events({
  'click .me-click'(event) {
    event.preventDefault();

    this.onClick && this.onClick(event);
  },
});