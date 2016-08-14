import { Avatars } from './api/avatars';
import { Rooms } from './api/rooms';
import { Messages } from './api/messages';
import { friendlyAvatarName, sanitizeAvatarName} from './helpers';
import { currentAvatar, currentRoom } from './trackers';
import { emitter } from './emitter';

export const name = 'meat';

if(Meteor.isClient) {
	export const Meat = {
		getCurrentAvatar: () => {
			return currentAvatar.get();
		},
		getMyAvatars: () => {
			return Avatars.find({owner: Meteor.userId()});
		},
		isMyAvatar: (avatar) => {
			return avatar.owner === Meteor.userId();
		},
		selectAvatar: (id) => {
			Session.set('avatarId', id);
			return id;
		},
		createAvatar: (name, data, callback) => {
    		return Meteor.call('avatars.insert', name, data, callback);
		},
		removeAvatar: (id) => {
			return Meteor.call('avatars.remove', id);
		},
		getCurrentRoom: () => {
			return currentRoom.get();
		},
		isCurrentRoom: (id) => {
			if(!currentRoom.get()) return false;
			return id === currentRoom.get()._id;
		},
		isMyRoom: (room) => {
			return room.owner === Meteor.userId();
		},
		getRooms: () => {
	    	return Rooms.find({});
		},
		selectRoom: (roomId) => {
			return Meteor.call('avatars.update', Session.get('avatarId'), { roomId });
		},
		exitRoom: (roomId) => {
			return Meteor.call('avatars.update', Session.get('avatarId'), { roomId: null });
		},
		createRoom: (name) => {
			return Meteor.call('rooms.insert', name);
		},
		removeRoom: (id) => {
			return Meteor.call('rooms.remove', id);
		},
		getRoomRoster: (id) => {
			return Avatars.find({roomId: id});
		},
		sendPrivateMessage: (text, recipientAvatarName) => {
			return Meteor.call(
				'messages.sendToAvatar',
				Session.get('avatarId'),
				text,
				recipientAvatarName
			);
		},
		sendRoomMessage: (text) => {
			return Meteor.call(
				'messages.sendToRoom',
				Session.get('avatarId'),
				text
			);
		},
		inviteToParty: (name) => {
			const user = Avatars.findOne({ name });
			if(!user) return false;

			//TODO: send invitation
		},
		joinParty: (partyId) => {
			return Meteor.call('avatars.update', Session.get('avatarId'), { partyId: partyId });
		},
		leaveParty: () => {
			return Meteor.call('avatars.update', Session.get('avatarId'), { partyId: null });
		},
		parseCommand: (command) => {
			if(command.substring(0,1) === '/') {
				const commandParts = command.split(' ');
				const slashCommand = commandParts.shift().substring(1).toLowerCase();
				if(slashCommand === 't') {
					const recipientAvatarName = commandParts.shift().toLowerCase();
					const text = commandParts.join(' ');
					Meat.sendPrivateMessage(text, recipientAvatarName);
				}
			} else {
				Meat.sendRoomMessage(command);
			}
		},
		friendlyAvatarName: friendlyAvatarName,
		sanitizeAvatarName: sanitizeAvatarName,
		emitter: emitter
	};
}