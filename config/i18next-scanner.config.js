module.exports = {
    input: ['/**/*.{js,jsx}'], // paths to your source files
    output: './', // path where the output JSON files will be placed
    options: {
      debug: true,
      func: {
        list: ['i18next.t', 'i18n.t'],
        extensions: ['.js', '.jsx']
      },
      lngs: ['en', 'ar'], // supported languages
      defaultLng: 'en',
      defaultNs: 'translation',
      defaultValue: '__STRING_NOT_TRANSLATED__',
      resource: {
        loadPath: 'public/locales/{{lng}}.json',
        savePath: 'public/locales/{{lng}}.json',
        jsonIndent: 2,
        lineEnding: '\n'
      }
    }
  };