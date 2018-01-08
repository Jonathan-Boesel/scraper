const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = 8080;

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/articleScrapes", {
	useMongoClient: true
});

// Scrape route
app.get("/scrape", function(req, res) {
	axios.get("https://www.wired.com/most-recent/").then(function(response) {
		let $ = cheerio.load(response.data);
		$("li.archive-item-component div.archive-item-component__info").each(function(i, element) {
			var result = [];
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
				.text()

			console.log(result)

		})
	})
})

// All article route
app.get("/articles", function(req, res) {
	db.Article.find({}).then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
});

// Find article by id route
app.get("/articles/:id", function(req, res) {
	db.Article.findOne({ _id: req.params.id })
		.populate("note").then(function(dbArticle) {
			res.json(db.Article);
		})
		.catch(function(err) {
			res.json(err);
		});
});

// Save/update Note
app.post("/articles/:id", function(req, res) {
	db.Note.create(req.body).then(function(dbNote) {
			return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
		})
		.then(function(dbArticle) {
			res.json(dbArticle);
		})
		.catch(function(err) {
			res.json(err);
		});
})
// Starting the server
app.listen(PORT, function() {
	console.log("App running on port " + PORT + "!");
});
