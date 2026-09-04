const packageJson = require('./package.json')

module.exports = {
  ...packageJson.build,
  appId: 'io.zhishu.desktop.dev',
  productName: 'ZhiShu Desktop Dev',
  directories: {
    ...packageJson.build.directories,
    output: 'dist-dev'
  },
  extraMetadata: {
    name: 'zhishu-desktop-dev',
    productName: 'ZhiShu Desktop Dev',
    dshDesktopChannel: 'development'
  },
  artifactName: 'zhishu-desktop-dev-${os}-${arch}.${ext}',
  nsis: {
    ...packageJson.build.nsis,
    artifactName: 'zhishu-desktop-dev-windows-${arch}-setup.${ext}'
  },
  publish: null
}
