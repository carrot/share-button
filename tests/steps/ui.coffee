module.exports = ->
  @Given /^I create a UI Share Button$/, () ->
    @driver.get(@Helpers.fixture('ui'))

  @Then /^The Share Button should have the correct text$/, () ->
    new @Widgets
      .ShareButton().getText()
      .should.eventually.eq('TEST TEXT')

  @Then /^The buttons should have the correct class$/, () ->
    social = new @Widgets.ShareButtonSocial()
    social.hasClass('bottom').should.eventually.be.true
    social.hasClass('left').should.eventually.be.true
