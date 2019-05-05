var express = require('express');
var hbs = require('express-handlebars');
var app = express();
var path = require('path');

var login = require('./routers/login');
var register = require('./routers/register');
var forgetpassword = require('./routers/forget-password');
var resultsearch = require('./routers/result-search');
var admin = require('./routers/admin');
var admindashboard = require('./routers/admin-dashboard');
var adminmenu = require('./routers/admin-menu');
var user = require('./routers/user');
var detaileachpost = require('./routers/detail-eachpost');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


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
app.use(resultsearch);
app.use(admin)
app.use(admindashboard)
app.use(adminmenu)
app.use(user)
app.use(detaileachpost)

app.listen(3000);