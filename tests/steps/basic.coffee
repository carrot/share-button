networks = [
  'pinterest'
  'twitter'
  'facebook'
  'whatsapp'
  'gplus'
  'reddit'
  'linkedin'
  'paper-plane'
]

module.exports = ->
  @Given /^I create a Share Button$/, ->
    @driver.get(@Helpers.fixture('basic'))

  @When /^I click the Share Button$/, ->
    new @Widgets.ShareButton().clickButton()

  @Then /^I should see all Social Networks$/, ->
    new @Widgets
      .ShareButtonNetworks()
      .each (item, index) ->
        item.isVisible().should.eventually.be.true
