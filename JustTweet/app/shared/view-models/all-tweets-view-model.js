var requester = require("../../shared/requester");
var ObservableArray = require("data/observable-array").ObservableArray;
var URL = "api/tweets";

function TweetListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function(page) {
        var page =  page || 1;
        return requester
            .get(URL + '?page=' + page)
            .then(function(data) {
                data.forEach(function(tweets) {
                    viewModel.push({
                        text: tweets.Text,
                        id: tweets.Id
                    });
                });
            });
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    return viewModel;
}

module.exports = TweetListViewModel;
