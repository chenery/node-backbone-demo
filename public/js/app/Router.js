// Router.js
// ----------------
define(["Backbone", "views/HomePage"],

    function(Backbone, HomePageView) {
        console.log('in router');

        var Router = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index"

            },

            index: function() {
                console.log('index start');
                // Instantiates a new view which will render the header text to the page
                new HomePageView();
            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);