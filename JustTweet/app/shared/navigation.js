var config = require("./config");
var frameModule = require("ui/frame");

module.exports = {
	goToLoginPage: function() {
		frameModule.topmost().navigate("login/login");
	},
	goToRegisterPage: function() {
		frameModule.topmost().navigate("register/register");
	},
	goToTweetsPage: function() {
		frameModule.topmost().navigate({
			moduleName: "tweets/tweets-page",
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
		return config.token ? "list/list" : "login/login";
	}
};