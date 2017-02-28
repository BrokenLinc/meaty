import { Meat } from 'meteor/brokenlinc:meat';

import './parties.html';

Template.partyInvitations.helpers({
  hasPartyInvitations() {
    return Session.get('partyInvitations').length;
  },
  partyInvitations() {
    return Session.get.bind(Session, 'partyInvitations');
  },
});

Template.invitationListItem.events({
  'click .js-joinparty'(event) {
    event.preventDefault();
    Meat.joinParty(this.partyId);
  }
});

Template.partyDetail.helpers({
  partyAvatars() {
    return Meat.getCurrentPartyRoster();
  },
});

Template.partyDetail.events({
  'click .js-leaveparty'(event) {
    event.preventDefault();
    Meat.leaveParty();
  }
});