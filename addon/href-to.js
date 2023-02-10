export default class {

  constructor(applicationInstance, event, target = event.target) {
    this.applicationInstance = applicationInstance;
    this.event = event;
    this.target = target;
    let hrefAttr = this.target.attributes.href;
    this.url = hrefAttr && hrefAttr.value;
  }

  maybeHandle() {
    if (this.shouldHandle()) {
      this.handle();
    }
  }

  shouldHandle() {
    return this.isUnmodifiedLeftClick() &&
      this.isNotIgnored() &&
      this.hasNoTargetBlank() &&
      this.hasNoActionHelper() &&
      this.hasNoDownload() &&
      this.isNotLinkComponent() &&
      this.recognizeUrl();
  }

  handle() {
    let router = this._getRouter();
    router.transitionTo(this.getUrlWithoutRoot());
    this.event.preventDefault();
  }

  isUnmodifiedLeftClick() {
    let e = this.event;

    return (e.which === undefined || e.which === 1) && !e.ctrlKey && !e.metaKey;
  }

  hasNoTargetBlank() {
    let attr = this.target.attributes.target;
    return !attr || attr.value !== '_blank';
  }

  isNotIgnored() {
    return !this.target.attributes['data-href-to-ignore'];
  }

  hasNoActionHelper() {
    return !this.target.attributes['data-ember-action'];
  }

  hasNoDownload() {
    return !this.target.attributes.download;
  }

  isNotLinkComponent() {
    let isLinkComponent = false;
    let id = this.target.id;
    if (id) {
      let componentInstance = this.applicationInstance.lookup('-view-registry:main')[id];
      isLinkComponent = componentInstance && componentInstance.constructor.superclass.toString() === '@ember/routing/link-component';
    }

    return !isLinkComponent;
  }

  recognizeUrl() {
    let url = this.url;
    let didRecognize = false;

    if (url) {
      let router = this._getRouter();
      let rootUrl = this._getRootUrl();
      let isInternal = url.indexOf(rootUrl) === 0;
      let urlWithoutRoot = this.getUrlWithoutRoot();
      let routerMicrolib = router._router._routerMicrolib || router._router.router;

      didRecognize = isInternal && routerMicrolib.recognizer.recognize(urlWithoutRoot);
    }

    return didRecognize;
  }

  getUrlWithoutRoot() {
    let url = this.url;
    let rootUrl = this._getRootUrl();
    return url.substr(rootUrl.length - 1);
  }

  _getRouter() {
    return this.applicationInstance.lookup('service:router');
  }

  _getRootUrl() {
    let router = this._getRouter();
    let rootURL = router.get('rootURL');

    if (rootURL.charAt(rootURL.length - 1) !== '/') {
      rootURL = rootURL + '/';
    }

    return rootURL;
  }
}
