const jwt = require('jwt-simple');

class AuthMiddleware {
  static authenticate(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'No token provided'
        });
      }

      try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  static authorize(roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden'
        });
      }

      next();
    };
  }
}

module.exports = AuthMiddleware;
