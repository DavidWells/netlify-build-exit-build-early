module.exports = function exitEarlyPlugin(config) {
  return {
    name: 'netlify-plugin-exit-build-early',
    onInit: async ({ utils }) => {
      console.log('utils')
      console.log(require('util').inspect(utils, {showHidden: false, depth: null}))
      const { git, run } = utils

      run('echo "hi"')

      /* Do stuff if files modified */
      if (git.modifiedFiles.length) {
        console.log('Modified files:', git.modifiedFiles)
      }
      if (git.createdFiles.length) {
        console.log('Created files:', git.createdFiles)
      }
      // Find all html files git status
      const htmlFiles = git.fileMatch('**/*.html')
      console.log('html files git info:', htmlFiles)

      // Find all html files git status
      const jsFiles = git.fileMatch('**/*.js')
      console.log('js files git info:', jsFiles)

      // if (!htmlFiles.edited) {
      //   console.log('>> EXIT BUILD BC HTML HAS NOT CHANGED\n')
      //   process.exit(1)
      // }
      // console.log('Continue build because HTML files created or changed', htmlFiles.getKeyedPaths())
    }
  }
}
