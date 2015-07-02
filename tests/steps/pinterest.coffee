module.exports = ->
  @Given /^I create a Pinterest Share Button$/, () ->
    @driver.get(@Helpers.fixture('pinterest'))

  @When /^I click the Pinterest Share Button$/, () ->
    new @Widgets.ShareButton().clickButton()

  @Then /^I should see the Pinterest button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('pinterest')
          .then (class1) ->
            return class1
          .then (class1) ->
            item.hasClass('enabled')
              .then (class2) ->
                return (class1 && class2)
      )
      .should.eventually.have.length(1)

  @When /^I click the Pinterest button$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('pinterest')
      )
      .then (list) ->
        list[0].click('a')

  @Then /^I should have a correct Pinterest share url$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('pinterest')
      )
      .then (list) ->
        list[0].getAttribute(
          selector: 'a',
          attribute: 'href'
        ).should.eventually.eq('https://www.pinterest.com/pin/create/button?url=http%3A%2F%2Fwww.example.com&media=http%3A%2F%2Fcarrot.is%2Fimg%2Ffb-share.jpg&description=pinterest%20discription')
