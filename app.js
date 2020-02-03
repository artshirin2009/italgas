require('dotenv').config()
const express = require('express');
const path = require('path');
var hbs = require("express-handlebars");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const app = express();
const http = require('http');
const port = process.env.PORT;


app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const server = http.createServer(app);

server.listen(port, ()=>{
  console.log('server is listening on port '+ port)
});

