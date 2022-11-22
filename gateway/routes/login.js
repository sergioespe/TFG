const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');

const router = express.Router();
router.use(express.json());

router.post("/", async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err || !user) {
        return next(err || new Error( info?.message));
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: user.id, email: user.email, role: user.role };
        const token = jwt.sign({ user: body }, "changeme");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
