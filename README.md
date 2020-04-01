# ember-href-to

This add-on:
- Intercepts all `<a>` tags, performing in-app route transitions if recognized, normal links otherwise.
- Provides an `{{href-to}}` helper as a lightweight alternative to `{{link-to}}`. No components, no class bindings - just a bound anchor href and a click handler.

[![Build Status](https://travis-ci.org/intercom/ember-href-to.svg)](https://travis-ci.org/intercom/ember-href-to) [![Ember Observer Score](http://emberobserver.com/badges/ember-href-to.svg)](http://emberobserver.com/addons/ember-href-to)

## Why use it?

Every time you use a `{{link-to}}`, you create a view. This is usually fine, but in cases where you're creating many of these, performance can suffer. `{{href-to}}` simply creates a URL and is [12x faster](https://github.com/GavinJoyce/ember-performance/pull/1) than `{{link-to}}` in Ember 1.13.4.

Questions? Ping me [@gavinjoyce](https://twitter.com/gavinjoyce)

## Installation

This is an Ember CLI addon, to install:

`ember install ember-href-to`

## Usage Instructions

Once installed, this add-on will automatically intercept all `<a>` tags. Once clicked, if the href url is recognized as a route found within the current Ember application, it will perform an Ember transition without a page refresh. If not, it will link to the url as a normal anchor tag.

You can use the `{{href-to}}` helper, which has the same interface as [`{{link-to}}`](https://guides.emberjs.com/v2.16.0/templates/links/), to link to static and dynamic routes in your ember application:

```html
<a href="{{href-to 'index'}}">Go Home</a>
<a href="{{href-to 'contacts.contact' contact}}">View Contact 1</a>
<a href="{{href-to 'contacts.contact' 2}}">View Contact 2</a>
<a href="{{href-to 'contact-us' (query-params section='first')}}">You can also use query params</a>
<a href="{{href-to 'contact-us'}}#first">You can also use fragment identifiers</a>
<a href="{{href-to 'contact-us'}}" data-href-to-ignore>
  If you have a catchall route (this.route('catchall', { path: "/*" })),
  you need to add the attribute "data-href-to-ignore",
  otherwise you will always match it
</a>
```

**WARNING: This add-on intercepts _all_ `<a>` tags, not just ones that use the `{{href-to}}` helper. Be careful to check that external urls are still working correctly.** 

As `{{href-to}}` simply generates a URL, you won't get automatic `active` class bindings as you do with `{{link-to}}`. Clicking on a `{{href-to}}` URL will trigger a full router transition though:

![href-to2](https://cloud.githubusercontent.com/assets/2526/8709271/0a8b934a-2b39-11e5-8f24-89ece7d6c45d.gif)

## Development Instructions

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.
