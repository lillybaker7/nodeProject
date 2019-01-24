

// call the packages we need
var express    = require('express')      // call express
var bodyParser = require('body-parser')
var app        = express()     // define our app using express
const MongoClient = require('mongodb').MongoClient
var mongodb = require('mongodb');
const assert = require('assert');

// configure app to use bodyParser() and ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

// get an instance of the express Router
var router = express.Router();

// a “get” at the root of our web app: http://localhost:3000
app.get('/', function(req, res) {



  db.collection('homework').find({}).toArray((err, result) => {
    if(err) {console.log(err)}
    res.render('index.ejs', {homework : result  })
  })

});

app.post('/newPost', function(req, res) {
  console.log("POST!");  //logs to terminal
  var hwAssignment = req.body.hwAssignment
  var dueDate = req.body.dueDate
  db.collection('homework').insertOne({hwAssignment:hwAssignment, dueDate:dueDate})
  res.redirect('/')
  // res.render('success.ejs');  //renders index page in browser
});

router.get('/', function(req, res) {
    db.collection('homework').find({}).toArray((err, result) => {
      if(err) {console.log(err)}
      res.render('index.ejs', {homework:sortList(result) })
    })
}); 
    
app.post('/removePost',function(req,res) {
 
  var removeID = Object.keys(req.body)[0];
  if (removeID != null) {
    db.collection('homework', function(err, collection) {
      collection.deleteOne({_id: new mongodb.ObjectID(removeID)});
        
      res.redirect('/');
    });
  }
});

app.post('/edit',function(req,res) {
 
  var removeID = Object.keys(req.body)[0];
  if (removeID != null) {
    db.collection('homework', function(err, collection) {
      collection.deleteOne({_id: new mongodb.ObjectID(removeID)});
        
      res.redirect('/');
    });
  }
});


// START THE SERVER
//==========================================================

var db
MongoClient.connect('mongodb://lillybaker7:newsprint19@ds121343.mlab.com:21343/crudapp',{ useNewUrlParser: true }, (err, client) => {
    if(err) console.log(err)
    console.log("Connected successfully to server");
    var port = process.env.PORT || 80 // change this if running on 3000 locally
    db = client.db('crudapp');
    app.listen(port, () => {
        console.log('listening on heroku')
    })
})
