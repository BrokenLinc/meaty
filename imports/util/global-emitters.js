import { Messages } from '../api/messages';
import { currentRoom } from './global-trackers';

export const messageEmitter = new EventEmitter();

// Watch for "new" messages (added since tracking started)
// ONLY look in current room
let messageTrackerHandler;
Tracker.autorun(function () {
	if(!currentRoom.get()) return;

	if(messageTrackerHandler) {
		messageTrackerHandler.stop();
	}

	messageTrackerHandler = Messages.find({
		roomId: currentRoom.get()._id,
		createdAt: {
			$gte : new Date()
		}
	}).observeChanges({
		added: function (id, fields) {
			messageEmitter.trigger('message-new', fields);
		}
	});
});