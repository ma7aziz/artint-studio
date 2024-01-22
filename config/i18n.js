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
            cookie: 'lang',
            lang: 'ar',
            fallbackLng: 'ar',
            preload: ['en', 'ar'],
            
        });

    app.use(i18nextMiddleware.handle(i18next));
};
