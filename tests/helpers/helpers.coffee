path = require 'path'

module.exports = ->

  @Helpers = @Helpers || {}

  @Helpers.fixture = (name) ->
    fixtureBase = path.join("tests/fixtures", name)
    return "http://localhost:8000/" + fixtureBase + '.html'
