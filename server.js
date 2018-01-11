const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = 8080;

const app = express();

//Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Middleware
const path = require("path");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/articleScrapes", {
	useMongoClient: true
});

// Scrape route
let pages = 1;

app.get("/", function(request, response) {

	response.render("home");
});

app.get("/scrape", function(req, res) {

	for (let p = 1; p <= pages; p++) {
		axios.get(`https://www.wired.com/most-recent/page/${p}/`).then(function(response) {
			var $ = cheerio.load(response.data);
			$("li.archive-item-component div.archive-item-component__info").each(function(i, element) {
				var result = {};
				result.title = $(this)
					.children("a.archive-item-component__link")
					.children("h2")
					.text();
				result.link = $(this)
					.children("a.archive-item-component__link")
					.attr("href");
				result.summary = $(this)
					.children("a.archive-item-component__link")
					.children("p")
					.text();
				console.log(result)
				db.Article
					.create(result)
					.then(function(data) {

						console.log(data);
					})
					.catch(function(err) {
						res.json(err);
					});


			});
		});
	}
	res.send("Scrape Complete");
});

// All article route
app.get("/articles", function(req, res) {
	db.Article.find({}).then(function(data) {
			res.render("home", { data: data });
		})
		.catch(function(err) {
			res.json(err);
		});
});

//SAVE route
app.put("/saved/:id", function(req, res) {
	db.Article.findByIdAndUpdate(req.params.id, { $set: { saved: true } }, function(err, dbArticle) {
		if (err) throw err;
		res.send(dbArticle);
	});
})

//Render saved page route
app.get("/saved", function(req, res) {
	db.Article.find({ saved: true }, function(err, data) {
			if (err) throw err;
			res.render("saved", { data: data })
		})
		.catch(function(err) {
			res.json(err);
		});
})

//Delete from saved route, need to figure out reload
app.put("/delete/:id", function(req, res) {
	db.Article.findByIdAndUpdate(req.params.id, { $set: { saved: false } })

		.then(function(err, data) {
			if (err) throw err;
			res.redirect('back')
		})
})

//Delete note
app.put("/deleteNote/:id", function(req, res) {
	db.Note.findByIdAndRemove(req.params.id)
		.then(function(err, data) {
			if (err) throw err
			res.json(data)
		})
		.catch(function(err) {
			res.json(err);
		});
})

// Find article by id route
app.get("/articles/:id", function(req, res) {
	db.Article.findOne({ _id: req.params.id })
		.populate("note").then(function(data) {
			res.json(data);
		})
		.catch(function(err) {
			res.json(err);
		});
});

// Save/update Note
app.post("/articles/:id", function(req, res) {
	console.log(req.body.id)
	db.Note.create(req.body).then(function(dbNote) {
			return db.Article.findOneAndUpdate({ _id: req.body.id }, { note: dbNote._id }, { new: true });
		})
		.then(function(data) {
			res.json(data);
		})
		.catch(function(err) {
			res.json(err);
		});
})
// Starting the server
app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});
