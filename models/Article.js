var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
		// validate: {
		// 	validator: function(v, cb) {
		// 		Article.find({ name: v }, function(err, docs) {
		// 			if (err) throw err;
		// 			cb(docs.length == 0);
		// 		})
		// 	},
		// 	message: 'User already exists!'
		// }
	},
	summary: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	saved: {
		type: Boolean,
		default: false
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: "Note"
	}
});

//This custom method breaks my schema, I have no idea why
// ArticleSchema.methods.save = function() {
// 	this.saved = true;
// 	return this.saved;
// };

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
