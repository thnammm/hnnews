var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var login = require('./routers/login');
var register = require('./routers/register');
var forgetpassword = require('./routers/forget-password');
var resultsearch = require('./routers/result-search');
var categorypostlist = require('./routers/category-post-list');
var hashtaglist = require('./routers/hashtag-list');
var hashtagdetail = require('./routers/hashtag-detail');
var admin = require('./routers/admin');
var admindashboard = require('./routers/admin-dashboard');
var adminmenu = require('./routers/admin-menu');
var user = require('./routers/user');
var detaileachpost = require('./routers/detail-eachpost');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// app.use(bodyParser());
// app.use(morgan());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     port: '',
//     user: 'me',
//     password: 'secret',
//     database: 'my_db'
// });

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
}));

app.get('/', (req, res) => {
    res.render('pages/index');
})

app.use(login)
app.use(register)
app.use(forgetpassword)
app.use(resultsearch)
app.use(categorypostlist)
app.use(hashtaglist)
app.use(admin)
app.use(admindashboard)
app.use(adminmenu)
app.use(user)
app.use(detaileachpost)
app.use(hashtagdetail);

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
});