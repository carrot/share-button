hrefs = [
  'https://www.pinterest.com/pin/create/button?url=http%3A%2F%2Flocalhost%3A8000%2Ftests%2Ffixtures%2Fmeta.html&media=http%3A%2F%2Fcarrot.is%2Fimg%2Ffb-share.jpg&description=test%20description'
  'https://twitter.com/intent/tweet?text=test%20description&url=http%3A%2F%2Flocalhost%3A8000%2Ftests%2Ffixtures%2Fmeta.html'
  'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8000%2Ftests%2Ffixtures%2Fmeta.html'
  'whatsapp://send?text=test%20description%20http%3A%2F%2Flocalhost%3A8000%2Ftests%2Ffixtures%2Fmeta.html'
  'https://plus.google.com/share?url=http%3A%2F%2Flocalhost%3A8000%2Ftests%2Ffixtures%2Fmeta.html'
  'http://www.reddit.com/submit?url=http%3A%2F%2Flocalhost%3A8000%2Ftests%2Ffixtures%2Fmeta.html&title=test%20title'
  'https://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Flocalhost%3A8000%2Ftests%2Ffixtures%2Fmeta.html&title=test%20title&summary=test%20description'
  'mailto:?subject=test%20title&body=test%20description'
]

module.exports = ->
  @Given /^I create and click a meta tag Share Button$/, () ->
    @driver.visit("file:///#{process.cwd()}/tests/fixtures/meta.html")
    new @Widgets.ShareButton().click()

  @When /^I click all the network buttons$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .each (item, index) ->
        unless (item.hasClass('whatsapp').then (tf) -> return tf)
          item.click('a')

  @Then /^All buttons should have valid URLs$/, () ->
    new @Widgets
      .ShareButtonNetworks()
      .each (item, index) ->
        unless (item.hasClass('whatsapp').then (tf) -> return tf)
          item.getAttribute(
            selector: 'a',
            attribute: 'href'
          ).should.eventually.eq(hrefs[index])
