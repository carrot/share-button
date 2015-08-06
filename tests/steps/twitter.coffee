module.exports = ->
  @Given /^I create a Twitter Share Button$/, () ->
    @driver.visit("file:///#{process.cwd()}/tests/fixtures/twitter.html")

  @When /^I click the Twitter Share Button$/, () ->
    new @Widgets.ShareButton().click()

  @Then /^I should see the Twitter button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('twitter')
          .then (class1) ->
            return class1
          .then (class1) ->
            item.hasClass('enabled')
              .then (class2) ->
                return (class1 && class2)
      )
      .should.eventually.have.length(1)

  @When /^I click the Twitter button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('twitter')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a correct Twitter share url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('twitter')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eq('https://twitter.com/intent/tweet?text=twitter%20description&url=http%3A%2F%2Fwww.example.com')
