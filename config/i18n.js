// config/i18n.js
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const i18nextMiddleware = require('i18next-http-middleware');


module.exports = (app) => {
    i18next
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init({
            backend: {
                loadPath: __dirname + '/../locales/{{lng}}.json'
            },
            detection: {
                order: ['querystring', 'cookie'],
                caches: ['cookie']
              },
            // lang: 'ar',
            // cookie: 'lang',
            preload: [ 'ar' , 'en'],
            fallbackLng: 'ar',
            saveMissing: true,

            
        });

    app.use(i18nextMiddleware.handle(i18next));
};

