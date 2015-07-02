module.exports = ->
  @Given /^I create a Twitter Share Button$/, () ->
    @driver.get(@Helpers.fixture('twitter'))

  @When /^I click the Twitter Share Button$/, () ->
    new @Widgets.ShareButton().clickButton()

  @Then /^I should see the Twitter button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.getAttribute('style')
          .then (style) ->
            style.indexOf('display: block;') >= 0
          .then (itemStyle) ->
            item.hasClass('twitter')
              .then (itemClass) ->
                return itemStyle && itemClass
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
