var application = require("application");
var navigation = require("~/shared/navigation");

application.start({
    // will be fixed for android in 1.7
	moduleName: global.android ? "login/login-page" : navigation.startingPage()
})