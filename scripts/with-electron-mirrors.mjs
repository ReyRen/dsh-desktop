import { spawn } from 'node:child_process'

process.env.ELECTRON_MIRROR ||= 'https://npmmirror.com/mirrors/electron/'
process.env.ELECTRON_BUILDER_BINARIES_MIRROR ||=
  'https://npmmirror.com/mirrors/electron-builder-binaries/'

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Usage: node scripts/with-electron-mirrors.mjs <command> [...args]')
  process.exit(2)
}

const child = spawn(args[0], args.slice(1), {
  stdio: 'inherit',
  shell: true,
  env: process.env
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 1)
})
