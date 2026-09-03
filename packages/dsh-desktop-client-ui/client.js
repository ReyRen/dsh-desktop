window.__ModuleLoader__.load({
  id: 'dsh-desktop-client-ui',
  factory: (require) => {
    const module = { exports: {} }
    const exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })

    const React = require('react')
    const { FishLogo } = require('@deepseek-ai/dsh-client-ui-primitives')

    const BRAND_MARK_URL = '/dsh-desktop-brand-mark.png'
    const STYLE_ID = 'dsh-desktop-client-ui-style'

    function installStyles() {
      if (document.getElementById(STYLE_ID)) return
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.dataset.plugin = 'dsh-desktop-client-ui'
      style.textContent = `
        .dshDesktopBrandName{font-size:18px;font-weight:600;line-height:1;white-space:nowrap;color:currentColor}
        .dshDesktopBrandMark{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:24px;height:24px}
        .dshDesktopBrandMarkImage{width:100%;height:100%;object-fit:contain;display:block}
      `
      document.head.appendChild(style)
    }

    function DesktopBrandMark() {
      return React.createElement(
        'span',
        { className: 'dshDesktopBrandMark', 'aria-hidden': 'true' },
        React.createElement('img', {
          className: 'dshDesktopBrandMarkImage',
          src: BRAND_MARK_URL,
          alt: ''
        })
      )
    }

    function DesktopBrandName() {
      return React.createElement('span', { className: 'dshDesktopBrandName' }, '开明通智')
    }

    function ConversationBrandMark(props) {
      return React.createElement(FishLogo, props)
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
