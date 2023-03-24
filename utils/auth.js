const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.direct('/login');
    } else {
        next();
    
    }
}
module.exports = withAuth;