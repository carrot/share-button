$.fn.sharer = (opts) ->

  $(@).hide()

  # set up options
  opts ?= {}
  config = {}

  # basic
  config.url = opts.url || window.location.href
  config.text = opts.text || $('meta[name=description]').attr('content') || ''
  config.app_id = opts.app_id
  config.title = opts.title
  config.image = opts.image

  # ui
  config.button_color = opts.color || '#333'
  config.button_background = opts.background || '#e1e1e1'
  config.button_icon = opts.icon || 'export'

  # network-specific
  set_opt = (base,ext) -> if opts[base] then opts[base][ext] || config[ext] else config[ext]

  config.twitter_url = set_opt('twitter', 'url')
  config.twitter_text = set_opt('twitter', 'text')
  config.fb_url = set_opt('facebook', 'url')
  config.fb_title = set_opt('facebook', 'title')
  config.fb_text = set_opt('facebook', 'text')
  config.fb_image = set_opt('facebook', 'image')
  config.gplus_url = set_opt('gplus', 'url')

  # private
  config.selector = ".#{$(@).attr('class')}"

  # clean up passed in options if necessary
  clean_text = (k) -> k.replace(' ','%20')

  config.twitter_text = clean_text(config.twitter_text)
  config.app_id = config.app_id.toString() if typeof config.app_id == 'integer'

  # inject the css if necessary
  styles = "<meta name='sharer'><link rel='stylesheet' href='http://weloveiconfonts.com/api/?family=entypo'><link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Lato:900'><style>#{config.selector}{width:90px;height:20px;-webkit-user-select:none}#{config.selector} [class*=entypo-]:before{font-family:entypo,sans-serif}#{config.selector} label{opacity: .8;font-size:16px;cursor:pointer;-webkit-border-radius:5px;-moz-border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;border-radius:5px;background:#{config.button_background};color:#{config.button_color};-webkit-transition:all .3s ease;-moz-transition:all .3s ease;-o-transition:all .3s ease;-ms-transition:all .3s ease;transition:all .3s ease;margin:0;padding:5px 10px}#{config.selector} label:hover{opacity:1}#{config.selector} label span{text-transform:uppercase;font-size:.85em;font-family:Lato,sans-serif;font-weight:900;-webkit-font-smoothing:antialiased;padding-left:6px}#{config.selector} .social{-webkit-transform-origin:50% 0;-moz-transform-origin:50% 0;-o-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:scale(0) translateY(-190px);-moz-transform:scale(0) translateY(-190px);-o-transform:scale(0) translateY(-190px);-ms-transform:scale(0) translateY(-190px);transform:scale(0) translateY(-190px);-webkit-filter:alpha(opacity=0);-moz-filter:alpha(opacity=0);-o-filter:alpha(opacity=0);-ms-filter:alpha(opacity=0);filter:alpha(opacity=0);opacity:0;-webkit-transition:all .4s ease;-moz-transition:all .4s ease;-o-transition:all .4s ease;-ms-transition:all .4s ease;transition:all .4s ease;margin-left:-15px}#{config.selector} .social.active{-webkit-filter:alpha(opacity=100);-moz-filter:alpha(opacity=100);-o-filter:alpha(opacity=100);-ms-filter:alpha(opacity=100);filter:alpha(opacity=100);opacity:1;-webkit-transform:scale(1) translateY(-90px);-moz-transform:scale(1) translateY(-90px);-o-transform:scale(1) translateY(-90px);-ms-transform:scale(1) translateY(-90px);transform:scale(1) translateY(-90px);-webkit-transition:all .4s ease;-moz-transition:all .4s ease;-o-transition:all .4s ease;-ms-transition:all .4s ease;transition:all .4s ease;margin-left:-45px}#{config.selector} ul{position:relative;left:0;right:0;width:180px;height:46px;color:#fff;background:#3b5998;list-style:none;margin:auto;padding:0}#{config.selector} ul li{font-size:20px;cursor:pointer;width:60px;text-align:center;float:left;display:block;height:22px;-webkit-transition:all .3s ease;-moz-transition:all .3s ease;-o-transition:all .3s ease;-ms-transition:all .3s ease;transition:all .3s ease;margin:0;padding:12px 0}#{config.selector} ul li:hover{color:rgba(0,0,0,0.5)}#{config.selector} ul:after{content:'';display:block;width:0;height:0;position:absolute;left:0;right:0;border-left:20px solid transparent;border-right:20px solid transparent;border-top:20px solid #3b5998;margin:35px auto}#{config.selector} li[class*=twitter]{background:#6cdfea;padding:12px 0}#{config.selector} li[class*=gplus]{background:#e34429;padding:12px 0}</style>";
  $('head').append(styles)

  # inject the html
  $(@).html("<label class='entypo-#{config.button_icon}'><span>Share</span></label><div class='social'><ul><li class='entypo-twitter' data-network='twitter'></li><li class='entypo-facebook' data-network='facebook'></li><li class='entypo-gplus' data-network='gplus'></li></ul></div>")

  # set up facebook api if necessary
  if !window.FB && config.app_id
    $('body').append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='//connect.facebook.net/en_US/all.js#xfbml=1&appId=#{config.app_id}',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>")

  # share url config
  paths =
    twitter: "http://twitter.com/intent/tweet?text=#{config.twitter_text}&url=#{config.twitter_url}"
    facebook: "https://www.facebook.com/sharer/sharer.php?u=#{config.fb_url}"
    gplus: "https://plus.google.com/share?url=#{config.gplus_url}"

  # popup and share links

  toggle = (e) ->
    e.stopPropagation()
    $(@).parent().find('.social').toggleClass('active')

  open = ->
    $(@).parent().find('.social').addClass('active')

  close = ->
    $(@).parent().find('.social').removeClass('active')

  click_link = ->
    link = paths[$(@).data('network')]
    if ($(@).data('network') == 'facebook') && config.app_id
      window.FB.ui
        method: 'feed', 
        link: config.fb_url
        name: config.fb_title
        caption: config.fb_text
        picture: config.fb_image
    else
      window.open(link, 'targetWindow', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=350')
    return false

  $(@).find('label').on 'click', toggle
  $(@).find('li').on 'click', click_link

  $('body').on 'click', =>
    social = $(@).find('.social')
    social.removeClass('active') if social.hasClass('active')

  # hide some of the setup stuff
  setTimeout (=> $(@).show()), 250

  # return a little API
  return {
    toggle: toggle.bind(@)
    open: open.bind(@)
    close: close.bind(@)
    options: config
    self: @
  }