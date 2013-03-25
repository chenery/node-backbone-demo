/**
 *  http://liquidmedia.ca/blog/2011/02/backbone-js-part-3/
 *  todo also review derrick bailey on how this works
 */
define(["Backbone", "views/BaseView"],
    function(Backbone, BaseView) {
        return BaseView.extend({
            rendered: false,

            initialize: function(options) {
                _.bindAll(this);

                // hold our child views so we can remove them after
                this.viewPointers = {};

                this.prepend = options.prepend || false;

                // set up the collection + bind events to update this list
                this.collection = options.collection;
                this.collection.bind('add', this.addItem);
                this.collection.bind('remove', this.removeItem);
                this.collection.bind('reset', this.refresh);

                // we need to have a child view to render into this one
                this.ItemView = options.itemView;
                this.itemViewTagName = options.itemViewTagName || 'div';
                this.itemViewClassName = options.itemViewClassName || '';
                this.itemViewOptions = options.itemViewOptions || {};

                return this;
            },

            onClose: function() {
                var that = this;

                this.collection.unbind('add', this.addItem);
                this.collection.unbind('remove', this.removeItem);
                this.collection.unbind('reset', this.refresh);

                // close all the subviews
                this.collection.each(function(item) {
                    that.removeItem(item);
                });
            },

            /**
             * Will loop through our collection and create a child view for each item
             */
            render: function() {
                var that = this;

                if (!this.rendered) {
                    this.collection.each(function(item) {
                        that.addItem(item);
                    });
                    this.rendered = true;
                }
                return this;
            },

            /**
             * force the view to rerender
             */
            refresh: function() {
                // close each view properly
                for (var view in this.viewPointers) {
                    if (this.viewPointers.hasOwnProperty(view)) {
                        this.viewPointers[view].close();
                    }
                }

                this.rendered = false;

                delete this.viewPointers;
                this.viewPointers = {};

                return this.render();
            },

            /**
             * Will create a view for the current model item
             * The view will be what was passed into the constructor
             * This will also fire if the collection has an item added to it
             * @param item Model
             */
            addItem: function(item) {
                var view = this.viewPointers[item.cid];

                // if no view then create a view for this item
                if (!view) {
                    view = new this.ItemView(_.extend({
                        model: item,
                        tagName: this.itemViewTagName,
                        className: this.itemViewClassName
                    }, this.itemViewOptions));
                }

                // keep a reference to this view from the model cid
                var o = {};
                o[item.cid] = view;
                _.extend(this.viewPointers, o);

                // add view to this view
                if (this.prepend) {
                    this.$el.prepend(view.render().el);
                } else {
                    this.$el.append(view.render().el);
                }

                return this;
            },

            /**
             * Will remove a child view from this view and references to it
             * This will fire if an item is removed from the collection
             * @param item Model
             */
            removeItem: function(item) {
                var view = this.viewPointers[item.cid];
                if (view){
                    view.close();
                    delete this.viewPointers[item.cid];
                }
                return this;
            },

            /**
             * Get a child view from the model item
             * @param item Model
             */
            getViewForItem: function(item) {
                return this.viewPointers[item.cid];
            }
        });
    }
);

