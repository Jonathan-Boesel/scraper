const express = require("express");

const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

//Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Middleware

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));



var controllers = require("./controllers/index.js")(app);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_jhrp6j1f:dslsd7ph9j5vtgjsnocf314qbi@ds249707.mlab.com:49707/heroku_jhrp6j1f";
mongoose.connect(MONGODB_URI);


// Starting the server
app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});
