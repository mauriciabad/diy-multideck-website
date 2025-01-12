import loader from '@monaco-editor/loader'

// Configure Monaco Editor loader
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs',
  },
  'vs/nls': {
    availableLanguages: {
      '*': '',
    },
  },
})

// Export the loader for use in other files
export { loader }
