// contactModel.js
let mongoose = require('mongoose');
// Setup schema
let jokeSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  joke: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments'
    }
  ]
});
// Export Contact model
let Joke = module.exports = mongoose.model('jokes', jokeSchema);
module.exports.get = function (callback, limit) {
  Joke.find(callback).limit(limit);
}
