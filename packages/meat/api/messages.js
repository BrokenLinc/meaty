import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';

import { Avatars } from './avatars';

export const Messages = new Mongo.Collection('messages');

var guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
};

if (Meteor.isServer) {
  Meteor.publish('messages', () => {
    return Messages.find();
  });
}

Meteor.methods({
  'messages.sendToAvatar'(avatarId, text, recipientAvatarName) {
    check(avatarId, String);
    check(text, String);
    check(recipientAvatarName, String);
 
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
  'messages.sendToParty'(avatarId, text) {
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
      subtype: 'PARTY',
      avatarId,
      avatarName: avatar.name,
      partyId: avatar.partyId,
      text: text,
      createdAt: new Date()
    });
  },
  'messages.sendPartyInvitation'(avatarId, recipientAvatarName) {
    check(avatarId, String);
    check(recipientAvatarName, String);
 
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

    var partyId = avatar.partyId;
    if (!partyId) {
      var partyId = guid();
      Avatars.update(avatarId, { $set: { partyId: partyId } });
    }

    return Messages.insert({
      type: 'INVITATION',
      subtype: 'PARTY',
      avatarId,
      avatarName: avatar.name,
      recipientAvatarId: recipientAvatar._id,
      recipientAvatarName,
      partyId: partyId,
      createdAt: new Date()
    });
  },
});