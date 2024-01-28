const langCookieMiddleware = (req, res, next) => {
    // Get the 'lang' cookie value from the request
    const langCookieValue = req.cookies.i18next || 'ar'; // Default to 'ar' if the cookie is not set

    // Make the 'lang' cookie value available globally
    res.locals.langCookieValue = langCookieValue;

    next();
};

module.exports = langCookieMiddleware;