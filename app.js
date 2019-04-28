const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const Knex = require("knex");

const knex = Knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "managers_debts",
    password: "managers_debts",
    database: "managers_debts"
  }
});

const store = new KnexSessionStore({
  knex: knex,
  tablename: "sessions" // optional. Defaults to 'sessions',
  // createtable: false
});

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const managersRouter = require("./routes/manager");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);

app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: store
  })
);

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/manager", managersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
