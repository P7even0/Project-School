if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  const mongoose = require('mongoose')
  const User = require('./model/models.js')
  
  
  mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

  
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    async (email) => {
      try {
        const user = await User.findOne({ email: email });
        return user;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async (id) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );

  function allowUnauthenticated(req, res, next) {
    // Allow unauthenticated users to access any route
    return next();
  }
  
  
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  app.use('/public', express.static('public'))
  

  app.get('/', allowUnauthenticated, (req, res) => {
    res.render('index.ejs')
  });

  app.get('/dashboard', allowUnauthenticated, (req, res) => {
    res.render('dashboard.ejs')
  })

  
  app.get('/ide', allowUnauthenticated, (req, res) => {
    res.render('ide.ejs')
  });

  app.get('/text', allowUnauthenticated, (req, res) => {
    res.render('text.ejs')
  });

  app.get('/compile', allowUnauthenticated, (req, res) => {
    res.render('compile.ejs')
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (existingUser) {
        // If the email already exists, redirect to the registration page
        console.log('Email already exists in the database.');
        return res.redirect('/register');
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
  
      await newUser.save();
      console.log('User saved successfully.');
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.redirect('/register');
    }
  });
  

  app.get('/java', allowUnauthenticated, (req, res) => {
    res.render('java.ejs');
  })

  app.get('/python', allowUnauthenticated, (req, res) => {
    res.render('python.ejs');
  })

  app.get('/c', allowUnauthenticated, (req, res) => {
    res.render('c.ejs');
  })

  app.get('/error304', allowUnauthenticated, (req, res) => {
    res.render('error304.ejs');
  })



  
  app.delete('/logout', (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/login')
    }) 
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
  app.listen(3000)