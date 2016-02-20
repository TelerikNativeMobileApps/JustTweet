var gestures = require("ui/gestures");
var Observable = require("data/observable").Observable;
var TweetListViewModel = require("~/shared/view-models/all-tweets-view-model");
var navigation = require("~/shared/navigation");
var page;

var tweetList = new TweetListViewModel([]);
var pageData = new Observable({
    tweetList: tweetList,
    tweet: ""
});

exports.loaded = function(args) {
    page = args.object;
    var listView = page.getViewById("tweetList");

    page.bindingContext = pageData;

     page.on(gestures.GestureTypes.swipe, function (args) {
        if (args.direction == 2) {
            navigation.goToRegisterPage();
        }
    });

    tweetList.empty();
    pageData.set("isLoading", true);
    tweetList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};
