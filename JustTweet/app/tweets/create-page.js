var viewModule = require("ui/core/view");
var dialogsModule = require("ui/dialogs");
var CreateTweetViewModel = require("~/shared/view-models/create-tweet-view-model");
var navigation = require("~/shared/navigation");

var tweet = new CreateTweetViewModel({
    tweet: "",
});

exports.loaded = function(args) {
    var page = args.object;
    logo = viewModule.getViewById(page, "logo");
    page.bindingContext = tweet;
};