export const sanitizeAvatarName = (avatarName) => {
	avatarName = avatarName.toLowerCase();
	// check for illegal characters
	if (avatarName.match(/[^a-z]/)) {
		// remove invalid characters
		avatarName = avatarName.replace(/[^a-z]/g, "");
	}
	return avatarName;
};
export const friendlyAvatarName = (avatarName) => {
	if(!avatarName) return 'Unknown';
	return avatarName.charAt(0).toUpperCase() + avatarName.slice(1).toLowerCase();
};