// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require('./api-routes');
// Configure bodyparser to handle post requests

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/test_db', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf
//@ds349857.mlab.com:49857/heroku_5686p02g',
// { useNewUrlParser: true });

let db = mongoose.connection;

// Added check for DB connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	// we're connected!
	console.info('MongoDB database connection established successfully');
});

// Setup server port
let port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
	console.info('Running RestHub on port ' + port);
});
