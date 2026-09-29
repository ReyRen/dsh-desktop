import { contextBridge, ipcRenderer } from 'electron'
import type { DesktopWorkspace, DesktopWorkspaceState } from '../shared/workspace'

const api = Object.freeze({
  state: (): Promise<DesktopWorkspaceState> => ipcRenderer.invoke('workspace:get-state'),
  switchTo: (workspace: DesktopWorkspace): Promise<DesktopWorkspaceState> =>
    ipcRenderer.invoke('workspace:switch', workspace),
  onStateChanged: (listener: (state: DesktopWorkspaceState) => void): (() => void) => {
    const handler = (_event: Electron.IpcRendererEvent, state: DesktopWorkspaceState): void => {
      listener(state)
    }
    ipcRenderer.on('workspace:state-changed', handler)
    return () => ipcRenderer.removeListener('workspace:state-changed', handler)
  }
})

contextBridge.exposeInMainWorld('dshWorkspace', api)

export type DshWorkspaceApi = typeof api
