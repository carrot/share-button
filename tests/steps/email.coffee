module.exports = ->
  @Given /^I create an Email Share Button$/, () ->
    @driver.get(@Helpers.fixture('email'))

  @When /^I click the Email Share Button$/, () ->
    new @Widgets.ShareButton().clickButton()

  @Then /^I should see the Email button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.getAttribute('style')
          .then (style) ->
            style.indexOf('display: block;') >= 0
          .then (itemStyle) ->
            item.hasClass('paper-plane')
              .then (itemClass) ->
                return itemStyle && itemClass
      )
      .should.eventually.have.length(1)

  @When /^I click the Email button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('paper-plane')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a correct Email share url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('paper-plane')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eq('mailto:?subject=email%20title&body=email%20description')
