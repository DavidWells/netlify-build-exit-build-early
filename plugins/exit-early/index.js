const { inspect } = require('util')

function deepLog(obj) {
  console.log(inspect(obj, {showHidden: false, depth: null}))
}

module.exports = function exitEarlyPlugin(config) {
  return {
    name: 'netlify-plugin-exit-build-early',
    onInit: async ({ utils }) => {
      console.log('utils')
      deepLog(utils)

      const { git, run } = utils

      run.command('echo "hi"')

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

      // Find all js files git status
      const jsFiles = git.fileMatch('**/*.js')
      console.log('js files git info:', jsFiles)

      // No JS files added/deleted/changed
      if (!jsFiles.edited.length && !htmlFiles.edited.length) {
        console.log('No files we care about changed. Exit early')
        process.exit(0)
      }
      console.log('Continue build because HTML/JS files created, changed or deleted')
      console.log(htmlFiles.edited.concat(jsFiles.edited))
    }
  }
}
