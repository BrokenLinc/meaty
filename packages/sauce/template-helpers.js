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
		} else if(message.type === 'INVITATION') {
			return 'System';
		}
		return Meat.friendlyAvatarName(message.avatarName);
	});
	Template.registerHelper( 'cssModClass', (message) => {
		return ['mod-' + message.type, 'mod-' + message.subtype].join(' ').toLowerCase();
	});
	Template.registerHelper( 'messageContent', (message) => {
		if(message.type === 'INVITATION') {
			if(message.subtype === 'PARTY') {
				return Meat.friendlyAvatarName(message.avatarName) + ' has sent you a party invitation.';
			} else {
				return Meat.friendlyAvatarName(message.avatarName) + ' has sent you an invitation. To what? No one can say.';
			}
		}
		return message.text;
	});
	Template.registerHelper('notEmpty', function(item, options) {
		if (item) {
			if (item instanceof Array) {
				if (item.length > 0) 
					return options.fn(this);
			} else {
				if (item.fetch().length > 0)
					return options.fn(this);
			}
		}
		return options.inverse(this);
	});
});