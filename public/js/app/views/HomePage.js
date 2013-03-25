// HomePage view
define(["Backbone", "views/MessagesPageView"],

    function(Backbone, MessagesPageView){

        var HomePageView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".container",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {
                'click .messagesLink' : 'showMessages'
            },

            showMessages: function(e) {
                if (e) {
                    e.preventDefault();
                }
                new MessagesPageView();
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                // todo work out how we can see this "_" here?
                this.template = _.template('<p>test <a class="messagesLink" href="messages">Messages</a></p>', {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            }

        });

        // Returns the View class
        return HomePageView;

    }

);