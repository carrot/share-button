module.exports = ->
  @Given /^I create a UI Share Button$/, () ->
    @driver.get(@Helpers.fixture('ui'))

  @Then /^The Share Button should have the correct text$/, () ->
    new @Widgets
      .ShareButton().getText()
      .should.eventually.eq('TEST TEXT')

  @Then /^The buttons should have the correct classes$/, () ->
    social = new @Widgets.ShareButtonTestSocial()
    social.hasClass('test-bottom').should.eventually.be.true
    social.hasClass('test-left').should.eventually.be.true
