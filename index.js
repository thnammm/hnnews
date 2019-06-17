var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var hbs_sections = require('express-handlebars-sections');


var app = express();

//Routers
var main = require('./routers/main');
var account = require('./routers/account');
var admin = require('./routers/admin');
var admindashboard = require('./routers/admin-dashboard');
var profile = require('./routers/profile');

// Models
var indexModel = require('./models/index.model.js');

// Middlewars
// require('./middlewares/viewengine.js')(app);
require('./middlewares/session.js')(app);
require('./middlewares/passport.js')(app);

app.use(require('./middlewares/adminauth.mdw.js'));
app.use(require('./middlewares/accountauth.mdw.js'));
app.use(require('./middlewares/categorymenu.mdw.js'));

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/pages/',
    partialsDir: __dirname + '/views/partials/',
    section: hbs_sections()
}));

// Set views and publics folder go to public file
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

// Export JSON data using Promise at back-end
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Access to home page
app.get('/', (req, res, next) => {
    // CasePost
    var casepost = 0;
    if (!req.user || (req.user.casepost == 0)) {
        casepost = 0;
    } else if (req.user.casepost == 1) {
        casepost = 1;
    }

    var bestpost = indexModel.bestpost(casepost);
    var newpost = indexModel.newpost(casepost);
    var viewpost = indexModel.viewpost(casepost);
    var top8post = indexModel.top8post(casepost);
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
app.use(profile)

app.use((req, res, next) => {
    res.render('pages/error404');
})

app.use((error, req, res, next) => {
    res.render('pages/errorElse', {
        message: error.message,
        error
    });
})

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})