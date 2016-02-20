var viewModule = require("ui/core/view");
var dialogsModule = require("ui/dialogs");
var UserViewModel = require("~/shared/view-models/user-view-model");
var navigation = require("~/shared/navigation");

var user = new UserViewModel({
    email: "",
    password: "",
    authenticating: false
});

var logo;
var password;
var email;
var loginButton;

exports.loaded = function(args) {
    var page = args.object;
    logo = viewModule.getViewById(page, "logo");
    page.bindingContext = user;

    email = page.getViewById("email");
    password = page.getViewById("password");
    loginButton = page.getViewById("loginButton");

    logo.animate({ opacity: 0 })
        .then(function() { return logo.animate({ opacity: 1, scale: { x: 2, y: 2 }, duration: 1000}); })
        .then(function() { return logo.animate({ scale: { x: 1.3, y: 1.3} }); })
        .then(function() {return logo.animate({ rotate: 45 }); })
        .then(function() {return logo.animate({ rotate: 0 }); });
};

function disableForm() {
    email.isEnabled = false;
    password.isEnabled = false;
    loginButton.isEnabled = false;
    user.set("authenticating", true);
}

function enableForm() {
    email.isEnabled = true;
    password.isEnabled = true;
    loginButton.isEnabled = true;
    user.set("authenticating", false);
}

exports.login = function() {
    disableForm();
    user.login()
        .catch(function() {
            dialogsModule.alert({
                message: "Invalid email or password",
                okButtonText: "OK"
            });
            enableForm();
            return Promise.reject();
        })
        .then(enableForm)
        .then(navigation.goToTweetsPage);
};