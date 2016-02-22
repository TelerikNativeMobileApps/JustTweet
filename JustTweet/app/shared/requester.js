var config = require("./config");
var http = require("http");

function get(url) {
    return fetch(config.apiUrl + url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + config.token
        }
    })
    .then(handleErrorsGet)
    .then(function(response) {
        return response.json();
    });
}

function post(url, data) {
    return http.request({
        url: config.apiUrl + url,
        method: 'POST',
        content: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + config.token
        }
    })
    .then(handleErrorsPost);
}

function handleErrorsGet(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

function handleErrorsPost(response) {
    if (response.statusCode != 200) {
        console.log(response.statusCode)
        throw Error(response.statusText);
    }

    return response;
}

module.exports = {
    get: function(url) {
        return get(url);
    },
    post: function(url, data) {
        return post(url, data);
    }
}
