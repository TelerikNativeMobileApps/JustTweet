var applicationSettingsModule = require("application-settings");

var configObject = {
	apiUrl: "http://justtweet.azurewebsites.net/",
	invalidateToken: function() {
		this.token = "";
	}
};

Object.defineProperty(configObject, "token", {
	get: function() {
		return applicationSettingsModule.getString("token");
	},
	set: function(token) {
		return applicationSettingsModule.setString("token", token);
	}
});

module.exports = configObject;