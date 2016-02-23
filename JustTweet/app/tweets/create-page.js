var viewModule = require("ui/core/view");
var dialogsModule = require("ui/dialogs");
var CreateTweetViewModel = require("~/shared/view-models/create-tweet-view-model");
var navigation = require("~/shared/navigation");
var gestures = require("ui/gestures");
var sounds = require("~/shared/sounds");

var newTweet = new CreateTweetViewModel({
    tweet: ""
});
var tweeter;

exports.loaded = function(args) {
    var page = args.object;
    page.bindingContext = newTweet;

    page.on(gestures.GestureTypes.swipe, function(args) {
        if (args.direction == 1) {
            navigation.goToTweetsPage();
        }
    });

    tweeter = viewModule.getViewById(page, "tweeter");

    tweeter.on(gestures.GestureTypes.longPress, function(args) {
        sounds["birdSing"].play();
        tweeter.animate({ translate: { x: -20, y: 0}, rotate: -10, duration: 50 })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: -10, translate: { x: -20, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: -10, translate: { x: -20, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: -10, translate: { x: -20, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: -10, translate: { x: -20, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: -10, translate: { x: -20, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: -10, translate: { x: -20, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: -10, translate: { x: -20, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: -10, translate: { x: -20, y: 0}, duration: 50}) })
            .then(function() { return tweeter.animate({ rotate: 10, translate: { x: 20, y: 0}, duration: 100}) })
            .then(function() { return tweeter.animate({ rotate: 0, translate: { x: 0, y: 0}, duration: 50}) });
        })
};

exports.create = function() {
    newTweet.create()
        .then(navigation.goToTweetsPage)
        .catch(function(err) {
            console.log('error: ' + err)
            dialogsModule.alert({
                message: err.toString(),
                okButtonText: "OK"
            });
            return Promise.reject();
        });
};

exports.enableLocationTap = newTweet.enableLocation;
