import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.registerHelper( 'friendlyUsername', (username) => {
  return username || "Unknown";
});

Template.registerHelper('iAm', (userId) => {
  if(!userId) return false;
  return userId === Meteor.userId();
});

Template.registerHelper('tert', (condition, ifTrue, ifFalse) => {
	return condition ? ifTrue : ifFalse;
});

Template.registerHelper('checkedIf', (condition) => {
	return condition ? 'checked' : false;
});