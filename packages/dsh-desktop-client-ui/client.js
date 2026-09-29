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
        .dshDesktopWorkspaceBrand{position:relative;display:flex;align-items:center;gap:8px;height:36px;min-width:0;overflow:visible}
        .dshDesktopBrandLockup{height:36px;width:auto;max-width:180px;object-fit:contain;display:block;flex:none}
        .dshDesktopWorkspaceDot{width:5px;height:5px;border-radius:50%;background:var(--dsw-alias-label-secondary,#59606a);flex:none}
        .dshDesktopWorkspaceTrigger{appearance:none;min-width:0;height:30px;display:inline-flex;align-items:center;gap:2px;padding:0 3px;color:var(--dsw-alias-label-primary,#202124);background:transparent;border:0;border-radius:7px;font:600 14px/20px -apple-system,BlinkMacSystemFont,"Segoe UI","Microsoft YaHei",sans-serif;white-space:nowrap;cursor:pointer}
        .dshDesktopWorkspaceTrigger:hover,.dshDesktopWorkspaceTrigger[aria-expanded="true"]{background:var(--dsw-alias-fill-hover,rgba(32,33,36,.08))}
        .dshDesktopWorkspaceChevron{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;transition:transform .12s ease}
        .dshDesktopWorkspaceTrigger[aria-expanded="true"] .dshDesktopWorkspaceChevron{transform:rotate(180deg)}
        .dshDesktopWorkspaceMenu{position:absolute;z-index:2147483645;top:38px;left:0;width:248px;padding:7px;background:var(--dsw-alias-bg-base,#fff);border:1px solid var(--dsw-alias-border-light,rgba(32,33,36,.12));border-radius:13px;box-shadow:0 14px 38px rgba(0,0,0,.2)}
        .dshDesktopWorkspaceOption{appearance:none;width:100%;min-height:58px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;color:var(--dsw-alias-label-primary,#202124);background:transparent;border:0;border-radius:9px;text-align:left;cursor:pointer}
        .dshDesktopWorkspaceOption:hover,.dshDesktopWorkspaceOption[data-active="true"]{background:var(--dsw-alias-fill-hover,rgba(32,33,36,.08))}
        .dshDesktopWorkspaceCopy{min-width:0;display:flex;flex-direction:column;gap:2px}
        .dshDesktopWorkspaceCopy strong{font-size:14px;line-height:20px;font-weight:600}
        .dshDesktopWorkspaceCopy small{color:var(--dsw-alias-label-secondary,#737982);font-size:12px;line-height:17px;white-space:nowrap}
        .dshDesktopWorkspaceCheck{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;flex:none}
        .dshDesktopBrandMarkImage{width:24px;height:24px;object-fit:contain;display:block}
        .dshDesktopHeroBrand{display:inline-flex;align-items:center;gap:10px}
        .dshDesktopHeroBrandMark{height:32px;width:auto;object-fit:contain;display:block;animation:none!important;transform:none!important;cursor:pointer}
        .dshDesktopHeroBrandDot{width:8px;height:8px;border-radius:50%;background:#000;flex:none}
        body[data-ds-dark-theme] .dshDesktopHeroBrandDot{background:#fff}
        div:has(> span [data-slot="conversation.hero.brand.mark"]){grid-template-columns:auto auto auto!important;align-items:center!important}
        div:has([data-slot="sidebar.brand.name"]){overflow:visible!important}
        span:has(> span [data-slot="sidebar.brand.mark"]){height:36px!important;overflow:visible!important;align-items:center!important}
        span:has(> span [data-slot="sidebar.brand.name"]){height:36px!important;overflow:visible!important}
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
      const api = window.dshWorkspace
      const locale = navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
      const [state, setState] = React.useState({
        active: 'conversation',
        locale
      })
      const [open, setOpen] = React.useState(false)

      React.useEffect(() => {
        if (!api) return undefined
        let mounted = true
        api.state().then((next) => {
          if (mounted) setState(next)
        }).catch(() => undefined)
        const unsubscribe = api.onStateChanged((next) => {
          if (mounted) setState(next)
        })
        return () => {
          mounted = false
          unsubscribe()
        }
      }, [api])

      const zh = state.locale === 'zh'
      const activeLabel = state.active === 'business'
        ? (zh ? '业务' : 'Business')
        : (zh ? '会话' : 'Conversation')
      const chevron = React.createElement(
        'svg',
        { className: 'dshDesktopWorkspaceChevron', viewBox: '0 0 16 16', 'aria-hidden': 'true' },
        React.createElement('path', { d: 'm4.5 6 3.5 3.5L11.5 6' })
      )

      const option = (workspace, title, description) =>
        React.createElement(
          'button',
          {
            key: workspace,
            type: 'button',
            role: 'menuitemradio',
            'aria-checked': state.active === workspace,
            className: 'dshDesktopWorkspaceOption',
            'data-active': state.active === workspace ? 'true' : 'false',
            onClick: (event) => {
              event.stopPropagation()
              setOpen(false)
              if (api) {
                api.switchTo(workspace).then(setState).catch((error) => {
                  console.error('[workspace] unable to switch workspace', error)
                })
              }
            }
          },
          React.createElement(
            'span',
            { className: 'dshDesktopWorkspaceCopy' },
            React.createElement('strong', null, title),
            React.createElement('small', null, description)
          ),
          state.active === workspace
            ? React.createElement(
              'svg',
              { className: 'dshDesktopWorkspaceCheck', viewBox: '0 0 16 16', 'aria-hidden': 'true' },
              React.createElement('path', { d: 'm3 8.5 3 3 7-7' })
            )
            : null
        )

      return React.createElement(
        'span',
        {
          className: 'dshDesktopWorkspaceBrand',
          onClick: (event) => event.stopPropagation(),
          onKeyDown: (event) => {
            if (event.key === 'Escape') setOpen(false)
          },
          onBlur: (event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
          }
        },
        React.createElement('img', {
          className: 'dshDesktopBrandLockup',
          src: BRAND_LOCKUP_URL,
          alt: zh ? '智枢' : 'ZhiShu'
        }),
        React.createElement('span', {
          className: 'dshDesktopWorkspaceDot',
          'aria-hidden': 'true'
        }),
        React.createElement(
          'button',
          {
            className: 'dshDesktopWorkspaceTrigger',
            type: 'button',
            'aria-haspopup': 'menu',
            'aria-expanded': open,
            onClick: (event) => {
              event.stopPropagation()
              setOpen(!open)
            }
          },
          React.createElement('span', null, activeLabel),
          chevron
        ),
        open
          ? React.createElement(
            'span',
            {
              className: 'dshDesktopWorkspaceMenu',
              role: 'menu',
              'aria-label': zh ? '切换工作空间' : 'Switch workspace'
            },
            option(
              'conversation',
              zh ? '会话' : 'Conversation',
              zh ? '创建、学习和探索' : 'Create, learn and explore'
            ),
            option(
              'business',
              zh ? '业务' : 'Business',
              zh ? '模型、训练和评测' : 'Models, training and evaluation'
            )
          )
          : null
      )
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
