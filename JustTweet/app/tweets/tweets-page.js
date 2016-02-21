var gestures = require("ui/gestures");
var listViewModule = require("ui/list-view");
var Observable = require("data/observable").Observable;
var TweetListViewModel = require("~/shared/view-models/all-tweets-view-model");
var navigation = require("~/shared/navigation");
var page;

var tweetList = new TweetListViewModel([]);
var pageData = new Observable({
    tweetList: tweetList,
    tweet: "",
});

exports.loaded = function(args) {
    page = args.object;
    var listView = page.getViewById("tweetList");
    var pageNumber = 1;

    page.bindingContext = pageData;

    listView.on(gestures.GestureTypes.swipe, function(args) {
        if (args.direction == 2) {
            navigation.goToCreatePage();
        }
    });

    listView.on(listViewModule.ListView.loadMoreItemsEvent, function(data) {
        pageNumber++;
        loadData(pageNumber)
    });

    function loadData(page) {
        pageData.set("isLoading", true);
        tweetList.load(page)
            .then(function() {
                pageData.set("isLoading", false);
                listView.animate({
                    opacity: 1,
                    duration: 1000
                });
            });
    }

    tweetList.empty();
    loadData();
};
