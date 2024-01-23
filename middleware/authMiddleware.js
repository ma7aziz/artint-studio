// Check Authentication
const checkAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin');
}

const checkNotAuthenticated = function(req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return res.redirect('/admin/dashboard');
    }
    next();
}

exports.checkAuthenticated = checkAuthenticated;
exports.checkNotAuthenticated = checkNotAuthenticated;