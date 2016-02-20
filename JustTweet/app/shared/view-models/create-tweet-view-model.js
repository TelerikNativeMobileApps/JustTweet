var requester = require("../../shared/requester");
var Observable = require("data/observable").Observable;
var URL = "api/tweets";

function Tweet(info) {
    info = info || {};

    var viewModel = new Observable({
        tweet: info.tweet || "",
    });

    viewModel.create = function() {
        var data = {
            text: viewModel.get("tweet")
        };

        return requester.post(URL, data)
    }

    return viewModel;
}

module.exports = Tweet;
