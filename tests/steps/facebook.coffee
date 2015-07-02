module.exports = ->
  @Given /^I create a Facebook Share Button$/, () ->
    @driver.get(@Helpers.fixture('facebook'))

  @When /^I click the Facebook Share Button$/, () ->
    new @Widgets.ShareButton().clickButton()

  @Then /^I should see the Facebook button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.getAttribute('style')
          .then (style) ->
            style.indexOf('display: block;') >= 0
          .then (itemStyle) ->
            item.hasClass('facebook')
              .then (itemClass) ->
                return itemStyle && itemClass
      )
      .should.eventually.have.length(1)

  @When /^I click the Facebook button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('facebook')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a correct Facebook share url$/, () ->
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
