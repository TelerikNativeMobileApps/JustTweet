var viewModule = require("ui/core/view");
var dialogsModule = require("ui/dialogs");
var CreateTweetViewModel = require("~/shared/view-models/create-tweet-view-model");
var navigation = require("~/shared/navigation");

var newTweet = new CreateTweetViewModel({
    tweet: ""
});

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = newTweet;
};

exports.create = function() {
    newTweet.create()
        .catch(function(err) {
            dialogsModule.alert({
                message: err,
                okButtonText: "OK"
            });
            return Promise.reject();
        })
        .then(navigation.goToListPage);
};
