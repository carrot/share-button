/**
 * Sharebutton
 * @class
 * @classdesc
 * @extends ShareUtils

 * @param {String} element
 * @param {Object} options
 */
class ShareButton extends ShareUtils {
  constructor(element, options) {
    super();

    if (typeof element === 'object') {
      this.element = undefined;
      options = element;
    } else
      this.element = element;

    this.el = {
      head: document.getElementsByTagName('head')[0],
      body: document.getElementsByTagName('body')[0]
    };

    this.config = {
      enabledNetworks: 0,
      protocol: '//',
      url: window.location.href,
      caption: null,
      title: this._defaultTitle(),
      image: this._defaultImage(),
      description: this._defaultDescription(),

      ui: {
        flyout: 'top center',
        buttonText: 'Share',
        buttonFont: true,
        iconFont: true,
        css: true,
        collision: false
      },

      networks: {
        googlePlus: {
          enabled: true,
          url: null
        },
        twitter: {
          enabled: true,
          url: null,
          description: null // Text
        },
        facebook: {
          enabled: true,
          loadSdk: true,
          url: null,
          appId: null,
          title: null,
          caption: null,
          description: null,
          image: null
        },
        pinterest: {
          enabled: true,
          url: null,
          image: null,
          description: null
        },
        reddit: {
          enabled: true,
          url: null,
          title: null
        },
        linkedin: {
          enabled: true,
          url: null,
          title: null,
          description: null
        },
        whatsapp: {
          enabled: true,
          description: null,
          url: null
        },
        email: {
          enabled: true,
          title: null,      // Subject
          description: null // Body
        }
      }
    };

    this._setup(this.element, options);
  }

  /**
   * @method open
   * @description Opens Share Button
   * @public
   */
  open() { this._public('Open'); }

  /**
   * @method close
   * @description Cpens Share Button
   * @public
   */
  close() { this._public('Close'); }

  /**
   * @method toggle
   * @description Toggles Share Button
   * @public
   */
  toggle() { this._public('Toggle'); }

  /**
   * @method _public
   * @description Executes action
   * @private
   *
   * @param {String} action
   */
  _public(action) {
    for (let instance of document.querySelectorAll(this.element)) {
      let button = instance.getElementsByClassName('social')[0];
      this[`event${action}`](button);
    }
  }

  /**
   * @method _setup
   * @description Sets up Share Button
   * @private
   *
   * @param {String} element selector
   * @param {Object} opts
   */
  _setup(element, opts) {
    let instances;

    if (typeof element === 'undefined') {
      instances = this._objToArray(document.getElementsByTagName('share-button'));
    }
    else
      instances = document.querySelectorAll(`share-button${element}`);

    this._merge(this.config, opts); // Combine configs

    // If not a mobile device, disable whatsapp display
    if(this.config.networks.whatsapp.enabled && !this._isMobile())
      this.config.networks.whatsapp.enabled = false;

    this._detectNetworks(); // Set number of networks
    this._normalizeNetworkConfiguration();

    if (this.config.ui.defaultStyles) this._injectStylesheet('dist/styles.min.css');

    // Inject Facebook JS SDK (if Facebook is enabled)
    if (this.config.networks.facebook.enabled &&
       this.config.networks.facebook.loadSdk)
       this._injectFacebookSdk();

    // initialize instances
    let index = 0;
    for (let instance of instances) {
      this._setupInstance(instance, index++);
    }
  }

  /**
   * @method _setupInstance
   * @description Sets up each instance with config and styles
   * @private
   *
   * @param {DOMNode} element
   * @param {Integer} index
   */
  _setupInstance(instance, index) {
    this._hide(instance); // hide instance

    this.clicked = false; // for collision detection listening

    // Add necessary classes to instance (Note: FF doesn't support adding multiple classes in a single call)
    this._addClass(instance, `sharer-${index}`);

    // Inject HTML and CSS
    this._injectHtml(instance);
    if (this.config.ui.css)
      this._injectStylesheet('dist/styles.min.css'); // URL HERE

    this._show(instance); // show instance

    let label = instance.getElementsByTagName('label')[0];
    let button = instance.getElementsByClassName('social')[0];
    let networks = instance.getElementsByTagName('li');

    this._addClass(button, `networks-${this.config.enabledNetworks}`);
    label.addEventListener('click', () => this._eventToggle(button, label));

    // Add listener to activate networks and close button
    for (let k in Object.keys(networks)) {
      let network = networks[k];
      if(typeof(network) !== "undefined") {
        network.style.display = this.config.networks[network.getAttribute('data-network')].display;
        network.addEventListener('click', () => {
          this._eventNetwork(instance, network);
          this._eventClose(button);
        });
      }
    }
  }

  /**
   * @method _eventToggle
   * @description Toggles 'active' class on button
   * @private
   *
   * @param {DOMNode} button
   * @param {DOMNode} label
   */
  _eventToggle(button, label) {
    if(this._hasClass(button, 'active'))
      this._eventClose(button);
    else
      this._eventOpen(button, label);
  }

  /**
   * @method _eventOpen
   * @description Add 'active' class & remove 'load' class on button
   * @private
   *
   * @param {DOMNode} button
   * @param {DOMNode} label
   */
  _eventOpen(button, label) {
    if(this._hasClass(button, 'load'))
      this._removeClass(button, 'load');

    this._collisionDetection(button, label);
    this._addClass(button, 'active');
  }

  /**
   * @method _eventClose
   * @description Remove 'active' class on button
   * @private
   *
   * @param {DOMNode} button
   */
  _eventClose(button) {
    this._removeClass(button, 'active');
  }

  /**
   * @method _eventNetwork
   * @description Add 'active' class & remove 'load' class on button
   * @private
   *
   * @param {DOMNode} instance
   * @param {String}  network
   */
  _eventNetwork(instance, network) {
    let name = network.getAttribute('data-network');

    this._hook('before', name, instance);
    this[`_network${name.capitalizeFirstLetter()}`]();
    this._hook('after', name, instance);
  }

  /**
   * @method _collisionDetection
   * @description Adds listeners the first time the button is clicked to call
   * this._adjustClasses during scrolls and resizes.
   * @private
   *
   * @param {DOMNode} button - list of social networks
   * @param {DOMNode} label - share button
   */
  _collisionDetection(button, label) {
    let dimensions = {
      labelWidth: document.getElementsByClassName("export")[0].offsetWidth,
      labelHeight: document.getElementsByClassName("export")[0].offsetHeight,
      buttonWidth: document.getElementsByClassName("social")[0].offsetWidth,
    };
    this._adjustClasses(button, label, dimensions);
    if(!this.clicked) {
      window.addEventListener('scroll', () =>
        this._adjustClasses(button, label, dimensions));
      window.addEventListener('resize', () =>
        this._adjustClasses(button, label, dimensions));
      this.clicked = true;
    }
  }


  /**
   * @method _adjustClasses
   * @description Adjusts the positioning of the list of social networks based
   * off of where the share button is relative to the window.
   *
   * @private
   * @param {DOMNode} button
   * @param {DOMNode} label
   * @param {Object} dimensions
   */
  _adjustClasses(button, label, dimensions) {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let leftOffset = label.getBoundingClientRect().left + dimensions.labelWidth / 2;
    let rightOffset = windowWidth - leftOffset;
    let buttonOffset = button.getBoundingClientRect().left + dimensions.buttonWidth / 2;
    // let spaceBetween = Math.abs(leftOffset - buttonOffset) // too dynamic
    let topOffset = label.getBoundingClientRect().top + dimensions.labelHeight / 2;
    let position = this._findLocation(leftOffset, topOffset, windowWidth, windowHeight);

    // TODO: find dynamic way to get space between (not 220)
    if(position[1] === "middle" && position[0] !== "center" && (
      (position[0] === "left" && windowWidth <= leftOffset + 220 + dimensions.buttonWidth / 2) ||
      (position[0] === "right" && windowWidth <= rightOffset + 220 + dimensions.buttonWidth / 2))) {
        button.classList.add("top");
        button.classList.remove("middle", "bottom");
    }
    else {
      switch(position[1]) {
        case "top":
          button.classList.add("bottom");
          button.classList.remove("middle", "top");
          break;
        case "middle":
          button.classList.add("middle");
          button.classList.remove("top", "bottom");
          break;
        case "bottom":
          button.classList.add("top");
          button.classList.remove("middle", "bottom");
          break;
      }
      switch(position[0]) {
        case "left":
          button.classList.add("right");
          button.classList.remove("center", "left");
          break;
        case "center":
          button.classList.add("center", "top");
          button.classList.remove("left", "right", "middle");
          break;
        case "right":
          button.classList.add("left");
          button.classList.remove("center", "right");
          break;
      }
    }
  }

  /**
   * @method _findLocation
   * @description Finds the location of the label given by its x and y value
   * with respect to the window width and window height given.
   * @private
   *
   * @param {number} labelX
   * @param {number} labelY
   * @param {number} windowWidth
   * @param {number} windowHeight
   */
  _findLocation(labelX, labelY, windowWidth, windowHeight) {
    let xPosition = ["left", "center", "right"];
    let yPosition = ["top", "middle", "bottom"];
    let xLocation = Math.trunc(3 * (1 - ((windowWidth - labelX) / windowWidth)));
    let yLocation = Math.trunc(3 * (1 - ((windowHeight - labelY) / windowHeight)));
    if (xLocation >= 3) xLocation = 2;
    else if (xLocation <= -1) xLocation = 0;
    if (yLocation >= 3) yLocation = 2;
    else if (yLocation <= -1) yLocation = 0;
    return [xPosition[xLocation], yPosition[yLocation]];
  }

  /**
   * @method _networkFacebook
   * @description Create & display window
   * @private
   */
  _networkFacebook() {
    if (this.config.networks.facebook.loadSdk) {
      if (!window.FB)
        return console.error('The Facebook JS SDK hasn\'t loaded yet.');

      return FB.ui({
        method:'feed',
        name: this.config.networks.facebook.title,
        link: this.config.networks.facebook.url,
        picture: this.config.networks.facebook.image,
        caption: this.config.networks.facebook.caption,
        description: this.config.networks.facebook.description
      });
    } else
      return this.popup('https://www.facebook.com/sharer/sharer.php', {
        u: this.config.networks.facebook.url
      });
  }

  /**
   * @method _networkTwitter
   * @description Create & display window
   * @private
   */
  _networkTwitter() {
    this.popup('https://twitter.com/intent/tweet', {
      text: this.config.networks.twitter.description,
      url: this.config.networks.twitter.url
    });
  }

  /**
   * @method _networkGooglePlus
   * @description Create & display window
   * @private
   */
  _networkGooglePlus() {
    this.popup('https://plus.google.com/share', {
      url: this.config.networks.googlePlus.url
    });
  }

  /**
   * @method _networkPinterest
   * @description Create & display window
   * @private
   */
  _networkPinterest() {
    this.popup('https://www.pinterest.com/pin/create/button', {
      url: this.config.networks.pinterest.url,
      media: this.config.networks.pinterest.image,
      description: this.config.networks.pinterest.description
    });
  }

  /**
   * @method _networkLinkedIn
   * @description Create & display window
   * @private
   */
  _networkLinkedin() {
    this.popup('https://www.linkedin.com/shareArticle', {
      mini: 'true',
      url: this.config.networks.linkedin.url,
      title: this.config.networks.linkedin.title,
      summary: this.config.networks.linkedin.description
    });
  }

  /**
   * @method _networkEmail
   * @description Create & display window
   * @private
   */
  _networkEmail() {
    this.popup('mailto:', {
      subject: this.config.networks.email.title,
      body: this.config.networks.email.description
    });
  }

  /**
   * @method _networkReddit
   * @description Create & display window
   * @private
   */
  _networkReddit() {
    this.popup('http://www.reddit.com/submit', {
      url: this.config.networks.reddit.url,
      title: this.config.networks.reddit.title
    });
  }

  /**
   * @method _networkWhatsapp
   * @description Open whatsapp for sending message
   * @private
   */
  _networkWhatsapp() {
    let url = 'whatsapp://send?text=';
    url += encodeURIComponent(this.config.networks.whatsapp.description) + '%20';
    url += encodeURIComponent(this.config.networks.whatsapp.url);
    this.popup(url);
  }

  /**
   * @method _injectStylesheet
   * @description Inject link to stylesheet
   * @private
   *
   * @param {String} url
   */
  _injectStylesheet(url) {
    if (!this.el.head.querySelector(`link[href='${url}']`)) {
      let link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", url);
      this.el.head.appendChild(link);
    }
  }

  /**
   * @method _injectHtml
   * @description Inject button structure
   * @private
   */
  _injectHtml(instance) {
    instance.innerHTML = `<label class='export'><span>${this.config.ui.buttonText}</span></label><div class='social load ${this.config.ui.flyout}'><ul><li class='pinterest' data-network='pinterest'></li><li class='twitter' data-network='twitter'></li><li class='facebook' data-network='facebook'></li><li class='whatsapp' data-network='whatsapp'></li><li class='gplus' data-network='googlePlus'></li><li class='reddit' data-network='reddit'></li><li class='linkedin' data-network='linkedin'></li><li class='paper-plane' data-network='email'></li></ul></div>`;
  }

  /**
   * @method _injectFacebookSdk
   * @description Inject Facebook SDK
   * @private
   */
  _injectFacebookSdk() {
    if (!window.FB && this.config.networks.facebook.appId && !this.el.body.querySelector('#fb-root')) {
      let script = document.createElement('script');
      script.text = `window.fbAsyncInit=function(){FB.init({appId:'${this.config.networks.facebook.appId}',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src='//connect.facebook.net/en_US/all.js';i.parentNode.insertBefore(r,i)})(document,'script','facebook-jssdk');`;

      let fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';

      this.el.body.appendChild(fbRoot);
      this.el.body.appendChild(script);
    }
  }

  /**
   * @method _hook
   * @description Hook helper function
   * @private
   *
   * @param {String}   type
   * @param {String}   network
   * @param {DOMNode}  instance
   */
  _hook(type, network, instance) {
    let fn = this.config.networks[network][type];

    if (typeof fn === 'function') {
      let opts = fn.call(this.config.networks[network], instance);

      if (opts !== undefined) {
        opts = this._normalizeFilterConfigUpdates(opts);

        this.extend(this.config.networks[network], opts, true);
        this._normalizeNetworkConfiguration();
      }
    }
  }

  /**
   * @method _defaultTitle
   * @description Gets default title
   * @private
   *
   * @returns {String}
   */
  _defaultTitle() {
    let content;
    if ((content = (document.querySelector('meta[property="og:title"]') ||
                  document.querySelector('meta[name="twitter:title"]'))))
      return content.getAttribute('content');
    else if ((content = document.querySelector('title')))
      return content.innerText;
  }

  /**
   * @method _defaultImage
   * @description Gets default image
   * @private
   */
  _defaultImage() {
    let content;
    if ((content = (document.querySelector('meta[property="og:image"]') ||
                    document.querySelector('meta[name="twitter:image"]'))))
      return content.getAttribute('content');
  }

  /**
   * @method _defaultDescription
   * @description Gets default description
   * @private
   *
   * @returns {String}
   */
  _defaultDescription() {
    let content;
    if((content = (document.querySelector('meta[property="og:description"]') ||
                  document.querySelector('meta[name="twitter:description"]') ||
                  document.querySelector('meta[name="description"]'))))
      return content.getAttribute('content');
    else
      return '';
  }

  /**
   * @method _detectNetworks
   * @description Detect number of networks in use and display/hide
   * @private
   */
  _detectNetworks() {
    // Update network-specific configuration with global configurations
    for (let network of Object.keys(this.config.networks)) {
      let display;
      for (let option of Object.keys(this.config.networks[network])) {
        if(this.config.networks[network][option] === null) {
          this.config.networks[network][option] = this.config[option];
        }
      }
      // Check for enabled networks and display them
      if (this.config.networks[network].enabled) {
        display = 'block';
        this.config.enabledNetworks += 1;
      }
      else
        display = 'none';

      this.config.networks[network].display = display;
    }
  }

  /**
   * @method _normalizeNetworkConfiguration
   * @description Normalizes network configuration for Facebook & Twitter
   * @private
   */
  _normalizeNetworkConfiguration() {
    // Don't load FB SDK if FB appId isn't present
    if (!this.config.networks.facebook.appId)
      this.config.networks.facebook.loadSdk = false;

    // Encode Twitter description for URL
    if (!!this.config.networks.twitter.description)
      if (!this._isEncoded(this.config.networks.twitter.description))
        this.config.networks.twitter.description = encodeURIComponent(this.config.networks.twitter.description);

    // Typecast Facebook appId to a String
    if (typeof this.config.networks.facebook.appId === 'number')
      this.config.networks.facebook.appId = this.config.networks.facebook.appId.toString();
  }

  /**
   * @method _normalizeFilterConfigUpdates
   * @description
   * @private
   *
   * @param {Object} opts
   * @returns {Object}
   */
  _normalizeFilterConfigUpdates(opts) {
    if (this.config.networks.facebook.appId !== opts.appId) {
      console.warn('You are unable to change the Facebook appId after the button has been initialized. Please update your Facebook filters accordingly.');
      delete(opts.appId);
    }

    if (this.config.networks.facebook.loadSdk !== opts.loadSdk) {
      console.warn('You are unable to change the Facebook loadSdk option after the button has been initialized. Please update your Facebook filters accordingly.');
      delete(opts.appId);
    }

    return opts;
  }
}
