window.__ModuleLoader__.load({
  id: 'dsh-desktop-client-ui',
  factory: (require) => {
    const module = { exports: {} }
    const exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    const React = require('react')

    const BRAND_LOCKUP_URL = '/dsh-desktop-brand-lockup.png'
    const BRAND_MARK_URL = '/dsh-desktop-brand-mark.png'
    const HERO_MARK_URL = '/zhishu-hero.webp'
    const HERO_LOOP_URL = '/zhishu-hero-loop.webp'
    const STYLE_ID = 'dsh-desktop-client-ui-style'

    function installStyles() {
      if (document.getElementById(STYLE_ID)) return
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.dataset.plugin = 'dsh-desktop-client-ui'
      style.textContent = `
        .dshDesktopBrandLockup{height:36px;width:auto;max-width:180px;object-fit:contain;display:block}
        .dshDesktopBrandMarkImage{width:24px;height:24px;object-fit:contain;display:block}
        .dshDesktopHeroBrand{display:inline-flex;align-items:center;gap:10px}
        .dshDesktopHeroBrandMark{height:32px;width:auto;object-fit:contain;display:block;animation:none!important;transform:none!important;cursor:pointer}
        .dshDesktopHeroBrandDot{width:8px;height:8px;border-radius:50%;background:#000;flex:none}
        body[data-ds-dark-theme] .dshDesktopHeroBrandDot{background:#fff}
        div:has(> span [data-slot="conversation.hero.brand.mark"]){grid-template-columns:auto auto auto!important;align-items:center!important}
        span:has(> span [data-slot="sidebar.brand.name"]){height:32px!important}
        span:has(+ span [data-slot="sidebar.brand.name"]){display:none!important}
      `
      document.head.appendChild(style)
    }

    function DesktopBrandMark() {
      return React.createElement('img', {
        className: 'dshDesktopBrandMarkImage',
        src: BRAND_MARK_URL,
        alt: '',
        'aria-hidden': 'true'
      })
    }

    function DesktopBrandName() {
      return React.createElement('img', {
        className: 'dshDesktopBrandLockup',
        src: BRAND_LOCKUP_URL,
        alt: '',
        'aria-hidden': 'true'
      })
    }

    function ConversationBrandMark() {
      const [src, setSrc] = React.useState(HERO_MARK_URL)
      return React.createElement(
        'span',
        { className: 'dshDesktopHeroBrand' },
        React.createElement('img', {
          className: 'dshDesktopHeroBrandMark',
          src,
          alt: '',
          'aria-hidden': 'true',
          onMouseEnter: () => setSrc(HERO_LOOP_URL + '?play=' + Date.now()),
          onMouseLeave: () => setSrc(HERO_MARK_URL)
        }),
        React.createElement('span', {
          className: 'dshDesktopHeroBrandDot',
          'aria-hidden': 'true'
        })
      )
    }

    const inject = ['slots']
    function apply(ctx) {
      installStyles()
      ctx.slots.inject('sidebar.brand.mark', () =>
        ctx.slots.inject('sidebar.brand.name', () =>
          ctx.slots.inject('conversation.hero.brand.mark', function* () {
            yield ctx.slots.register({ name: 'sidebar.brand.mark' }, DesktopBrandMark)
            yield ctx.slots.register({ name: 'sidebar.brand.name' }, DesktopBrandName)
            yield ctx.slots.register(
              { name: 'conversation.hero.brand.mark' },
              ConversationBrandMark
            )
          })
        )
      )
    }

    exports.apply = apply
    exports.inject = inject
    return module.exports
  }
})
