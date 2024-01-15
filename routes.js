

// Route to change language and set the cookie
app.get('/language/:lang', (req, res) => {
    const newLang = req.params.lang;
    const refererUrl = req.get('Referer'); // Get the current URL  
    res.cookie('lang', newLang);
    res.redirect(refererUrl||'/');
});