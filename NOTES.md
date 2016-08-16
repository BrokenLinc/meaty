avatar
	.partyId = 1234567890 // join party
	.partyId = null // leave party
	.partyId = randomUniqueInt() // create party

message
	.subtype = 'PARTY'
	.partyId = 1234567890

message
	.type = 'PARTY_INVITATION'
	.recipientAvatarName = 'frank'
	.recipientAvatarId = 3
	.data
		.partyId = 1234567890

message
	.type = 'SYSTEM'
	.subtype = 'PARTY_REJECTION'
	.text = 'Frank has declined your party invitation.'

room
	.partyId = 1234567890 // private room
	.capacity = 4

room
	.partyId = null // public room
	.capacity = null



// Meat.inviteToParty('frank');
// Meat.joinParty(1234567890);
// Meat.leaveParty();
// Meat.declinePartyInvitation(recipientAvatarId);

// [X] Make Avatar names unique (restrict creation)
// [X] Display PMs in a unique way in the log
// [ ] A list of people in your party
// [ ] Display Party invitations in a unique way in the log
// [ ] keep log of invitations in sessions (latest from each unique avatar)
// [ ] Have a button to join/ignore the party
// [ ] Display Party messages in a unique way in the log
// [ ] Joining a party clears the log
// [ ] Ability to create a party room
// [ ] Restrict visibility of & entry into private rooms



// !!! Need to orgnanize/namespace message types/scopes better.

// type: MESSAGE
// subtype:
// 	 PRIVATE
//   SYSTEM
//   PARTY
//   ROOM

// type: PARTY_INVITATION

// type: COMBAT
// subtype:
//   ATTACK
//   HEAL