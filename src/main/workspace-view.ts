import type { Rectangle } from 'electron'

interface ContentSize {
  width: number
  height: number
}

export function workspaceContentBounds(contentSize: ContentSize): Rectangle {
  return {
    x: 0,
    y: 0,
    width: Math.max(0, Math.floor(contentSize.width)),
    height: Math.max(0, Math.floor(contentSize.height))
  }
}
