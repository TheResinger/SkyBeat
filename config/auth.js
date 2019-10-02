module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash("errorMsg", "Please login to view this page.");
    res.redirect("/login");
  }
};