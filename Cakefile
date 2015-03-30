require 'colors'

fs           = require 'fs'
path         = require 'path'
W            = require 'when'
nodefn       = require 'when/node/function'
accord       = require 'accord'
axis         = require 'axis'
autoprefixer = require 'autoprefixer-stylus'
monocle      = require 'monocle'
umd          = require 'umd'
stylus       = accord.load('stylus')

# tasks

build = ->
  W.all([build_normal(), build_minified()])
    .done((-> console.log 'done!'.green), ((err) -> console.error(err.stack)))

build_normal = ->
  (new Builder()).build(minify: false).then (res) ->
    nodefn.call(fs.writeFile, path.join(__dirname, 'build/share.js'), res)

build_minified = ->
  (new Builder()).build(minify: true).then (res) ->
    nodefn.call(fs.writeFile, path.join(__dirname, 'build/share.min.js'), res)

task 'build', 'build the plugin', ->
  process.stdout.write 'building... '.grey
  build()

task 'watch', 'rebuild on change in src folder', ->
  monocle().watchDirectory
    root: path.join(__dirname, 'src')
    complete: -> console.log 'watching src directory'.grey
    listener: ->
      process.stdout.write 'rebuilding... '.grey
      build()

# logic

class Builder
  constructor: ->
    @utils_js_path = path.join(__dirname, 'src/share_utils.coffee')
    @share_js_path = path.join(__dirname, 'src/share.coffee')
    @css_path = path.join(__dirname, 'src/styles.styl')

  build: (opts) ->
    @opts = opts || {}
    @compile_css().then(@compile_js.bind(@))

  compile_css: (opts) ->
    tokens = [
      "config.selector",
      "config.networks.pinterest.display",
      "config.networks.twitter.display",
      "config.networks.facebook.display",
      "config.networks.google_plus.display",
      "config.networks.email.display"
    ]

    stylus.renderFile(@css_path, { use: [axis()] })
      .then((res) ->
          accord.load('minify-css').render(res.result).then (res_min) ->
            return replace_tokens(res_min.result, tokens)
      ).then (css) ->
        "function getStyles(config){ return \"#{css}\"};"

  compile_js: (css) ->
    cs = accord.load('coffee-script')
    cs.renderFile(@utils_js_path, { bare: true })
      .then (utils_js) =>
        cs.renderFile(@share_js_path, { bare: true })
          .then (share_js) =>
            if @opts.minify
              accord.load('minify-js').render("#{utils_js.result}#{share_js.result}").then (js) ->
                "#{css}#{js.result}"
            else
              "#{css}#{utils_js.result}#{share_js.result}"
          .then (out) ->
            umd('Share', "#{out} return Share;")


  #
  # @api private
  #

  replace_tokens = (res, tokens) ->
    for token in tokens
      normalized_token = token.replace(/\./g, "-")
      res = res.replace(new RegExp(normalized_token, 'g'), "\"+#{token}+\"")

    return res
