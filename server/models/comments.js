// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var schema = mongoose.Schema({
  joke_id: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});
// Export Contact model
module.exports = mongoose.model('Comments', schema);