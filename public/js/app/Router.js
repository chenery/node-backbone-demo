// Router.js
// ----------------
define(["Backbone",
    "views/HomePage",
    "views/MessagesPageView"],

    function(Backbone, HomePageView, MessagesPageView) {
        console.log('in router');

        var Router = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                "/messages": "messages"

            },

            index: function() {
                console.log('index start');
                // Instantiates a new view which will render the header text to the page
                new HomePageView();
            },

            messages: function() {
                console.log('messages start');
                // todo review when this actually gets fired
                // Instantiates a new view which will render the header text to the page
                new MessagesPageView();
            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);