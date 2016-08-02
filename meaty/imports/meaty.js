import { Avatars } from './api/avatars';
import { Rooms } from './api/rooms';
import { Messages } from './api/messages';
import { currentAvatar, currentRoom } from './util/global-trackers';
import { emitter } from './util/global-emitters';

export const Meaty = {
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
	},
	createAvatar: (name, data) => {

	},
	removeAvatar: (id) => {
		Meteor.call('avatars.remove', id);
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
		Meteor.call('avatars.update', Session.get('avatarId'), { roomId });
	},
	exitRoom: (roomId) => {
		Meteor.call('avatars.update', Session.get('avatarId'), { roomId: null });
	},
	createRoom: (name) => {
		Meteor.call('rooms.insert', name);
	},
	removeRoom: (id) => {
		Meteor.call('rooms.remove', id);
	},
	getRoomRoster: (id) => {
		return Avatars.find({roomId: id});
	},
	sendMessage: (text, data) => {
		Meteor.call(
			'messages.insert', 
			currentAvatar.get()._id,
			text,
			data
		);
	},
	emitter: emitter
};