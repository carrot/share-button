Share
=====
Simple, light, flexible, and good-looking share button jquery plugin. Ermahgerd. [See it in action here](http://sharebutton.co/).

<p align="center"><a><img src="https://cloud.githubusercontent.com/assets/791818/2873934/f3e5415a-d3c7-11e3-9f08-9c82e5eba175.gif" /></a></p>


```js
new Share(".share-button", {
  networks: {
    facebook: {
      app_id: "abc123"
    }
  }
});
```

### Why Should You Use This?

All the major social networks have their own share buttons you can put on your page, but doing it like this sucks for a lot of reasons:

1. They are slow-loading, and inject a lot of extra javascript onto your page that's not needed which makes your page slower.
2. They don't look sexy and fit nicely with your site like you want, and you can't change how they look.
3. Every time you need them, you have to google 'twitter share button' and 'facebook like button' and such and go through their interface and copy and paste code and this is repetitive and stupid. It also takes up a ton of space and looks messy in your code.
4. The buttons themselves take up a lot of space (especially the facebook like button).

Let's take a quick look at the alternative, using this little js plugin:

1. It doesn't load any iframes or extra javascript and overall load time is tons faster.
2. It looks simple and clean by default, and can be customized in any and every way.
3. All you have to do to use it is include the script and call `new Share` on an empty div. That's two lines of code total, the script link and the share call.
4. It's tiny and compact, expanding only when the user actually wants to share something.

### Setup

1. [Download the script](https://github.com/carrot/share-button/releases/download/v0.1.1/share.min.js) and include it on your page.
2. Make an empty div on your page
3. In your javascript, call `new Share('.element')`
4. Pass options to the share call if you want (details below)
5. Profit!

### All Options

You can pass an options object when you call `Share` on an element to make things a little more flexible.

```js
config = {
  protocol: // the protocol you'd prefer to use. [Default: your current protocol]
  url:      // the url you'd like to share. [Default: `window.location.href`]
  title:    // title to be shared alongside your link [Default: your page's meta description]
  text:     // text to be shared alongside your link, [Default: your page's meta description]   
  image:    // image to be shared [Default: your page's meta description]
  ui: {
    flyout:            // change the flyout direction of the shares. chose from `top left`, `top center`, `top right`, `bottom left`, `bottom right`, or `bottom center` [Default: `top center`]
    button_font:       // include the Lato font set from the Google Fonts API. [Default: `true`]
    button_text:       // change the text of the button, [Default: `Share`]
    button_icon:       // change the icon to the left. choose from http://weloveiconfonts.com/#entypo) [Default: 'export']
    button_background: // background color of the button [Default: #e1e1e1]
    button_color:      // text color of the button, [Default: #333]  
  },
  networks: {
    google_plus: {
      enabled: // Enable Google+. [Default: true] (not yet implemented)
      url:     // the url you'd like to share to Google+ [Default: config.url]
    },
    twitter: {
      enabled: // Enable Twitter. [Default: true] (not yet implemented)
      url:     // the url you'd like to share to Twitter [Default: config.url]
      text:    // text to be shared alongside your link to Twitter [Default: config.text]
    },
    facebook: {
      enabled: // Enable Facebook. [Default: true] (not fully implemented)
      load_sdk: // Load the FB SDK. If false, it will default to Facebook's sharer.php implementation. 
                // NOTE: This will disable the ability to dynamically set values and rely directly on applicable Open Graph tags.
                // [Default: true]
      url: // the url you'd like to share to Facebook [Default: config.url]
      app_id: // Facebook app id for tracking shares. if provided, will use the facebook API
      title: // title to be shared alongside your link to Facebook [Default: config.title]
      caption: // caption to be shared alongside your link to Facebook [Default: null]
      text: // text to be shared alongside your link to Facebook [Default: config.text]
      image: // image to be shared to Facebook [Default: config.image]
    }
  }
}
```

### Network Hooks

You are now able to set `before` and `after` hooks when a user clicks a network. The context passed to the hook is the current network's configuration. To change any of the network's configuration before or after instantiating the share, you must alter the value and return `this` as shown in the examples below.

```js
config = {
  networks: {
    facebook: {
      before: function() {
        this.url   = "https://github.com/carrot/share-button";
        this.text  = "Changing the Facebook Share Configurations";
        return this
      },
      after: function() {
        console.log("User shared:", this.url);
      }
    }
  }
}
```



**Example:**

```js
new Share(".share-button-top", {
  title: "Share Button",
  networks: {
    facebook: {
      app_id: "602752456409826",
      before: function() {
        console.log("BEFORE", this);
        this.url   = "https://github.com/carrot/share-button";
        this.text  = "Changing the Facebook Share Configurations";
        return this
      },
      after: function() {
        console.log("User shared:", this.url);
      }
    }
  }
});
```

On a page with multiple share buttons, you can use the `before` hook to dynamically set the share URL:

```js
new Share(".share-button", {
  networks: {
    facebook: {
      before: function(element) {
        this.url = element.getAttribute("data-url");
        return this
      },
      after: function() {
        console.log("User shared:", this.url);
      }
    }
  }
});
```

### Public API

The share button also returns a small api that can be used to control it down the line if you need to. Example shown below:

```js
var share = new Share(".share-button", {
  networks: {
    facebook: {
      app_id: "abc123"
    }
  }
});
share.toggle(); // toggles the share button popup
share.open();   // open the share button popup
share.close();  // closes the share button popup
share.config;   // exposes the configurations listed above
```

This will likely become more powerful down the line as this project continues to be developed - open an issue if there's anything you wish the api would have.

### Fonts ###

#### Entypo ###

[Version 1](https://www.sharebutton.co/fonts/entypo.zip)

Includes:
- full font set
- full css file containing all font mappings
- minimized css file containing only necessary font mappings

[Version 2](https://www.sharebutton.co/fonts/v2/entypo.zip)

Includes:
- minimized font set containing only necessary font glyphs
- minimized css file containing only necessary font mappings

### Inspiration

This project was inspired by [this dribbble shot](http://dribbble.com/shots/1072278) and [this cssdeck experiment](http://cssdeck.com/labs/css-social-share-button) - huge props to these two guys for some incredible ideas and work.

### Contributing and License

- Contributing Guidelines can be found [here](contributing.md)
- Licenced under MIT - [details here](license.md)

