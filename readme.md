Share
=====
Simple, light, flexible, and good-looking share button jquery plugin. Ermahgerd. [See it here](http://carrot.github.io/share-button/).

### Why Should You Use This?

All the major social networks have their own share buttons you can put on your page, but doing it like this sucks for a lot of reasons:

1. They are slow-loading, and inject a lot of extra javascript onto your page that's not needed which makes your page slower.
2. They don't look sexy and fit nicely with your site like you want, and you can't change how they look.
3. Every time you need them, you have to google 'twitter share button' and 'facebook like button' and such and go through their interface and copy and paste code and this is repetitive and stupid. It also takes up a ton of space and looks messy in your code.
4. The buttons themselves take up a lot of space (especially the facebook like button).

Let's take a quick look at the alternative, using this little js plugin:

1. It doesn't load any iframes or extra javascript and overall load time is tons faster.
2. It looks simple and clean by default, and can be customized in any and every way.
3. All you have to do to use it is include the script and call `.share()` on an empty div. That's two lines of code total, the script link and the share call.
4. It's tiny and compact, expanding only when the user actually wants to share something.

### Setup

1. [Download the script](https://github.com/carrot/share-button/blob/master/build/share.min.js) and include it on your page.
2. Make an empty div on your page
3. In your javascript, call `$('.element').share()`
4. Pass options to the share call if you want (details below)
5. Profit!

### Options

You can pass an options object when you call `share` on an element to make things a little more flexible.

**url**: the url you want to share. _default: `window.location.href`_    
**text**: text to be tweeted alongside your link, _default: your page's meta description_    
**image**: image to be shared (facebook-specific)    
**app_id**: facebook app id for tracking shares. if provided, will use the facebook API    
**background**: background color of the button, _default: `#e1e1e1`_    
**color**: text color of the button, _default: '#333'_    
**icon**: change the icon to the left. choose from [this set](http://weloveiconfonts.com/#entypo), _default: `export`_    
**button_text**: change the text of the button, _default: `Share`_    

**Example:**

```js
$('.element').share({
  url: 'http://www.youtube.com/watch?v=oHg5SJYRHA0',
  text: 'check out this awesome video guys!'
})
```

#### network-specific options
If you pass an object called `twitter`, `facebook`, and/or `gplus` into the main options, you can get more granular with the share info, specifying different information for different networks. Example objects shown below, with all options specified:

```js
facebook: {
  name: 'title'
  link: 'url'
  image: 'share image'
  caption: 'picture caption'
  text: 'short description'
}

twitter: {
  text: 'tweet text'
  link: 'url'
}

gplus: {
  link: 'url'
}
```

**Example:**

```js
$('.element').share({
  url: 'http://www.youtube.com/watch?v=oHg5SJYRHA0',
  text: 'check out this awesome video guys!'
  twitter: {
    text: 'peep this great video #great #video #hashtag'
  }
})
```

### Public API

The share button also returns a small api that can be used to control it down the line if you need to. Example shown below:

```js
var share = $('.el').share();

share.toggle(); // toggles the share button popup
share.open();   // open the share button popup
share.close();  // closes the share button popup
share.options;  // exposes the options listed above, can not currently be changed interactively
share.self;     // returns an instance of the jquery object it was called on (for chaining)

```

This will likely become more powerful down the line as this project continues to be developed - open an issue if there's anything you wish the api would have.

### Contributing

Pretty simple project, all you need to do to set up for build is the following:

- `npm install coffee-script -g`
- inside this folder, `npm install`
- edit any of the files in `src` and run `cake build` to build them

### Testing

We are in process of adding a small test suite that covers the basic functionality of this plugin to make sure nothing is broken. If you send a pull request, it would be awesome if you also wrote a test for your feature. The testing interface is very simple, it just uses [should.js](https://github.com/visionmedia/should.js/) and jquery. Here's how to get set up for testing:

- `npm install mocha -g`
- `npm install coffee-script -g`
- inside this folder, `npm install`
- `mocha` or `npm test` will run the tests

The tests rely on the following libraries, for which documentation is linked: [mocha](http://visionmedia.github.io/mocha/), [should](https://github.com/visionmedia/should.js/), [zombie](http://zombie.labnotes.org/), [q](https://github.com/kriskowal/q)

### Inspiration

This project was inspired by [this dribbble shot](http://dribbble.com/shots/1072278) and [this cssdeck experiment](http://cssdeck.com/labs/css-social-share-button) - huge props to these two guys for some incredible ideas and work.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/carrot/share-button/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
