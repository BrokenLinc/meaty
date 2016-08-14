Package.describe({
  name: 'brokenlinc:meat',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4');
  
  api.use('ecmascript');
  api.use('erasaur:meteor-lodash');

  api.use('reactive-var', 'client');
  api.use('session', 'client');
  api.use('tracker', 'client');
  api.use('raix:eventemitter', 'client');

  api.use('mongo', 'server');

  api.mainModule('meat.js');
  api.add_files("client.js", "client");
  api.add_files("server.js", "server");
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('brokenlinc:meat');
  api.mainModule('meat-tests.js');
});