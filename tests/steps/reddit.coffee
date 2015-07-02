module.exports = ->
  @Given /^I create a Reddit Share Button$/, () ->
    @driver.get(@Helpers.fixture('reddit'))

  @When /^I click the Reddit Share Button$/, () ->
    new @Widgets.ShareButton().clickButton()

  @Then /^I should see the Reddit button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.getAttribute('style')
          .then (style) ->
            style.indexOf('display: block;') >= 0
          .then (itemStyle) ->
            item.hasClass('reddit')
              .then (itemClass) ->
                return itemStyle && itemClass
      )
      .should.eventually.have.length(1)

  @When /^I click the Reddit button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('reddit')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a correct Reddit share url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('reddit')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eq('http://www.reddit.com/submit?url=http%3A%2F%2Fwww.example.com&title=reddit%20title')
