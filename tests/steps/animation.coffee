module.exports = ->
  @Given /^I create an Animated Share Button$/, () ->
    @driver.get(@Helpers.fixture('animation'))

  @Then /^The classes will be correct at middle center$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    div = new @Widgets.SBDiv()
    shareButton.addClass('middle-center').then ->
      social.getAttribute('class').then (classList) ->
        (classList.indexOf('sb-top') >= 0 &&
         classList.indexOf('sb-center') >=0).should.be.true

  @Then /^The classes will be correct at bottom left$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    shareButton.removeClass('middle-center').then ->
      shareButton.addClass('bottom-left').then ->
        social.getAttribute('class').then (classList) ->
          (classList.indexOf('sb-top') >= 0 &&
           classList.indexOf('sb-right') >= 0 &&
           classList.indexOf('sb-center') < 0).should.be.true

  @Then /^The classes will be correct at middle left$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    shareButton.removeClass('bottom-left').then ->
      shareButton.addClass('middle-left').then ->
        social.getAttribute('class').then (classList) ->
          (classList.indexOf('sb-middle') >= 0 &&
           classList.indexOf('sb-right') >=0 &&
           classList.indexOf('sb-top') < 0).should.be.true

  @Then /^The classes will be correct at top left$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    shareButton.removeClass('middle-left').then ->
      shareButton.addClass('top-left').then ->
        social.getAttribute('class').then (classList) ->
          (classList.indexOf('sb-bottom') >= 0 &&
           classList.indexOf('sb-right') >=0 &&
           classList.indexOf('sb-middle') < 0).should.be.true

  @Then /^The classes will be correct at top center$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    shareButton.removeClass('top-left').then ->
      shareButton.addClass('top-center').then ->
        social.getAttribute('class').then (classList) ->
          (classList.indexOf('sb-bottom') >= 0 &&
           classList.indexOf('sb-center') >=0 &&
           classList.indexOf('sb-right') < 0).should.be.true

  @Then /^The classes will be correct at top right$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    shareButton.removeClass('top-center').then ->
      shareButton.addClass('top-right').then ->
        social.getAttribute('class').then (classList) ->
          (classList.indexOf('sb-bottom') >= 0 &&
           classList.indexOf('sb-left') >=0 &&
           classList.indexOf('sb-center') < 0).should.be.true

  @Then /^The classes will be correct at middle right$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    shareButton.removeClass('top-right').then ->
      shareButton.addClass('middle-right').then ->
        social.getAttribute('class').then (classList) ->
          (classList.indexOf('sb-middle') >= 0 &&
           classList.indexOf('sb-left') >=0 &&
           classList.indexOf('sb-bottom') < 0).should.be.true

  @Then /^The classes will be correct at bottom right$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    shareButton.removeClass('middle-right').then ->
      shareButton.addClass('bottom-right').then ->
        social.getAttribute('class').then (classList) ->
          (classList.indexOf('sb-top') >= 0 &&
           classList.indexOf('sb-left') >=0 &&
           classList.indexOf('sb-middle') < 0).should.be.true

  @Then /^The classes will be correct at bottom center$/, () ->
    shareButton = new @Widgets.ShareButton()
    social = new @Widgets.ShareButtonSocial()
    shareButton.removeClass('bottom-right').then ->
      shareButton.addClass('bottom-center').then ->
        social.getAttribute('class').then (classList) ->
          (classList.indexOf('sb-top') >= 0 &&
           classList.indexOf('sb-center') >=0 &&
           classList.indexOf('sb-left') < 0).should.be.true
