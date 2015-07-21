module.exports = ->
  @Given /^I create a Whatsapp Share Button$/, () ->
    @driver.get(@Helpers.fixture('whatsapp'))

  @When /^I click the Whatsapp Share Button$/, () ->
    new @Widgets.ShareButton().click()

  @Then /^I should see the Whatsapp button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('whatsapp')
          .then (class1) ->
            return class1
          .then (class1) ->
            item.hasClass('enabled')
              .then (class2) ->
                return (class1 && class2)
      )
      .should.eventually.have.length(1)

  @When /^I click the Whatsapp button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('whatsapp')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a correct Whatsapp share url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('whatsapp')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eq('whatsapp://send?text=whatsapp%20description%20http%3A%2F%2Fwww.example.com')
