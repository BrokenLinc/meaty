import { Messages } from '../api/messages.js';
import { currentRoom } from './global-trackers.js';

export const messageEmitter = new EventEmitter();

// Watch for "new" messages (added since tracking started)
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
	   	 messageEmitter.trigger('message-new', arguments);
	   }
	});
});