var viewModule = require("ui/core/view");
var logo;

exports.loaded = function(args) {
    var page = args.object;
    logo = viewModule.getViewById(page, "logo");

    logo.animate({ opacity: 0 })
        .then(function() { return logo.animate({ opacity: 1, scale: { x: 2, y: 2 }, duration: 1000}); })
        .then(function() { return logo.animate({ scale: { x: 1.3, y: 1.3} }); })
        .then(function() {return logo.animate({ rotate: 45 }); })
        .then(function() {return logo.animate({ rotate: 0 }); });
};



