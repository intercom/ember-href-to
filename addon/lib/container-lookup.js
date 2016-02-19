import Em from 'ember';

var application;

function getApplication() {
  var apps = Em.Namespace.NAMESPACES.filter(function(namespace) {
    return namespace instanceof Em.Application;
  });

  return apps[0];
}

export function containerLookup(key) {
  if(application === undefined || application.testing) {
    application = getApplication();
  }

  if(application) {
    return application.__container__.lookup(key);
  }
}

export function getRouter() {
  return containerLookup('router:main');
}

export default containerLookup;
