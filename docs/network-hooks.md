# Network Hooks
You are able to set `before` and `after` hooks when a user clicks a network. The context passed to the hook is the current network's configuration. To change any of the network's configuration before or after instantiating the share, you must alter the value and return `this` as shown in the examples below.

```js
config = {
  networks: {
    facebook: {
      before: function() {
        this.url   = "https://github.com/carrot/share-button";
        this.text  = "Changing the Facebook Share Configurations";
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
      appId: "602752456409826",
      before: function() {
        console.log("BEFORE", this);
        this.url   = "https://github.com/carrot/share-button";
        this.text  = "Changing the Facebook Share Configurations";
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
      },
      after: function() {
        console.log("User shared:", this.url);
      }
    }
  }
});
```
