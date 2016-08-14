import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

import { Avatars } from './avatars';
 
export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', () => {
    return Messages.find();
  });
}

Meteor.methods({
  'messages.sendToAvatar'(avatarId, text, recipientAvatarName) {
    check(avatarId, String);
    check(recipientAvatarName, String);
    check(text, String);
 
    // authorize
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const avatar = Avatars.findOne(avatarId);
    if (this.userId !== avatar.owner) {
      throw new Meteor.Error('not-logged-in');
    }
    const recipientAvatar = Avatars.findOne({ name: recipientAvatarName });
    if (! recipientAvatar) {
      throw new Meteor.Error('recipient-does-not-exist');
    }

    return Messages.insert({
      type: 'MESSAGE',
      subtype: 'PRIVATE',
      avatarId,
      avatarName: avatar.name,
      recipientAvatarId: recipientAvatar._id,
      recipientAvatarName,
      text: text,
      createdAt: new Date()
    });
  },
  'messages.sendToRoom'(avatarId, text) {
    check(avatarId, String);
    check(text, String);

    // authorize
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const avatar = Avatars.findOne(avatarId);
    if (this.userId !== avatar.owner) {
      throw new Meteor.Error('not-logged-in');
    }
    if (!avatar.roomId) {
      throw new Meteor.Error('not-in-room');
    }

    return Messages.insert({
      type: 'MESSAGE',
      subtype: 'ROOM',
      avatarId,
      avatarName: avatar.name,
      roomId: avatar.roomId,
      text: text,
      createdAt: new Date()
    });
  },
});