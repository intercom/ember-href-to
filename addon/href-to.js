import Em from 'ember';

export default class {

  constructor(applicationInstance, event) {
    this.applicationInstance = applicationInstance;
    this.event = event;
    this.target = Em.$(event.currentTarget);
    this.url = this.target.attr('href');
  }

  maybeHandle() {
    if (this.shouldHandle()) {
      this.handle();
    }
  }

  shouldHandle() {
    return this.isUnmodifiedLeftClick() &&
      this.isNotIgnored() &&
      this.hasNoActionHelper() &&
      this.hasNoDownload() &&
      this.isNotLinkComponent() &&
      this.recognizeUrl();
  }

  handle() {
    let router = this._getRouter();
    let urlWithoutRoot = this.getUrlWithoutRoot();

    router.handleURL(urlWithoutRoot);
    router.router.updateURL(urlWithoutRoot);
    this.event.preventDefault();
  }

  isUnmodifiedLeftClick() {
    let e = this.event;

    return (e.which === undefined || e.which === 1) && !e.ctrlKey && !e.metaKey;
  }

  isNotIgnored() {
    return Em.isNone(this.target.attr('data-href-to-ignore'));
  }

  hasNoActionHelper() {
    return Em.isNone(this.target.attr('data-ember-action'));
  }

  hasNoDownload() {
    return this.target.attr('download') === undefined;
  }

  isNotLinkComponent() {
    let id = this.target[0].id;
    let componentInstance = this._getContainer(this.applicationInstance).lookup('-view-registry:main')[id];
    let isLinkComponent = componentInstance ? componentInstance instanceof Em.LinkComponent : false;

    return !isLinkComponent;
  }

  recognizeUrl() {
    let url = this.url;
    let didRecognize = false;

    if (url) {
      let router = this._getContainer().lookup('router:main');
      let rootUrl = this._getRootUrl();
      let isInternal = url.indexOf(rootUrl) === 0;
      let urlWithoutRoot = this.getUrlWithoutRoot();

      didRecognize = isInternal && router.router.recognizer.recognize(urlWithoutRoot);
    }

    return didRecognize;
  }

  getUrlWithoutRoot() {
    let url = this.url;
    let rootUrl = this._getRootUrl();
    return url.substr(rootUrl.length - 1);
  }

  _getRouter() {
    return this._getContainer().lookup('router:main');
  }

  _getContainer() {
    return 'lookup' in this.applicationInstance ? this.applicationInstance : this.applicationInstance.container;
  }

  _getRootUrl() {
    let router = this._getRouter();
    let rootURL = router.rootURL;

    if (rootURL.charAt(rootURL.length - 1) !== '/') {
      rootURL = rootURL + '/';
    }

    return rootURL;
  }
}
