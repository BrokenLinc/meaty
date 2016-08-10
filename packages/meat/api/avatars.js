import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
 
export const Avatars = new Mongo.Collection('avatars');

if (Meteor.isServer) {
  Meteor.publish('avatars', () => {
    return Avatars.find();
  });
}

Meteor.methods({
  'avatars.insert'(name, data) { //TODO: use data
    check(name, String);
 
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    return Avatars.insert({
      name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'avatars.update'(id, data) {
    check(id, String);
    check(data, Object);
 
    if (this.userId !== Avatars.findOne(id).owner) {
      throw new Meteor.Error('not-authorized');
    }

    Avatars.update(id, {
      $set: data
    });
  },
  'avatars.remove'(id) {
    check(id, String);
 
    if (this.userId !== Avatars.findOne(id).owner) {
      throw new Meteor.Error('not-authorized');
    }

    Avatars.remove(id);
  },
});