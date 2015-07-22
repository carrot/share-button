module.exports = ->
  @Given /^I create an Email Share Button$/, () ->
    @driver.get(@Helpers.fixture('email'))

  @When /^I click the Email Share Button$/, () ->
    new @Widgets.ShareButton().click()

  @Then /^I should see the Email button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('email')
          .then (class1) ->
            return class1
          .then (class1) ->
            item.hasClass('enabled')
              .then (class2) ->
                return (class1 && class2)
      )
      .should.eventually.have.length(1)

  @When /^I click the Email button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('email')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a correct Email share url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('email')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eql('mailto:?subject=email%20title&body=email%20description')
