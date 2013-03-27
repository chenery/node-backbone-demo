var mongoose = require('mongoose/');
var config = require('../config'); // Local config file

// Setup mongoose and the database
var db = mongoose.connect(config.creds.mongoose_auth);
var Schema = mongoose.Schema;

exports.initSchema = function() {
    // Create a schema for our data
// http://mongoosejs.com/docs/guide.html
    var MessageSchema = new Schema({
        owner: String,
        message: String,
        createdAt: Number
    });
    // Use the schema to register a model
    mongoose.model('messages', MessageSchema);

    // expose the model via the module
    exports.Message = mongoose.model('messages');

    var UserSchema = new Schema({
        createdAt: Number,
        numberOfMessages: Number,
        profile: {
            name: String
        },
        services: {
            facebook: {
                accessToken: String,
                expiresAt: Number,
                id: String,
                email: String,
                name: String,
                first_name: String,
                last_name: String,
                link: String,
                username: String,
                gender: String,
                locale: String
            },
            // container for tokens that keep you logged in between sessions
            resume: {
                loginTokens : [{ when: String, token: Date }]
            }
        }
    });
    // Use the schema to register a model
    mongoose.model('users', UserSchema);

    exports.User = mongoose.model('users');
};

