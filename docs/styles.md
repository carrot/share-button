# Styles
The Share Button styles attempt to be an all-for-one solution for any site. To customize your share button you can modify the options you're passing into your object or you can create your own stylesheet!

Within `share-button.styl` you'll find two mixins: `network()` & `socialIcon()`. The `network()` mixin is what makes the network list responsive. `socialIcon()` is how we insert each svg and define their colors. After all the mixins and colors are defined then we setup the share-button's styles.

## Customization
If you're going to cusomtize the share button you'll need to define styles for these main elements:

```
share-button - the button that holds `<export icon> Share`
ul - holds the list of social networks
li - holds each network
a - the link tag that is a network
```

If you'd like to control the width of each network based on the amount of networks, you can use `.networks-{num}`. If you're using all the networks, don't forget about `whats-app` for mobile, there will be 8.

Happy developing! :D
