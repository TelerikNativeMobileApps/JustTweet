var config = require("./config");
var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		frameModule.topmost().navigate("login/login-page");
	},
	goToRegisterPage: function() {
		frameModule.topmost().navigate("register/register-page");
	},
	goToTweetsPage: function() {
		frameModule.topmost().navigate({
			moduleName: "tweets/tweets-page",
		});
	},
	goToCreatePage: function() {
		frameModule.topmost().navigate({
			moduleName: "tweets/create-page",
		});
	},
	signOut: function() {
		config.invalidateToken();
		frameModule.topmost().navigate({
			moduleName: "login/login",
			animated: false,
		});
	},
	startingPage: function() {
		return config.token ? "tweets/tweets-page" : "login/login-page";
	}
};