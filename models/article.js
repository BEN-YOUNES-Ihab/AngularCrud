const mongoose = require('mongoose');

var Article = mongoose.model('Article', {
    name: { type: String },
    category: { type: String },
    price: { type: Number },
    size: { type: String },
    comment: { type: String }
});

module.exports = { Article };