module.exports = ->
  @Given /^I create a Facebook Share Button with SDK enabled$/, () ->
    @driver.visit("http://localhost:8000/tests/fixtures/facebook.html")

  @Given /^I create a Facebook Share Button with SDK disabled$/, () ->
    @driver.visit("http://localhost:8000/tests/fixtures/facebook_no_sdk.html")

  @When /^I click the Facebook Share Button$/, () ->
    new @Widgets.ShareButton().click()

  @Then /^I should see the Facebook button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('facebook')
          .then (class1) ->
            return class1
          .then (class1) ->
            item.hasClass('enabled')
              .then (class2) ->
                return (class1 && class2)
      )
      .should.eventually.have.length(1)

  @When /^the FB SDK is not loaded$/, () ->
    # Simulate FB didn't load.
    new @Widgets.ShareButton().removeFacebookSDK()

  @When /^I click the Facebook button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('facebook')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a PHP Facebook share url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('facebook')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eq('https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.example.com')

  @Then /^I should have no url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('facebook')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eq(null)
