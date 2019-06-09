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
var user = require('./routers/user');
var detaileachpost = require('./routers/detail-eachpost');
var editpost = require('./routers/edit-post');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

var indexmodel = require('./models/index.model.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded());

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/'
}));

app.get('/', (req, res) => {
    var bestpost = indexmodel.best();
    var bestofbestpost = indexmodel.bestofbest();
    var newpost = indexmodel.newest();
    var viewpost = indexmodel.viewest();
    var top10post = indexmodel.top10posts();
    var top10tag = indexmodel.top10tags();
    var statistic = indexmodel.statistic();
    Promise.all([
        bestpost, bestofbestpost, newpost, viewpost, top10post, top10tag, statistic])
        .then(([best, bobest, newest, viewest, top10post, top10tag, statistic]) => {
            res.render('pages/index', {
                bestpost: best,
                bestofbestpost: bobest,
                newpost: newest,
                viewpost: viewest,
                top10post: top10post,
                top10tag: top10tag,
                statistic: statistic
            });
        }).catch(err => {
            console.log(err);
        })
})

app.use(login)
app.use(register)
app.use(forgetpassword)
app.use(resultsearch)
app.use(categorypostlist)
app.use(hashtaglist)
app.use(admin)
app.use(admindashboard)
app.use(user)
app.use(detaileachpost)
app.use(hashtagdetail);
app.use(editpost);

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})