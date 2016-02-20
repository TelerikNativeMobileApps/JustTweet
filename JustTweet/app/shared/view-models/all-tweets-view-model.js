var config = require("../../shared/config");
var fetchModule = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function TweetListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function() {
        return fetch(config.apiUrl + "api/tweets", {
            headers: {
                "Authorization": "Bearer " + config.token
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(JSON.stringify(data));
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

function handleErrors(response) {
    if (!response.ok) {
         console.log(response)
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = TweetListViewModel;