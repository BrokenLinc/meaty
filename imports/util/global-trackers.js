import { Avatars } from '../api/avatars';
import { Rooms } from '../api/rooms';

export const currentAvatar = new ReactiveVar();

Tracker.autorun(function () {
  currentAvatar.set(Avatars.findOne(Session.get('avatarId')));
});

export const currentRoom = new ReactiveVar();

Tracker.autorun(function () {
  if(!currentAvatar.get()) return null;
  currentRoom.set(Rooms.findOne(currentAvatar.get().roomId));
});

export const currentRoomAvatars = new ReactiveVar();

Tracker.autorun(function () {
  if(!currentAvatar.get()) return null;
  if(!currentRoom.get()) return null;
  currentRoomAvatars.set(Avatars.find({ roomId: currentRoom.get()._id }));
});