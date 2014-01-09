require 'colors'
fs = require 'fs'
path = require 'path'
W = require 'when'
nodefn = require 'when/node/function'
accord = require 'accord'
stylus = accord.load('stylus')
axis = require 'axis-css'
autoprefixer = require 'autoprefixer-stylus'
uuid = require 'node-uuid'
monocle = require 'monocle'

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
    @js_path = path.join(__dirname, 'src/share.coffee')
    @css_path = path.join(__dirname, 'src/styles.styl')

  build: (opts) ->
    @opts = opts || {}
    @compile_css().then(@compile_js.bind(@))

  compile_css: (opts) ->
    tokens = set_tokens(['selector', 'button_color', 'button_background'])
    meta_tag = "<meta name='sharer'>"
    icons = "<link rel='stylesheet' href='http://weloveiconfonts.com/api/?family=entypo'>"
    fonts = "<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Lato:900'>"

    fn_wrapper = (c) -> "function getStyles(config){ return \"#{c}\"};"

    stylus.renderFile(@css_path, { use: [define_tokens(tokens), axis(), autoprefixer()] })
      .then((css) ->
          accord.load('minify-css').render(css).then (css) ->
            return "<style>#{replace_tokens(css, tokens)}</style>"
      ).then (css) ->
        "function getStyles(config){ return \"#{meta_tag}#{icons}#{fonts}#{css}\"};"

  compile_js: (css) ->
    accord.load('coffee-script').renderFile(@js_path, { bare: true })
      .then (js) =>
        if @opts.minify
          accord.load('minify-js').render(js).then (js) ->
            "!function(){#{css}#{js}}.call(this)"
        else
          return "!function(){#{css}#{js}}.call(this)"

  # 
  # @api private
  # 
  
  set_tokens = (arr) ->
    arr.reduce(((m,v) -> m[v] = uuid.v1(); m), {})

  replace_tokens = (res, tokens) ->
    for k, v of tokens
      res = res.replace(new RegExp(v, 'g'), "\"+config.#{k}+\"")
    return res

  define_tokens = (tokens) ->
    return (style) -> style.define(k, v) for k, v of tokens
