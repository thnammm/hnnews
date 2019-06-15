var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var morgan = require('morgan');
var hbs_sections = require('express-handlebars-sections');
var bodyParser = require('body-parser');

var app = express();

var main = require('./routers/main');
var account = require('./routers/account');
var admin = require('./routers/admin');
var admindashboard = require('./routers/admin-dashboard');
var login = require('./routers/login');
var forgetpassword = require('./routers/forget-password');
var resultsearch = require('./routers/result-search');
var user = require('./routers/user');
var editpost = require('./routers/edit-post');

var indexModel = require('./models/index.model.js');

app.use(require('./middlewares/categorymenu.mdw.js'));

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/',
    section: hbs_sections()
}));



app.get('/', (req, res, next) => {
    var bestpost = indexModel.bestpost();
    var newpost = indexModel.newpost();
    var viewpost = indexModel.viewpost();
    var top8post = indexModel.top8post();
    var top10tag = indexModel.top10tag();
    var statistic = indexModel.statistic();

    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    Promise.all(
        [bestpost, newpost, viewpost, top8post, top10tag, statistic])
        .then(([bestpost, newpost, viewpost, top8post, top10tag, statistic]) => {
            res.render('pages/index', {
                bestpost: bestpost,
                newpost: newpost,
                viewpost: viewpost,
                top8post: top8post,
                top10tag: top10tag,
                statistic: statistic
            });
        }).catch(next);
})

app.use(main)
app.use(account)
app.use(admin)
app.use(admindashboard)
app.use(login)
app.use(forgetpassword)
app.use(resultsearch)
app.use(user)
app.use(editpost);

app.use((req, res, next) => {
    res.render('pages/error404');
})

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})