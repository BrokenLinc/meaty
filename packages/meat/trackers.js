import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { Avatars } from './api/avatars';
import { Rooms } from './api/rooms';

if(Meteor.isClient) {
	export const currentAvatar = new ReactiveVar();

	Tracker.autorun(function () {
		currentAvatar.set(Avatars.findOne(Session.get('avatarId')));
	});

	export const currentRoom = new ReactiveVar();

	Tracker.autorun(function () {
		if(!currentAvatar.get()) return null;
		currentRoom.set(Rooms.findOne(currentAvatar.get().roomId));
	});

	// export const currentRoomAvatars = new ReactiveVar();

	// Tracker.autorun(function () {
	// 	if(!currentAvatar.get()) return null;
	// 	if(!currentRoom.get()) return null;
	// 	currentRoomAvatars.set(Avatars.find({ roomId: currentRoom.get()._id }));
	// });

	export const currentPartyAvatars = new ReactiveVar();

	Tracker.autorun(function () {
		if(!currentAvatar.get()) return null;
		currentPartyAvatars.set(Avatars.find({ 
			partyId: currentAvatar.get().partyId,
			_id: { $not: Session.get('avatarId') }
		}));
	});
}