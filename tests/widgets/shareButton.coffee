path = require 'path'

module.exports = ->

  @Widgets = @Widgets || {}

  @Widgets.ShareButton = @Widget.extend
    root: 'share-button'

    switchToPopup: ->
      popUpWindowHandle = @driver.getAllWindowHandles()
        .then (res) -> return res[res.length - 1]
      @driver.switchTo().window(popUpWindowHandle)

    addAnimate: ->
      @addClass('animate')

  @Widgets.SBDiv = @Widget.extend
    root: 'div'

  @Widgets.ShareButtonSocial = @Widget.extend
    root: '.sb-social'

  @Widgets.ShareButtonTestSocial = @Widget.extend
    root: '.test-social'

  @Widgets.ShareButtonNetworks = @Widget.List.extend
    root: 'share-button ul'
    itemSelector: 'li'
