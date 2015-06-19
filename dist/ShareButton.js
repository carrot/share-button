
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.ShareButton = factory();
  }
}(this, function(require, exports, module) {

/**
 * classList shim for IE 9
 * Don't convert over to ES6
 */
"use strict";

if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== "undefined") {
  Object.defineProperty(HTMLElement.prototype, "classList", {
    get: function get() {
      var ret, self, update;
      update = function (fn) {
        return function (value) {
          var classes, index;
          classes = self.className.split(/\s+/);
          index = classes.indexOf(value);
          fn(classes, index, value);
          self.className = classes.join(" ");
        };
      };
      self = this;
      ret = {
        add: update(function (classes, index, value) {
          ~index || classes.push(value);
        }),
        remove: update(function (classes, index) {
          ~index && classes.splice(index, 1);
        }),
        toggle: update(function (classes, index, value) {
          if (~index) {
            classes.splice(index, 1);
          } else {
            classes.push(value);
          }
        }),
        contains: function contains(value) {
          return !! ~self.className.split(/\s+/).indexOf(value);
        },
        item: function item(i) {
          return self.className.split(/\s+/)[i] || null;
        }
      };
      Object.defineProperty(ret, "length", {
        get: function get() {
          return self.className.split(/\s+/).length;
        }
      });
      return ret;
    }
  });
}

/**
 * Symbol.iterator polyfill
 */
if (NodeList.prototype[Symbol.iterator] === undefined) {
  NodeList.prototype[Symbol.iterator] = function () {
    var _this = this;

    var i = 0;
    return {
      next: function next() {
        return { done: i >= _this.length, value: _this.item(i++) };
      }
    };
  };
}
/**
 * ShareUtils
 * @class
 * @classdesc A nice set of utilities.
 */
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShareUtils = (function () {
  function ShareUtils() {
    _classCallCheck(this, ShareUtils);
  }

  _createClass(ShareUtils, [{
    key: "_hide",

    /**
     * @method _hide
     * @description Change element's display to 'none'
     * @private
     *
     * @param {DOMNode} el
     */
    value: function _hide(el) {
      el.style.display = "none";
    }
  }, {
    key: "_show",

    /**
     * @method _show
     * @description Change element's display to 'block'
     * @private
     *
     * @param {DOMNode} el
     */
    value: function _show(el) {
      el.style.display = "block";
    }
  }, {
    key: "_hasClass",

    /**
     * @method _hasClass
     * @description Wrapper to see if an element contains a class.
     * @private
     *
     * @param {DOMNode} el
     * @param {String}  className
     * @returns {Boolean}
     */
    value: function _hasClass(el, className) {
      return el.classList.contains(className);
    }
  }, {
    key: "_addClass",

    /**
     * @method addClass
     * @description Wrapper to add class to element.
     * @private
     *
     * @param {DOMNode} el
     * @param {String}  className
     */
    value: function _addClass(el, className) {
      el.classList.add(className);
    }
  }, {
    key: "_removeClass",

    /**
     * @method removeClass
     * @description Wrapper to remove class from element.
     * @private
     *
     * @param {DOMNode} el
     * @param {String}  className
     */
    value: function _removeClass(el, className) {
      el.classList.remove(className);
    }
  }, {
    key: "_isEncoded",

    /**
     * @method _isEncoded
     * @description Wrapper to check if the string is encoded.
     * @private
     *
     * @param {String}  str
     * @param {Boolean}
     */
    value: function _isEncoded(str) {
      str = str.toRFC3986();
      return decodeURIComponent(str) !== str;
    }
  }, {
    key: "_encode",

    /**
     * @method _encode
     * @description Wrapper to _encode a string if the string isn't already encoded.
     * @private
     *
     * @param {DOMNode} el
     * @param {String}  className
     */
    value: function _encode(str) {
      if (typeof str === "undefined" || str === null || this._isEncoded(str)) return str;else return str.toRFC3986();
    }
  }, {
    key: "popup",

    /**
     * @method popup
     * @description Create a window for specified network
     *
     * @param {String}  url
     * @param {Object}  params
     */
    value: function popup(url) {
      var _this = this;

      var params = arguments[1] === undefined ? {} : arguments[1];

      var popup = {
        width: 500,
        height: 350
      };

      popup.top = screen.height / 2 - popup.height / 2;
      popup.left = screen.width / 2 - popup.width / 2;

      var qs = (function () {
        var results = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.keys(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var k = _step.value;

            var v = params[k];
            results.push("" + k + "=" + _this._encode(v));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return results.join("&");
      })();

      if (qs) qs = "?" + qs;

      // This does work even though it contains \n once converted.
      window.open(url + qs, "targetWindow", "\n        toolbar=no,\n        location=no,\n        status=no,\n        menubar=no,\n        scrollbars=yes,\n        resizable=yes,\n        left=" + popup.left + ",\n        top=" + popup.top + ",\n        width=" + popup.width + ",\n        height=" + popup.height + "\n      ");
    }
  }, {
    key: "_merge",

    /**
     * @method _merge
     * @description Combines two (or more) objects, giving the last one precedence
     * @author svlasov-gists
     * [Original Gist]{@link https://gist.github.com/svlasov-gists/2383751}
     *
     * @param {Object}  target
     * @param {Object}  source
     * @return {Object} target
     */
    value: (function (_merge2) {
      function _merge(_x, _x2) {
        return _merge2.apply(this, arguments);
      }

      _merge.toString = function () {
        return _merge2.toString();
      };

      return _merge;
    })(function (target, source) {
      if (typeof target !== "object") target = {};

      for (var property in source) {
        if (source.hasOwnProperty(property)) {
          var sourceProperty = source[property];

          if (typeof sourceProperty === "object") {
            target[property] = this._merge(target[property], sourceProperty);
            continue;
          }

          target[property] = sourceProperty;
        }
      }

      for (var a = 2, l = arguments.length; a < l; a++) {
        _merge(target, arguments[a]);
      }return target;
    })
  }, {
    key: "_objToArray",

    /**
     * @method _objectToArray
     * @description Takes an Object and converts it into an array of Objects. This is used when converting a list of DOMNodes into an array.
     *
     * @param {Object} obj
     * @returns {Array} arr
     */
    value: function _objToArray(obj) {
      var arr = [];

      for (var k in obj) {
        if (typeof obj[k] === "object") arr.push(obj[k]);
      }return arr;
    }
  }, {
    key: "_isMobile",

    /**
     * @method _isMobile
     * @description Returns true if current device is mobile, false otherwise
     * @author kriskbx
     * [Original Gist] {@link https://github.com/kriskbx/whatsapp-sharing/blob/master/src/button.js}
     * @private
     */
    value: function _isMobile() {
      if (navigator.userAgent.match(/Android|iPhone/i) && !navigator.userAgent.match(/iPod|iPad/i)) return true;
      return false;
    }
  }]);

  return ShareUtils;
})();

/**
 * @method toRFC3986
 * @description Encodes the string in RFC3986
 * @memberof String
 *
 * @return {String}
 */
String.prototype.toRFC3986 = function () {
  var tmp = encodeURIComponent(this);
  tmp.replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
};

/**
 * @method capitalizeFirstLetter
 * @description Does exactly what the method name states
 * @memberof String
 *
 * @return {String}
 */
String.prototype.capitalizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
/**
 * Sharebutton
 * @class
 * @classdesc
 * @extends ShareUtils

 * @param {String} element
 * @param {Object} options
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var ShareButton = (function (_ShareUtils) {
  function ShareButton(element, options) {
    _classCallCheck(this, ShareButton);

    _get(Object.getPrototypeOf(ShareButton.prototype), 'constructor', this).call(this);

    if (typeof element === 'object') {
      this.element = undefined;
      options = element;
    } else this.element = element;

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
          title: null, // Subject
          description: null // Body
        }
      }
    };

    this._setup(this.element, options);
  }

  _inherits(ShareButton, _ShareUtils);

  _createClass(ShareButton, [{
    key: 'open',

    /**
     * @method open
     * @description Opens Share Button
     * @public
     */
    value: function open() {
      this._public('Open');
    }
  }, {
    key: 'close',

    /**
     * @method close
     * @description Cpens Share Button
     * @public
     */
    value: function close() {
      this._public('Close');
    }
  }, {
    key: 'toggle',

    /**
     * @method toggle
     * @description Toggles Share Button
     * @public
     */
    value: function toggle() {
      this._public('Toggle');
    }
  }, {
    key: '_public',

    /**
     * @method _public
     * @description Executes action
     * @private
     *
     * @param {String} action
     */
    value: function _public(action) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = document.querySelectorAll(this.element)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var instance = _step.value;

          var button = instance.getElementsByClassName('social')[0];
          this['event' + action](button);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: '_setup',

    /**
     * @method _setup
     * @description Sets up Share Button
     * @private
     *
     * @param {String} element selector
     * @param {Object} opts
     */
    value: function _setup(element, opts) {
      var instances = undefined;

      if (typeof element === 'undefined') {
        instances = this._objToArray(document.getElementsByTagName('share-button'));
      } else instances = document.querySelectorAll('share-button' + element);

      this._merge(this.config, opts); // Combine configs

      // If not a mobile device, disable whatsapp display
      if (this.config.networks.whatsapp.enabled && !this._isMobile()) this.config.networks.whatsapp.enabled = false;

      this._detectNetworks(); // Set number of networks
      this._normalizeNetworkConfiguration();

      if (this.config.ui.defaultStyles) this._injectStylesheet('dist/styles.min.css');

      // Inject Facebook JS SDK (if Facebook is enabled)
      if (this.config.networks.facebook.enabled && this.config.networks.facebook.loadSdk) this._injectFacebookSdk();

      // initialize instances
      var index = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = instances[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var instance = _step2.value;

          this._setupInstance(instance, index++);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: '_setupInstance',

    /**
     * @method _setupInstance
     * @description Sets up each instance with config and styles
     * @private
     *
     * @param {DOMNode} element
     * @param {Integer} index
     */
    value: function _setupInstance(instance, index) {
      var _this = this;

      this._hide(instance); // hide instance

      this.clicked = false; // for collision detection listening

      // Add necessary classes to instance (Note: FF doesn't support adding multiple classes in a single call)
      this._addClass(instance, 'sharer-' + index);

      // Inject HTML and CSS
      this._injectHtml(instance);
      if (this.config.ui.css) this._injectStylesheet('dist/styles.min.css'); // URL HERE

      this._show(instance); // show instance

      var label = instance.getElementsByTagName('label')[0];
      var button = instance.getElementsByClassName('social')[0];
      var networks = instance.getElementsByTagName('li');

      this._addClass(button, 'networks-' + this.config.enabledNetworks);
      label.addEventListener('click', function () {
        return _this._eventToggle(button, label);
      });

      var _loop = function (k) {
        var network = networks[k];
        if (typeof network !== 'undefined') {
          network.style.display = _this.config.networks[network.getAttribute('data-network')].display;
          network.addEventListener('click', function () {
            _this._eventNetwork(instance, network);
            _this._eventClose(button);
          });
        }
      };

      // Add listener to activate networks and close button
      for (var k in Object.keys(networks)) {
        _loop(k);
      }
    }
  }, {
    key: '_eventToggle',

    /**
     * @method _eventToggle
     * @description Toggles 'active' class on button
     * @private
     *
     * @param {DOMNode} button
     * @param {DOMNode} label
     */
    value: function _eventToggle(button, label) {
      if (this._hasClass(button, 'active')) this._eventClose(button);else this._eventOpen(button, label);
    }
  }, {
    key: '_eventOpen',

    /**
     * @method _eventOpen
     * @description Add 'active' class & remove 'load' class on button
     * @private
     *
     * @param {DOMNode} button
     * @param {DOMNode} label
     */
    value: function _eventOpen(button, label) {
      if (this._hasClass(button, 'load')) this._removeClass(button, 'load');

      this._collisionDetection(button, label);
      this._addClass(button, 'active');
    }
  }, {
    key: '_eventClose',

    /**
     * @method _eventClose
     * @description Remove 'active' class on button
     * @private
     *
     * @param {DOMNode} button
     */
    value: function _eventClose(button) {
      this._removeClass(button, 'active');
    }
  }, {
    key: '_eventNetwork',

    /**
     * @method _eventNetwork
     * @description Add 'active' class & remove 'load' class on button
     * @private
     *
     * @param {DOMNode} instance
     * @param {String}  network
     */
    value: function _eventNetwork(instance, network) {
      var name = network.getAttribute('data-network');

      this._hook('before', name, instance);
      this['_network' + name.capitalizeFirstLetter()]();
      this._hook('after', name, instance);
    }
  }, {
    key: '_collisionDetection',

    /**
     * @method _collisionDetection
     * @description Adds listeners the first time the button is clicked to call
     * this._adjustClasses during scrolls and resizes.
     * @private
     *
     * @param {DOMNode} button - list of social networks
     * @param {DOMNode} label - share button
     */
    value: function _collisionDetection(button, label) {
      var _this2 = this;

      var dimensions = {
        labelWidth: document.getElementsByClassName('export')[0].offsetWidth,
        labelHeight: document.getElementsByClassName('export')[0].offsetHeight,
        buttonWidth: document.getElementsByClassName('social')[0].offsetWidth
      };
      this._adjustClasses(button, label, dimensions);
      if (!this.clicked) {
        window.addEventListener('scroll', function () {
          return _this2._adjustClasses(button, label, dimensions);
        });
        window.addEventListener('resize', function () {
          return _this2._adjustClasses(button, label, dimensions);
        });
        this.clicked = true;
      }
    }
  }, {
    key: '_adjustClasses',

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
    value: function _adjustClasses(button, label, dimensions) {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var leftOffset = label.getBoundingClientRect().left + dimensions.labelWidth / 2;
      var rightOffset = windowWidth - leftOffset;
      var buttonOffset = button.getBoundingClientRect().left + dimensions.buttonWidth / 2;
      // let spaceBetween = Math.abs(leftOffset - buttonOffset) // too dynamic
      var topOffset = label.getBoundingClientRect().top + dimensions.labelHeight / 2;
      var position = this._findLocation(leftOffset, topOffset, windowWidth, windowHeight);

      // TODO: find dynamic way to get space between (not 220)
      if (position[1] === 'middle' && position[0] !== 'center' && (position[0] === 'left' && windowWidth <= leftOffset + 220 + dimensions.buttonWidth / 2 || position[0] === 'right' && windowWidth <= rightOffset + 220 + dimensions.buttonWidth / 2)) {
        button.classList.add('top');
        button.classList.remove('middle', 'bottom');
      } else {
        switch (position[1]) {
          case 'top':
            button.classList.add('bottom');
            button.classList.remove('middle', 'top');
            break;
          case 'middle':
            button.classList.add('middle');
            button.classList.remove('top', 'bottom');
            break;
          case 'bottom':
            button.classList.add('top');
            button.classList.remove('middle', 'bottom');
            break;
        }
        switch (position[0]) {
          case 'left':
            button.classList.add('right');
            button.classList.remove('center', 'left');
            break;
          case 'center':
            button.classList.add('center', 'top');
            button.classList.remove('left', 'right', 'middle');
            break;
          case 'right':
            button.classList.add('left');
            button.classList.remove('center', 'right');
            break;
        }
      }
    }
  }, {
    key: '_findLocation',

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
    value: function _findLocation(labelX, labelY, windowWidth, windowHeight) {
      var xPosition = ['left', 'center', 'right'];
      var yPosition = ['top', 'middle', 'bottom'];
      var xLocation = Math.trunc(3 * (1 - (windowWidth - labelX) / windowWidth));
      var yLocation = Math.trunc(3 * (1 - (windowHeight - labelY) / windowHeight));
      if (xLocation >= 3) xLocation = 2;else if (xLocation <= -1) xLocation = 0;
      if (yLocation >= 3) yLocation = 2;else if (yLocation <= -1) yLocation = 0;
      return [xPosition[xLocation], yPosition[yLocation]];
    }
  }, {
    key: '_networkFacebook',

    /**
     * @method _networkFacebook
     * @description Create & display window
     * @private
     */
    value: function _networkFacebook() {
      if (this.config.networks.facebook.loadSdk) {
        if (!window.FB) return console.error('The Facebook JS SDK hasn\'t loaded yet.');

        return FB.ui({
          method: 'feed',
          name: this.config.networks.facebook.title,
          link: this.config.networks.facebook.url,
          picture: this.config.networks.facebook.image,
          caption: this.config.networks.facebook.caption,
          description: this.config.networks.facebook.description
        });
      } else return this.popup('https://www.facebook.com/sharer/sharer.php', {
        u: this.config.networks.facebook.url
      });
    }
  }, {
    key: '_networkTwitter',

    /**
     * @method _networkTwitter
     * @description Create & display window
     * @private
     */
    value: function _networkTwitter() {
      this.popup('https://twitter.com/intent/tweet', {
        text: this.config.networks.twitter.description,
        url: this.config.networks.twitter.url
      });
    }
  }, {
    key: '_networkGooglePlus',

    /**
     * @method _networkGooglePlus
     * @description Create & display window
     * @private
     */
    value: function _networkGooglePlus() {
      this.popup('https://plus.google.com/share', {
        url: this.config.networks.googlePlus.url
      });
    }
  }, {
    key: '_networkPinterest',

    /**
     * @method _networkPinterest
     * @description Create & display window
     * @private
     */
    value: function _networkPinterest() {
      this.popup('https://www.pinterest.com/pin/create/button', {
        url: this.config.networks.pinterest.url,
        media: this.config.networks.pinterest.image,
        description: this.config.networks.pinterest.description
      });
    }
  }, {
    key: '_networkLinkedin',

    /**
     * @method _networkLinkedIn
     * @description Create & display window
     * @private
     */
    value: function _networkLinkedin() {
      this.popup('https://www.linkedin.com/shareArticle', {
        mini: 'true',
        url: this.config.networks.linkedin.url,
        title: this.config.networks.linkedin.title,
        summary: this.config.networks.linkedin.description
      });
    }
  }, {
    key: '_networkEmail',

    /**
     * @method _networkEmail
     * @description Create & display window
     * @private
     */
    value: function _networkEmail() {
      this.popup('mailto:', {
        subject: this.config.networks.email.title,
        body: this.config.networks.email.description
      });
    }
  }, {
    key: '_networkReddit',

    /**
     * @method _networkReddit
     * @description Create & display window
     * @private
     */
    value: function _networkReddit() {
      this.popup('http://www.reddit.com/submit', {
        url: this.config.networks.reddit.url,
        title: this.config.networks.reddit.title
      });
    }
  }, {
    key: '_networkWhatsapp',

    /**
     * @method _networkWhatsapp
     * @description Open whatsapp for sending message
     * @private
     */
    value: function _networkWhatsapp() {
      var url = 'whatsapp://send?text=';
      url += encodeURIComponent(this.config.networks.whatsapp.description) + '%20';
      url += encodeURIComponent(this.config.networks.whatsapp.url);
      this.popup(url);
    }
  }, {
    key: '_injectStylesheet',

    /**
     * @method _injectStylesheet
     * @description Inject link to stylesheet
     * @private
     *
     * @param {String} url
     */
    value: function _injectStylesheet(url) {
      if (!this.el.head.querySelector('link[href=\'' + url + '\']')) {
        var link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', url);
        this.el.head.appendChild(link);
      }
    }
  }, {
    key: '_injectHtml',

    /**
     * @method _injectHtml
     * @description Inject button structure
     * @private
     */
    value: function _injectHtml(instance) {
      instance.innerHTML = '<label class=\'export\'><span>' + this.config.ui.buttonText + '</span></label><div class=\'social load ' + this.config.ui.flyout + '\'><ul><li class=\'pinterest\' data-network=\'pinterest\'></li><li class=\'twitter\' data-network=\'twitter\'></li><li class=\'facebook\' data-network=\'facebook\'></li><li class=\'whatsapp\' data-network=\'whatsapp\'></li><li class=\'gplus\' data-network=\'googlePlus\'></li><li class=\'reddit\' data-network=\'reddit\'></li><li class=\'linkedin\' data-network=\'linkedin\'></li><li class=\'paper-plane\' data-network=\'email\'></li></ul></div>';
    }
  }, {
    key: '_injectFacebookSdk',

    /**
     * @method _injectFacebookSdk
     * @description Inject Facebook SDK
     * @private
     */
    value: function _injectFacebookSdk() {
      if (!window.FB && this.config.networks.facebook.appId && !this.el.body.querySelector('#fb-root')) {
        var script = document.createElement('script');
        script.text = 'window.fbAsyncInit=function(){FB.init({appId:\'' + this.config.networks.facebook.appId + '\',status:true,xfbml:true})};(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n)){return}r=e.createElement(t);r.id=n;r.src=\'//connect.facebook.net/en_US/all.js\';i.parentNode.insertBefore(r,i)})(document,\'script\',\'facebook-jssdk\');';

        var fbRoot = document.createElement('div');
        fbRoot.id = 'fb-root';

        this.el.body.appendChild(fbRoot);
        this.el.body.appendChild(script);
      }
    }
  }, {
    key: '_hook',

    /**
     * @method _hook
     * @description Hook helper function
     * @private
     *
     * @param {String}   type
     * @param {String}   network
     * @param {DOMNode}  instance
     */
    value: function _hook(type, network, instance) {
      var fn = this.config.networks[network][type];

      if (typeof fn === 'function') {
        var opts = fn.call(this.config.networks[network], instance);

        if (opts !== undefined) {
          opts = this._normalizeFilterConfigUpdates(opts);

          this.extend(this.config.networks[network], opts, true);
          this._normalizeNetworkConfiguration();
        }
      }
    }
  }, {
    key: '_defaultTitle',

    /**
     * @method _defaultTitle
     * @description Gets default title
     * @private
     *
     * @returns {String}
     */
    value: function _defaultTitle() {
      var content = undefined;
      if (content = document.querySelector('meta[property="og:title"]') || document.querySelector('meta[name="twitter:title"]')) return content.getAttribute('content');else if (content = document.querySelector('title')) return content.innerText;
    }
  }, {
    key: '_defaultImage',

    /**
     * @method _defaultImage
     * @description Gets default image
     * @private
     */
    value: function _defaultImage() {
      var content = undefined;
      if (content = document.querySelector('meta[property="og:image"]') || document.querySelector('meta[name="twitter:image"]')) return content.getAttribute('content');
    }
  }, {
    key: '_defaultDescription',

    /**
     * @method _defaultDescription
     * @description Gets default description
     * @private
     *
     * @returns {String}
     */
    value: function _defaultDescription() {
      var content = undefined;
      if (content = document.querySelector('meta[property="og:description"]') || document.querySelector('meta[name="twitter:description"]') || document.querySelector('meta[name="description"]')) return content.getAttribute('content');else return '';
    }
  }, {
    key: '_detectNetworks',

    /**
     * @method _detectNetworks
     * @description Detect number of networks in use and display/hide
     * @private
     */
    value: function _detectNetworks() {
      // Update network-specific configuration with global configurations
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.keys(this.config.networks)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var network = _step3.value;

          var display = undefined;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = Object.keys(this.config.networks[network])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var option = _step4.value;

              if (this.config.networks[network][option] === null) {
                this.config.networks[network][option] = this.config[option];
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                _iterator4['return']();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          // Check for enabled networks and display them
          if (this.config.networks[network].enabled) {
            display = 'block';
            this.config.enabledNetworks += 1;
          } else display = 'none';

          this.config.networks[network].display = display;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: '_normalizeNetworkConfiguration',

    /**
     * @method _normalizeNetworkConfiguration
     * @description Normalizes network configuration for Facebook & Twitter
     * @private
     */
    value: function _normalizeNetworkConfiguration() {
      // Don't load FB SDK if FB appId isn't present
      if (!this.config.networks.facebook.appId) this.config.networks.facebook.loadSdk = false;

      // Encode Twitter description for URL
      if (!!this.config.networks.twitter.description) if (!this._isEncoded(this.config.networks.twitter.description)) this.config.networks.twitter.description = encodeURIComponent(this.config.networks.twitter.description);

      // Typecast Facebook appId to a String
      if (typeof this.config.networks.facebook.appId === 'number') this.config.networks.facebook.appId = this.config.networks.facebook.appId.toString();
    }
  }, {
    key: '_normalizeFilterConfigUpdates',

    /**
     * @method _normalizeFilterConfigUpdates
     * @description
     * @private
     *
     * @param {Object} opts
     * @returns {Object}
     */
    value: function _normalizeFilterConfigUpdates(opts) {
      if (this.config.networks.facebook.appId !== opts.appId) {
        console.warn('You are unable to change the Facebook appId after the button has been initialized. Please update your Facebook filters accordingly.');
        delete opts.appId;
      }

      if (this.config.networks.facebook.loadSdk !== opts.loadSdk) {
        console.warn('You are unable to change the Facebook loadSdk option after the button has been initialized. Please update your Facebook filters accordingly.');
        delete opts.appId;
      }

      return opts;
    }
  }]);

  return ShareButton;
})(ShareUtils);
return ShareButton;

}));
