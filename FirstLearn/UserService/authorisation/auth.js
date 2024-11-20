const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
exports.authorize = (req, res, next) => {
    
    try {
    let token = req.cookies.token;
    if (!token) throw new Error("Login first");
      const verified = jwt.verify(token, 'SECURE');
      req.user = verified; // Attach verified payload to request
      next();
    } catch (err) {
      res.status(401).send({'Unauthorise':'Not Token provided','message':err.message});
    }
  };