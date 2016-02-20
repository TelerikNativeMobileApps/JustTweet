var config = require("../../shared/config");
var Observable = require("data/observable").Observable;
var token = "k1Yt0R6XQyJ9l9D5xgURBdTfu5FJKMFLJI7iCUFlnW-1iR8K29Hl9c5WHnhmwUaZsesfNk63i70FEiogFwQjymCELvfjoKoqZ--Le6raizMAUvo5FcjJFBgH5u2eGe8-bVPhIlM8sn90uTpkfa4x4SsLcnQlFcdcfuNS4i9RMopOoZFUUReZS3TdiK_mRCVGNN4sUYcVrjqe1hg_T-ci7ROvyel1CDD7D2CUilg63q7gpvi9-naJ_gzPOrpoCgHNsExcUQqACW1-gfsSXMF0qz-fC3b9CuGmTSH0KkvxuQm9ar2SK6CzdiPw6M5UxrnJOk0PjkgKPS165aaRo_6pDY1kuWgLyWXr-UAnuz_yN9E2-lrjvGtPEUl_3Vs_hQCv1nBTpyw9O2MVED8tGgl5F2FckEHRdppIurtrGACjI0qgDPGh10MDlDiyOQu8RR1vKuxHS4d2l_Bfe9cRzr6VB9XfnLmIh6be-mYeQ7_D0To"

function Tweet(info) {
    info = info || {};

    var viewModel = new Observable({
        tweet: info.tweet || "",
    });

    viewModel.create = function() {
        return fetch(config.apiUrl + "api/tweets", {
                method: "POST",
                body: JSON.stringify({
                    text: viewModel.get("tweet"),
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            });
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }

    return response;
}

module.exports = Tweet;
