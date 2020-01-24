const { inspect } = require('util')

module.exports = function exitEarlyPlugin(config) {
  return {
    name: 'netlify-plugin-exit-build-early',
    onInit: async ({ utils }) => {
      const { git } = utils
      console.log('git utils')
      deepLog(git)

      /* Check if any files modified since last build */
      if (git.modifiedFiles.length) {
        console.log('Modified files:', git.modifiedFiles)
      }
      /* Check if any files created since last build */
      if (git.createdFiles.length) {
        console.log('Created files:', git.createdFiles)
      }

      /* Find all HTML files & check for git status */
      const htmlFiles = git.fileMatch('**/*.html')
      console.log('html files git info:', htmlFiles)

      /* Find all JS & check for git status */
      const jsFiles = git.fileMatch('**/*.js')
      console.log('js files git info:', jsFiles)

      /* No JS files added/deleted/changed, exit build early */
      if (!jsFiles.edited.length && !htmlFiles.edited.length) {
        console.log('No files we care about changed. Exit early')
        process.exit(0)
      }

      /* Files we care about changed. Continue with build */
      console.log('Continue build because HTML/JS files created, changed or deleted')
      console.log(htmlFiles.edited.concat(jsFiles.edited))
    }
  }
}

function deepLog(obj) {
  console.log(inspect(obj, {showHidden: false, depth: null}))
}
