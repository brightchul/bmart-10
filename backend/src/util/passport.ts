import dotenv from "dotenv";
import passport from "passport";
import passportJWT from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import userDAO from "../daos/user.dao";

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default function () {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (email: string, password: string, done: any) {
        const result = await userDAO.loginUser(email, password);
        if (!result) {
          return done(null, false);
        }
        return done(null, result);
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async function (jwtPayload, done) {
        const result = await userDAO.getUserByEmail(jwtPayload.email);
        return done(null, result);
      }
    )
  );
}
