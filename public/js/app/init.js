/**
 *  Define the require.js dependencies and fire the app by calling the router
 */
require.config({

    // Sets the js folder as the base directory for all future relative paths
    baseUrl: "./js",

    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    paths: {

        // Core Libraries
        // --------------
        "jquery": "libs/jquery-1.9.1",

        "underscore": "libs/underscore-1.4.4",

        "Backbone": "libs/backbone-1.0.0",

        // Plugins
        // -------
//        "backbone.validateAll": "libs/plugins/Backbone.validateAll",

//        "bootstrap": "libs/plugins/bootstrap",

        "text": "libs/text",

        // Application Folders
        // -------------------
        "collections": "app/collections",

        "models": "app/models",

        "Router": "app/Router",

        "templates": "app/templates",

        "views": "app/views"

    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {

//        Twitter Bootstrap jQuery plugins
//        "bootstrap": ["jquery"],

        // jQueryUI
//        "jqueryui": ["jquery"],

        // Backbone
        "Backbone": {

            // Depends on underscore/lodash and jQuery
            "deps": ["underscore", "jquery"],

            // Exports the global window.Backbone object
            "exports": "Backbone"

        }

        // Backbone.validateAll plugin that depends on Backbone
//        "backbone.validateAll": ["backbone"]

    }

});


// Includes Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["Router"],

    function(Router) {

        // Instantiates a new Router instance
        new Router();
    }

);