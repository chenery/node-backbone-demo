/**
 *  todo work out why
 */
define(["Backbone"],
    function(Backbone) {
        return Backbone.View.extend({
            rendered: false,

            close: function() {
                this.remove();
                this.unbind();

                if (this.onClose){
                    this.onClose();
                }
            }
        });
    }
);