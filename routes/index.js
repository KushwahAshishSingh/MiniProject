var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/getdata', function(req, res){
    var resultArray =[];
    mongo.connect(url, function(err, db){
        assert.equal(null, err);
        var cursor = db.collection('userdata').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        }, function(){
            db.close();
            res.render('index', {items: resultArray});
        });
    });
});

router.post('/insert', function(req, res){
    var item = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    };

    mongo.connect(url, function(err, db)
    {
        assert.equal(null, err);
        db.collection('userdata').insertOne(item, function(err, result){
            assert.equal(null, err);
            console.log('item inserted');
            db.close();
        });
    });


    res.redirect('/');

})
router.post('/update', function(req, res, next){
    var item = {

    }

})
router.post('/delete', function(req, res, next){

})


module.exports = router;
