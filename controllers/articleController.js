const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Article } = require('../models/article');

// => localhost:3000/articles/
router.get('/', (req, res) => {
    Article.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Articles :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Article.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Article :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var art = new Article({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        size: req.body.size,
        comment: req.body.comment
    });
    art.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Article Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var art = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        size: req.body.size,
        comment: req.body.comment
    };
    Article.findByIdAndUpdate(req.params.id, { $set: art }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Article Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Article.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Article Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;