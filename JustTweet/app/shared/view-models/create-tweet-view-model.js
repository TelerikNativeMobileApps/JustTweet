var config = require("../../shared/config");
var Observable = require("data/observable").Observable;

function Tweet(info) {
    info = info || {};

    var viewModel = new Observable({
        tweet: info.tweet || "",
    });

    return viewModel;
}

module.exports = Tweet;
