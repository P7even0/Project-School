const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./model/models.js')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    async function getUserByEmail(email) {
      try {
        const user = await User.findOne({ email: email });
        return user;
      } catch (error)
      {
        console.error(error)
        return null
        
      }
    }
    const user = await getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
}

module.exports = initialize