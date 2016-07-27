import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Rooms = new Mongo.Collection('rooms');

if (Meteor.isServer) {
  Meteor.publish('rooms', () => {
    return Rooms.find();
  });
}

Meteor.methods({
  'rooms.insert'(name) {
    check(name, String);
 
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Rooms.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'rooms.update'(id, data) {
    check(id, String);
    check(data, Object);
 
    if (this.userId !== Rooms.findOne(id).owner) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.update(id, {
      $set: data
    });
  },
  'rooms.remove'(id) {
    check(id, String);
 
    if (this.userId !== Rooms.findOne(id).owner) {
      throw new Meteor.Error('not-authorized');
    }

    Rooms.remove(id);
  },
});