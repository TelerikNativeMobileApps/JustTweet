var config = require("./config");

function request(url, method, data) {
    console.log(config.token)
    return fetch(config.apiUrl + url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + config.token
            }
        })
        .then(handleErrors)
        .then(function(response) {
            return response.json();
        });
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }

    return response;
}

module.exports = {
    get: function(url) {
        return request(url, 'GET');
    },
    post: function(url, data) {
        return request(url, 'POST', data);
    }
}
