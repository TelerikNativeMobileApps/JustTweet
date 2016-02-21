var requester = require("../../shared/requester");
var Observable = require("data/observable").Observable;
var geolocation = require("nativescript-geolocation");

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

        if (geolocation.isEnabled()) {
            return geolocation
                .getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 })
                .then(function(location) {
                    if (location) {
                        data.location = location
                    }

                    return requester.post(URL, data)
                }, function(err) {
                    console.log("Error: " + err.message);
                    return requester.post(URL, data)
                });
        } else {
            return requester.post(URL, data)
        }
    }

    viewModel.enableLocation = function() {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    }

    return viewModel;
}

module.exports = Tweet;
