Template.registerHelper( 'friendlyUsername', (username) => {
  return username || "Unknown";
});

Template.registerHelper('iAm', (userId) => {
  if(!userId) return false;
  return userId === Meteor.userId();
});