const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const localStrategy = require("passport-local").Strategy;

const db = require("db");

passport.use(
  new localStrategy(async (email, password, done) => {
    try {
      const user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      // TODO: cifrar password
      const validate = user.password === password;

      if (!validate) {
        return done(null, false, { message: "Wrong Password" });
      }

      return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: req => {
        console.log(req.headers)
        return req.headers.authorization
      },
      secretOrKey: "changeme", // TODO: Traer de variable de entorno
    },
    async function (jwt_payload, done) {
      console.log(jwt_payload);
      try {
        const user = await db.user.findUnique({
          where: { id: jwt_payload.user.id },
        });
        if (user && !user.removed) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
