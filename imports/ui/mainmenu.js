import { Meat } from 'meteor/brokenlinc:meat';

import './mainmenu.html';

//TODO: wrap the modal toggling in a UI helper
//  as in, const mm = Potato.modalManager(template, options, toggleKey(s))
//  mm.toggle(), mm.open(), mm.close(), mm.isOpen
//  and maybe more

let mainMenuIsOpen = false;

function toggleMainMenu() {
  if(mainMenuIsOpen) closeMainMenu();
  else openMainMenu();
}

function openMainMenu() {
  Modal.show('mainMenuModal', {
    keyboard: false,
    backdrop: 'static'
  });
  mainMenuIsOpen = true;
}

function closeMainMenu() {
  Modal.hide(); // Hides ALL modals
  mainMenuIsOpen = false;
}

function watchKeys(event) {
  var key = event.which || event.keyCode;
  if(key === 27) toggleMainMenu(); //ESC key
}

Template.mainMenu.onCreated(function(){
  mainMenuIsOpen = false;
  window.addEventListener('keyup', watchKeys);
});

Template.mainMenu.onDestroyed(function(){
  window.removeEventListener('keyup', watchKeys);
});

Template.mainMenuModal.helpers({
  isAvatarSelected() {
    return !Session.equals('avatarId', undefined);
  }
});

Template.mainMenuModal.events({
  'click .js-deselectavatar'(event) {
    event.preventDefault();
    Meat.selectAvatar(undefined);
    closeMainMenu();
  },
  'click .js-logout'(event) {
    event.preventDefault();
    Meteor.logout();
    closeMainMenu();
  },
  'click .js-closeMenu'(event) {
    event.preventDefault();
    closeMainMenu();
  },
});