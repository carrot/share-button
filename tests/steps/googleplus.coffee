module.exports = ->
  @Given /^I create a Google Plus Share Button$/, () ->
    @driver.get(@Helpers.fixture('googleplus'))

  @When /^I click the Google Plus Share Button$/, () ->
    new @Widgets.ShareButton().clickButton()

  @Then /^I should see the Google Plus button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('googlePlus')
          .then (class1) ->
            return class1
          .then (class1) ->
            item.hasClass('enabled')
              .then (class2) ->
                return (class1 && class2)
      )
      .should.eventually.have.length(1)

  @When /^I click the Google Plus button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('googlePlus')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a correct Google Plus share url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('googlePlus')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eq('https://plus.google.com/share?url=http%3A%2F%2Fwww.example.com%2F')
