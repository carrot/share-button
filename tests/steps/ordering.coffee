module.exports = ->
  @Given /^I create a network ordering Share Button$/, () ->
    @driver.visit("file:///#{process.cwd()}/tests/fixtures/ordering.html")

  @When /^I click the network ordering Share Button$/, () ->
    new @Widgets.ShareButton().click()

  @Then /^I should see the correct number of networks$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('enabled')
      )
      .should.eventually.have.length(3)

  @Then /^They should be in the correct order$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .filter( (item) ->
        item.hasClass('enabled')
      )
      .then (list) ->
        list[0].hasClass('facebook').should.eventually.be.true
        list[1].hasClass('googlePlus').should.eventually.be.true
        list[2].hasClass('twitter').should.eventually.be.true
