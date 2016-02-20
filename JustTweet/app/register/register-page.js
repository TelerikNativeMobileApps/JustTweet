var viewModule = require("ui/core/view");
var enums = require("ui/enums");
var gestures = require("ui/gestures");
var dialogsModule = require("ui/dialogs");
var UserViewModel = require("~/shared/view-models/user-view-model");
var navigation = require("~/shared/navigation");

var user = new UserViewModel({
    email: "",
    password: "",
    authenticating: false
});

var registerImg;
var password;
var email;
var registerButton;

exports.loaded = function(args) {
    var page = args.object;
    registerImg = viewModule.getViewById(page, "registerImg");
    page.bindingContext = user;

    email = page.getViewById("email");
    password = page.getViewById("password");
    registerButton = page.getViewById("registerButton");

    registerImg.animate({
        translate: { x: -250, y: 0}
    })
    .then(function() {return registerImg.animate({
        translate: { x: 100, y: 0},
        duration: 1000,
        curve: enums.AnimationCurve.spring
    }); });

    page.on(gestures.GestureTypes.swipe, function (args) {
        if (args.direction == 1) {
            navigation.goToLoginPage();
        }
    });
};

function disableForm() {
    email.isEnabled = false;
    password.isEnabled = false;
    registerButton.isEnabled = false;
    user.set("authenticating", true);
}

function enableForm() {
    email.isEnabled = true;
    password.isEnabled = true;
    registerButton.isEnabled = true;
    user.set("authenticating", false);
}

function completeRegistration() {
	disableForm();
	user.register()
		.then(function() {
			dialogsModule
				.alert("Your account was successfully created.")
				.then(navigation.goToLoginPage);
		}).catch(function(e) {
            console.log("caught:" + e)
			dialogsModule
				.alert({
					message: "Email is already taken",
					okButtonText: "OK"
				});
		}).then(enableForm);
}

exports.register = function() {
	if (user.isValidEmail()) {
		completeRegistration();
	} else {
		dialogsModule.alert({
			message: "Enter a valid email address.",
			okButtonText: "OK"
		});
	}
};