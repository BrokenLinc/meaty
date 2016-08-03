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
  'messages.insert'(avatarId, text, data) {
    check(avatarId, String);
    check(text, String);
    check(data, Object);
 
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const avatar = Avatars.findOne(avatarId)

    if (this.userId !== avatar.owner) {
      throw new Meteor.Error('not-authorized');
    }
 
    if (!avatar.roomId) {
      throw new Meteor.Error('not-in-room');
    }

    return Messages.insert({
      avatarId: avatar._id,
      avatarName: avatar.name,
      roomId: avatar.roomId,
      text,
      data,
      createdAt: new Date(),
    });
  },
});