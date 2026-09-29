import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { workspaceContentBounds } from '../src/main/workspace-view'
import { isDesktopWorkspace } from '../src/shared/workspace'

describe('desktop workspaces', () => {
  it('keeps both workspace identifiers on a fixed allowlist', () => {
    expect(isDesktopWorkspace('conversation')).toBe(true)
    expect(isDesktopWorkspace('business')).toBe(true)
    expect(isDesktopWorkspace('settings')).toBe(false)
  })

  it('fills the window with business content', () => {
    expect(workspaceContentBounds({ width: 1380, height: 900 })).toEqual({
      x: 0,
      y: 0,
      width: 1380,
      height: 900
    })
  })

  it('uses native workspace sidebars without a pointer-blocking shell overlay', async () => {
    const vite = await readFile('electron.vite.config.ts', 'utf8')
    const main = await readFile('src/main/index.ts', 'utf8')
    const preload = await readFile('src/preload/workspace-business.ts', 'utf8')
    const harnessPreload = await readFile('src/preload/index.ts', 'utf8')
    const client = await readFile('packages/dsh-desktop-client-ui/client.js', 'utf8')

    expect(vite).toContain("business: resolve('src/renderer/business/index.html')")
    expect(vite).not.toContain("shell: resolve('src/renderer/shell/index.html')")
    expect(main).toContain("partition: 'persist:dsh-business'")
    expect(main).not.toContain('workspaceShellView')
    expect(main).toContain('contextIsolation: true')
    expect(main).toContain('nodeIntegration: false')
    expect(preload).toContain("contextBridge.exposeInMainWorld('dshWorkspace'")
    expect(harnessPreload).toContain("'dshWorkspace'")
    expect(preload).toContain("ipcRenderer.invoke('workspace:switch'")
    expect(client).toContain('dshDesktopWorkspaceTrigger')
    expect(client).toContain('sidebar.brand.name')
    expect(client).toContain('height:36px;width:auto;max-width:180px')
  })

  it('gives the business sidebar the same collapse control as Harness', async () => {
    const view = await readFile('src/renderer/business/views/HomeView.vue', 'utf8')
    const styles = await readFile('src/renderer/business/styles.css', 'utf8')

    expect(view).toContain('class="sidebar-toggle"')
    expect(view).toContain("toggleSidebar")
    expect(view).toContain('dsh-desktop-business-sidebar-collapsed')
    expect(styles).toContain('--sidebar-width: 56px')
    expect(styles).toContain('.business-layout.collapsed .sidebar-toggle:hover .rail-mark')
    expect(styles).toContain('height: 36px')
    expect(styles).toContain('max-width: 180px')
  })

  it('propagates the Harness theme into the isolated business renderer', async () => {
    const main = await readFile('src/main/index.ts', 'utf8')
    const switcher = await readFile(
      'src/renderer/business/components/WorkspaceSwitcher.vue',
      'utf8'
    )
    const styles = await readFile('src/renderer/business/styles.css', 'utf8')

    expect(main).toContain("businessWorkspaceView.setBackgroundColor(isDark ? '#151517'")
    expect(switcher).toContain("document.documentElement.dataset.theme = dark ? 'dark' : 'light'")
    expect(styles).toContain(':root[data-theme="dark"]')
    expect(styles).toContain('--biz-bg: #151517')
  })
})
