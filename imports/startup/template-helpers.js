import { Meat } from 'meteor/brokenlinc:meat';

// Template.registerHelper( 'friendlyUsername', (username) => {
// 	return username || 'Unknown';
// });
Template.registerHelper( 'friendlyAvatarName', (avatarName) => {
	return Meat.friendlyAvatarName(avatarName);
});
Template.registerHelper( 'cssModClass', (string) => {
	return 'mod-' + string.toLowerCase();
});