avatar
	.partyId = 1234567890 // join party
	.partyId = null // leave party
	.partyId = randomUniqueInt() // create party

message
	.type = 'PRIVATE_MESSAGE'
	.recipientUserId = 3

message
	.type = 'PARTY_MESSAGE'
	.partyId = 1234567890

message
	.type = 'PARTY_INVITATION'
	.recipientUserId = 3
	.data
		.partyId = 1234567890

room
	.partyId = 1234567890 // private room
	.capacity = 4

room
	.partyId = null // public room
	.capacity = null



// Meat.inviteToParty(userId); // create party & invite with partyId
// Meat.inviteToParty({ avatarName:'Frank' }); // Does a lookup
// Meat.inviteToParty({ avatarId: 3 }); // Does a lookup
// Meat.joinParty(1234567890);
// Meat.leaveParty();

// Make Avatar names unique (restrict creation)
// Display PMs in a unique way in the log
// Display Party invitations in a unique way in the log
// keep log of invitations in sessions
// Have a button to join/ignore the party
// Restrict visibility of & entry into private rooms



// !!! Need to orgnanize/namespace message types/scopes better.

// type: MESSAGE
// subtype:
// 	 PRIVATE
//   SYSTEM
//   PARTY
//   ROOM

// type: PARTY_INVITATION

// type: PARTY_REJECTION

// type: COMBAT
// subtype:
//   ATTACK
//   HEAL