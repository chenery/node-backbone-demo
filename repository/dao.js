var Models = require('./models');

// This function is responsible for returning all entries for the Message model
// todo add in the sort: .sort('createdAt', -1)
exports.getMessages = function(req, res, next) {
    Models.Message.find().limit(20).execFind(function (arr, data) {
        res.send(data);
    });
};

exports.getUsers = function(req, res) {
    Models.User.find().limit(20).execFind(function (arr, data) {
        res.send(data);
    });
};

/**
 *
 * @param accessToken
 * @param profile
 * @param done
 */
exports.saveOrUpdateUserFromProfile = function(accessToken, profile, done) {

    Models.User.findOne({'services.facebook.id': profile.id}).execFind(function (arr, data) {

        // if we have one,
        if (data.length > 0) {
            console.log('found profile in db, user: ' + data[0]._doc.profile.name);
            // todo create and store a login token then,
            // call back with the data
            done(null, data[0]._doc);
        } else {

            // create a new user
            // http://passportjs.org/guide/profile/
            var email = null;
            if (profile.emails && profile.emails.length > 0) {
                email = profile.emails[0];
            }

            var user = new Models.User({
                createdAt: new Date().getTime(),
                numberOfMessages: 0,
                profile: {
                    name: profile.displayName
                },
                services: {
                    facebook: {
                        accessToken: accessToken,
                        expiresAt: new Date().getTime(),
                        id: profile.id,
                        email: email,
                        name: profile.displayName,
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName,
                        username: profile.username,
                        gender: profile.gender
                    }
                }
            });

            user.save(function(err, user) {
                if (err) {
                    console.log('Error saving user ' + user + ' ' + err);
                } else {
                    // callback with the new user
                    done(null, user._doc);
                }
            });
        }


    });
};