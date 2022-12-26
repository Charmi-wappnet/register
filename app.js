var express = require('express')
var app = express()
var session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const registrationRouter = require('./routes/registration_route');
var loginRouter = require('./routes/login_route');
var dashboardRouter = require('./routes/dashboard_route');
var logoutRouter = require('./routes/logout_route');
var emailRoute = require('./routes/emailRoute');
const path = require('path');
const db = require('mysql');
const morgan = require('morgan');
const nodemailer = require('nodemailer');

const { check, validationResult } = require('express-validator');
const connection = require('./server');
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.post('/', (req, res) => {
  res.json({ message: "Message Recieved" })
});

app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'))
app.use(express.json());


app.get('/', (req, res) => {
  res.render('home')
});

app.get('/save', (req, res) => {
  let sql = "SELECT * FROM registration";
  let query = connection.query(sql, (err, rows) => {
    console.log(rows);
    const registerUser = rows
    if (err) throw err;
    res.render('index', {
      register: registerUser,
      title: 'Crud Operation11',
      user: rows
    });
  });
});

app.get('/edit/:userID', (req, res) => {
  const userID = req.params.userID;
  console.log("userID")
  console.log(userID)
  let sql = `Select * from registration where id = ${userID}`;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.render('registration_edit', {
      title: "crud operation",
      user: results[0]
    });
  });
});

app.post('/update', (req, res) => {
  const userID = req.body.userID;
  let sql = "update registration SET first_name='" + req.body.first_name + "', last_name='" + req.body.last_name + "', password='" + req.body.password + "', email_address='" + req.body.email_address + "', gender='" + req.body.gender + "' where id =" + userID;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/save');
  });
});

app.get('/delete/:userID', (req, res) => {
  const userID = req.params.userID;
  console.log("userID")
  console.log(userID)
  let sql = 'DELETE from registration where id = $(userID)';
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect('/')
  });
});

app.post('/index', (req, res) => {
  let data = { first_name: req.body.first_name, last_name: req.body.last_name, password: req.body.password, email_address: req.body.email_address, gender: req.body.gender };
  let sql = "INSERT INTO registration SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('add');
  });
})


app.use(session({
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use('/', registrationRouter);
app.use('/', loginRouter);
app.use('/', dashboardRouter);
app.use('/', logoutRouter);
app.use('/', emailRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


app.get('/login', (req, res) => {
  res.render('/login')
});



module.exports = app;

/* var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; */