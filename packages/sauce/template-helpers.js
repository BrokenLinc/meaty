import { Meat } from 'meteor/brokenlinc:meat';

Meteor.startup(() => {
	Template.registerHelper( 'friendlyAvatarName', (avatarName) => {
		return Meat.friendlyAvatarName(avatarName);
	});
	Template.registerHelper( 'cssModClass', (string) => {
		return 'mod-' + string.toLowerCase();
	});
});