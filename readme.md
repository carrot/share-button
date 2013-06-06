Share
=====
Simple, light, flexible, and good-looking share button. Ermahgerd.

### Setup

1. Make an empty div on your page
2. In your javascript, call `$('.element').share()`
3. Add options (below)
4. Profit!

### Options

You can pass an options object when you call `share` on an element to make things a little more flexible.

**url**: the url you want to share. default: `window.location.href`    
**text**: text to be tweeted alongside your link, default: your page's meta description    
**image**: image to be shared (facebook-specific)    
**app_id**: facebook app id for tracking shares. if provided, will use the facebook API    
**background**: background color of the button, default: `#e1e1e1`    
**color**: text color of the button, default: '#333'    
**icon**: change the icon to the left. choose from [this set](http://weloveiconfonts.com/#entypo), default: `export`    

#### network-specific options
If you pass an object called `twitter`, `facebook`, and/or `gplus` into the main options, you can get more granular with the share info, specifying different information for different networks. Example objects shown below:

```
facebook: {
  name: 'title'
  link: 'url'
  text: 'short description'
  image: 'share image'
}

twitter: {
  text: 'tweet text'
  link: 'url'
}

gplus: {
  link: 'url'
}
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

### Example

To see an example, clone this repo and open `index.html`

### Contributing

Pretty simple project, all you need to do to set up for build is the following:

- `npm install grunt-cli -g`
- inside this folder, `npm install`
- edit the coffee file in `src` and run `grunt` to build it

### Inspiration

This project was inspired by [this dribbble shot](http://dribbble.com/shots/1072278) and [this cssdeck experiment](http://cssdeck.com/labs/css-social-share-button) - huge props to these two guys for some incredible ideas and work.