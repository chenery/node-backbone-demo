define(["Backbone", "views/BaseView",
    "text!templates/MessageListItemView.html"],
    function(Backbone, BaseView, template) {
        return BaseView.extend({
            events: {

            },

            initialize: function(options) {
                // todo what is this?
                _.bindAll(this);

                return this;
            },

            render: function() {

                // check the data is ok todo filter bad messages in the db query
                if (this.model.get('message')) {
                    this.$el.html(_.template(template, this.model.toJSON()));
                }

                return this;
            }
        });

    }
);