/**
 *  Pull back all the messages in the system
 */
define(["Backbone",
    "collections/Messages",
    "views/CollectionView",
    "views/MessageListItemView",
    "text!templates/MessagesPageView.html"],

    function(Backbone,
             Messages,
             CollectionView,
             MessageListItemView,
             template){

        return Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".container",

            // View constructor
            initialize: function() {
                _.bindAll(this);

                this.messages = new Messages();

                // create a list view for each row in the table
                this.messagesListView = new CollectionView({
                    collection: this.messages,
                    itemView: MessageListItemView,
                    itemViewTagName: 'tr',
                    tagName: 'tbody'
                });

                // Calls the view's render method
                this.render();

                // get a reference to where we want to inject the messages
                this.messagesContainer = this.$el.find('#messagesContainer');

                // lazy load these - fetch is after the page render
                this.messages.fetch({
                    success: this.renderMessages
                });

            },

            // View Event Handlers
            events: {

            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                // todo work out how we can see this "_" here?
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            renderMessages: function() {
                // todo review this
                this.messagesContainer.append($(this.messagesListView.render().el).children());
            }

        });
    }

);