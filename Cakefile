require 'colors'
fs = require 'fs'
path = require 'path'
transformers = require 'transformers'
stylus = require 'stylus'
axis = require 'axis-css'
uuid = require 'node-uuid'
monocle = require 'monocle'
W = require 'when'
nodefn = require 'when/node/function'

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
    deferred = W.defer()

    tokens = set_tokens(['selector', 'button_color', 'button_background'])
    meta_tag = "<meta name='sharer'>"
    icons = "<link rel='stylesheet' href='http://weloveiconfonts.com/api/?family=entypo'>"
    fonts = "<link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Lato:900'>"

    fn_wrapper = (c) -> "function getStyles(config){ return \"#{c}\"};"
    style_wrapper = (c) =>
      c = transformers['uglify-css'].renderSync(c)
      "<style>#{replace_tokens(c, tokens)}</style>"

    stylus(fs.readFileSync(@css_path, 'utf8'))
      .use(define_tokens(tokens))
      .use(axis())
      .render (err, css) =>
        if err then return console.error(err)
        if css then deferred.resolve(fn_wrapper("#{meta_tag}#{icons}#{fonts}#{style_wrapper(css)}"))

    return deferred.promise

  compile_js: (css) ->
    js = transformers['coffee-script'].renderFileSync(@js_path, { bare: true })
    if @opts.minify then js = transformers['uglify-js'].renderSync(js)
    return "!function(){#{css}#{js}}.call(this)"

  # 
  # @api private
  # 
  
  set_tokens = (arr) ->
    arr.reduce (m,v) ->
      m[v] = uuid.v1()
      m
    , {}

  replace_tokens = (res, tokens) ->
    for k, v of tokens
      res = res.replace(new RegExp(v, 'g'), "\"+config.#{k}+\"")
    return res

  define_tokens = (tokens) ->
    return (style) -> style.define(k, v) for k, v of tokens
