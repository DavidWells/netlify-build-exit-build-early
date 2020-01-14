module.exports = function exitEarlyPlugin(config) {
  return {
    name: 'netlify-plugin-exit-build-early',
    onInit: async ({ utils }) => {
      const { git } = utils
      console.log('git', git)
      /* Do stuff if files modified */
      if (git.modifiedFiles.length) {
        console.log('Modified files:', git.modifiedFiles)
      }
      const htmlFiles = git.fileMatch('**/*.html')
      console.log('html files git info:', htmlFiles)

      if (!htmlFiles.edited) {
        console.log('>> EXIT BUILD BC HTML HAS NOT CHANGED\n')
        process.exit(1)
      }
    }
  }
}
