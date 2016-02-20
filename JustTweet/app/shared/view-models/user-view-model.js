var config = require("../../shared/config");
var Observable = require("data/observable").Observable;
var validator = require("email-validator");
var http = require("http");

function User(info) {
	info = info || {};

	// You can add properties to observables on creation
	var viewModel = new Observable({
		email: info.email || "",
		password: info.password || ""
	});

	viewModel.login = function() {
		return fetch(config.apiUrl + "token", {
			method: "POST",
            body: 'username=' + viewModel.get("email") + '&password=' + viewModel.get("password") + '&grant_type=password',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			}
		})
		.then(handleErrors)
		.then(function(response) {
			return JSON.parse(response._bodyText);
		}).then(function(data) {
			config.token = data.access_token;
		});
	};

	viewModel.register = function() {
		return http.request({
            url: config.apiUrl + "api/account/register",
			method: "POST",
			content: JSON.stringify({
				Email: viewModel.get("email"),
				Password: viewModel.get("password"),
				ConfirmPassword: viewModel.get("password")
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(handleErrors);
	};

	viewModel.isValidEmail = function() {
		var email = this.get("email");
		return validator.validate(email);
	};

	return viewModel;
}

function handleErrors(response) {
	if (response.statusCode != 200) {
		throw Error(response.statusText);
	}
	return response;
}

module.exports = User;