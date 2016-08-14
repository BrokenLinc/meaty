import { EventEmitter } from 'meteor/raix:eventemitter';
import { Tracker } from 'meteor/tracker';

import { Avatars } from './api/avatars';
import { Rooms } from './api/rooms';
import { Messages } from './api/messages';
import { currentAvatar, currentRoom } from './trackers';

if(Meteor.isClient) {
	export const emitter = new EventEmitter();

	Tracker.autorun(function () {
		if(!currentAvatar.get()) return;
		if(!currentRoom.get()) return;

		Rooms.find(currentRoom.get()._id).observeChanges({
			changed: function (id, fields) {
				emitter.trigger('room-change', fields);
			}
		});

		Avatars.find({
			roomId: currentRoom.get()._id
		}).observeChanges({
			added: function (id, fields) {
				emitter.trigger('avatar-enterroom', fields);
			},
			changed: function (id, fields) {
				emitter.trigger('avatar-change', fields);
			},
			removed: function (id) {
				emitter.trigger('avatar-exitroom', id);
			}
		});

		// Watch for "new" messages (added since tracking started)
		Messages.find({
			$or: [{
				type: 'MESSAGE',
				subtype: 'ROOM',
				roomId: currentRoom.get()._id
			},{
				type: 'MESSAGE',
				subtype: 'PRIVATE',
				recipientAvatarId: currentAvatar.get()._id
			},{
				type: 'MESSAGE',
				subtype: 'PRIVATE',
				avatarId: currentAvatar.get()._id
			}],
			createdAt: {
				$gte : new Date()
			}
		}).observeChanges({
			added: function (id, fields) {
				emitter.trigger('message-new', fields);
			}
		});
	});
}