// Setup mongoose and the database
var mongoose = require('mongoose/');
var config = require('./config'); // Local config file
db = mongoose.connect(config.creds.mongoose_auth),
    Schema = mongoose.Schema;

// require restify and bodyParser to read Backbone.js syncs
var restify = require('restify');
var server = restify.createServer();
server.use(restify.bodyParser());  // todo what is this?


// Create a schema for our data

// http://mongoosejs.com/docs/guide.html
var MessageSchema = new Schema({
    owner: String,
    message: String,
    createdAt: String
});
// Use the schema to register a model
mongoose.model('messages', MessageSchema);
var Message = mongoose.model('messages');


// This function is responsible for returning all entries for the Message model
// todo add in the sort: .sort('createdAt', -1)
function getMessages(req, res, next) {
    Message.find().limit(20).execFind(function (arr,data) {
        res.send(data);
    });
}



//function postMessage(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    // Create a new message model, fill it up and save it to Mongodb
//    var message = new Message();
//    message.message = req.params.message;
//    message.date = new Date()
//    message.save(function () {
//        res.send(req.body);
//    });
//}

// Set up our routes and start the server
server.get('/messages', getMessages);
//server.post('/messages', postMessage);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});