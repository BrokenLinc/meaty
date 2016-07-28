import './mainmenu.html';

let mainMenuIsOpen = false;

function toggleMainMenu() {
  if(mainMenuIsOpen) {
    Modal.hide();
  } else {
    Modal.show('mainMenu', function() {

    },{
      keyboard: false,
      backdrop: 'static'
    });
  }
  mainMenuIsOpen = !mainMenuIsOpen;
}

function watchKeys(event) {
  var key = event.which || event.keyCode;
  if(key === 27) {
    toggleMainMenu();
  }
}

Template.mainMenu.onRendered(function(){
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

    Session.set('avatarId', undefined);

    Modal.hide();
  },
  'click .js-logout'(event) {
    event.preventDefault();

    Meteor.logout();

    Modal.hide();
  }
});