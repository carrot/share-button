$.fn.share = (opts) ->
  if $(@).length is 0
    console.log "Share Button: No elements found."
    return

  $(@).hide()

  # set up options
  opts ?= {}
  config = {}

  # basic
  config.url    = opts.url || window.location.href
  config.text   = opts.text || $('meta[name=description]').attr('content') || ''
  config.app_id = opts.app_id
  config.title  = opts.title
  config.image  = opts.image

  # ui
  config.button_color      = opts.color || '#333'
  config.button_background = opts.background || '#e1e1e1'
  config.button_icon       = opts.icon || 'export'
  config.button_text       = opts.button_text || 'Share'

  # network-specific
  set_opt = (base,ext) -> if opts[base] then opts[base][ext] || config[ext] else config[ext]

  config.twitter_url  = set_opt('twitter', 'url')
  config.twitter_text = set_opt('twitter', 'text')
  config.fb_url       = set_opt('facebook', 'url')
  config.fb_title     = set_opt('facebook', 'title')
  config.fb_caption   = set_opt('facebook', 'caption')
  config.fb_text      = set_opt('facebook', 'text')
  config.fb_image     = set_opt('facebook', 'image')
  config.gplus_url    = set_opt('gplus', 'url')

  # private
  config.selector = ".#{$(@).attr('class').split(" ").join(".")}"

  # correct common errors
  config.twitter_text = encodeURIComponent(config.twitter_text)
  config.app_id = config.app_id.toString() if typeof config.app_id == 'integer'

  # inject the css if necessary
  $('head').append(getStyles(config)) unless $('meta[name=sharer]').length

  # inject the html
  $(@).html("<label class='entypo-#{config.button_icon}'><span>#{config.button_text}</span></label><div class='social'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>")

  # set up facebook api if necessary
  if !window.FB && config.app_id
    $('body').append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='//connect.facebook.net/en_US/all.js#xfbml=1&appId=#{config.app_id}',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>")

  # share url config
  paths =
    twitter: "http://twitter.com/intent/tweet?text=#{config.twitter_text}&url=#{config.twitter_url}"
    facebook: "https://www.facebook.com/sharer/sharer.php?u=#{config.fb_url}"
    gplus: "https://plus.google.com/share?url=#{config.gplus_url}"

  # popup and share links

  bubble = $(@).parent().find('.social')

  toggle = (e) ->
    e.stopPropagation()
    bubble.toggleClass('active')

  open = -> bubble.addClass('active')

  close = -> bubble.removeClass('active')

  click_link = ->
    link = paths[$(@).data('network')]
    if ($(@).data('network') == 'facebook') && config.app_id
      window.FB.ui
        method: 'feed',
        name: config.fb_title
        link: config.fb_url
        picture: config.fb_image
        caption: config.fb_caption
        description: config.fb_text
    else
      window.open(link, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=350')
    return false

  $(@).find('label').on 'click', toggle
  $(@).find('li').on 'click', click_link

  $('body').on 'click', ->
    bubble.removeClass('active') if bubble.hasClass('active')

  setTimeout (=> $(@).show()), 250

  # return a little API
  return {
    toggle: toggle.bind(@)
    open: open.bind(@)
    close: close.bind(@)
    options: config
    self: @
  }
