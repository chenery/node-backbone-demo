define(["Backbone", "models/Message"],
    function(Backbone, Message) {
        // Creates a new Backbone Collection class object
        return Backbone.Collection.extend({

            // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
            model: Message,
            url: 'data/messages'

        });
    }
);