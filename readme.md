# Share

<p align="center"><img src="https://i.cloudup.com/RTIOZex9-i.gif" /></p>

## An Introduction

Simple, light, flexible, and good-looking share button. [See it in action!](http://sharebutton.co/)

#### Why Should You Use This?

All major social networks have their own share widgets you can put on your page, but this isn't ideal for a variety of reasons:

1. They tend to be slow-loading.
2. They inject extra javascript and DOM elements into your page making it slower.
3. They generally aren't customizable enough to fit the design of your site.
4. Mananging each provider's code snippets etc is repetitive and needless. Additionally, they can make your front-end code quite messy.
5. The buttons themselves take up a lot of space (especially the Facebook share button).

Let's take a quick look at the alternative, using this little plugin:

1. It doesn't load any iframes or extra javascript making the overall load time much faster.
2. It looks simple and clean by default, and can be customized in any and every way.
3. All you have to do to use it is include the script and call `new Share` on an empty div. That's two lines of code total, the script link and the share call.
4. It's tiny and compact, expanding only when the user actually wants to share something.

## Getting Started

1. [Download the script](https://github.com/carrot/share-button/releases/download/v0.5.0/share.min.js) and include it on your page.
2. Make an empty div on your page
3. In your javascript, call `new Share('.element')`
4. Pass options to the share call if you want (details below)
5. Profit!

```js
new Share(".share-button", {
  networks: {
    facebook: {
      app_id: "abc123"
    }
  }
});
```

## Customization

#### Configuration Options

The share button is extremely flexible. As such we provide the ability to pass a wide array of options for additional configuration. All configuration options are available here: [Configuration Options](https://github.com/carrot/share-button/wiki/Configuration-Options)

#### Styles

Additionally, you're able to customize the look and feel of the button and animations though CSS. All CSS styles and how to modify them are available here: [CSS Styles](https://github.com/carrot/share-button/wiki/CSS-Styles)

#### Hooks

You are able to set `before` and `after` hooks when a user clicks a network. This allows you to dynamically change attributes for that button. For more information: [click here](https://github.com/carrot/share-button/wiki/Network-Hooks)

## Public API

The share button also returns a simple API that can be used to control it should you need to. Example shown below:

```js
var share = new Share(".share-button");

share.toggle(); // toggles the share button popup
share.open();   // open the share button popup
share.close();  // closes the share button popup
share.config;   // exposes the configurations listed above
```

## Fonts

We utilize the fontset `Entypo` for all icon fonts. Additionally we provide hosting/delivery of a minimized version of the fontset through [Cloudflare](http://cloudflare.com).

For more information and download links, please [click here](https://github.com/carrot/share-button/wiki/Fonts).

## Inspiration

This project was inspired by [this dribbble shot](http://dribbble.com/shots/1072278) and [this cssdeck experiment](http://cssdeck.com/labs/css-social-share-button) - huge props to these two guys for some incredible ideas and work.

## Contributing and License

- Contributing Guidelines can be found [here](contributing.md)
- Licenced under MIT - [details here](license.md)
