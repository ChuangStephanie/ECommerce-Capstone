function requireUser(req, res, next) {
    console.log(req.user)
    if (!req.user) {
      res.status(401);
      next({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
    next()
  }

  function requireAdmin(req, res, next) {
    if (req.user && !req.user.isadmin) {
      res.status(403);
      next({
        name: "UnauthorizedError",
        message: "You are not authorized to perform this action"
      });
    }  
    else if (req.user.isadmin) {
    next();
    }
  }
  
  module.exports = {
    requireUser, requireAdmin
  }