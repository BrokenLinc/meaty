import { Meat } from 'meteor/brokenlinc:meat';

Meteor.startup(() => {
	Template.registerHelper( 'friendlyAvatarName', (avatarName) => {
		return Meat.friendlyAvatarName(avatarName);
	});
	Template.registerHelper( 'cssModClass', (string) => {
		return 'mod-' + string.toLowerCase();
	});
	Template.registerHelper( 'authorLabel', (message) => {
		// if I sent a public message, show who it went to instead
		if(message.subtype === 'PRIVATE' && message.avatarId === Meat.getCurrentAvatar()._id) {
			if(message.recipientAvatarId === message.avatarId) {
				return Meat.friendlyAvatarName(message.recipientAvatarName + '\'s inner monologue');
			}
			return 'to ' + Meat.friendlyAvatarName(message.recipientAvatarName);
		}
		return Meat.friendlyAvatarName(message.avatarName);
	});
});