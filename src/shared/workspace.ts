export type DesktopWorkspace = 'conversation' | 'business'

export interface DesktopWorkspaceState {
  active: DesktopWorkspace
  locale: 'en' | 'zh'
  dark: boolean
}

export function isDesktopWorkspace(value: unknown): value is DesktopWorkspace {
  return value === 'conversation' || value === 'business'
}
