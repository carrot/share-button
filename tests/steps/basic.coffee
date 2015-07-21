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
  @Given /^I create a basic Share Button$/, ->
    @driver.get(@Helpers.fixture('basic'))

  @When /^I click the Share Button$/, ->
    new @Widgets.ShareButton().click()

  @Then /^I should see all Social Networks$/, ->
    new @Widgets
      .ShareButtonNetworks()
      .each (item, i) ->
        unless (item.hasClass('whatsapp').then (tf) -> tf)
          item.isVisible().should.eventually.eql(true)
