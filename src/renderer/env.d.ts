/// <reference types="vite/client" />

import type { DshWorkspaceApi } from '../preload/workspace-business'

declare global {
  interface Window {
    dshWorkspace: DshWorkspaceApi
  }
}

export {}
