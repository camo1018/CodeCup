/**
 * Created by PaulPa on 7/2/2014.
 */
$(function() {
    $('.info-popover').popover();

    $('#login-button').on('click', function() {
        window.location = '/users/login';
    });

    $('#register-button').on('click', function() {
        window.location = '/users/register';
    });
});

var register = function() {
    var form = document.forms['registration-form'];
    var username = form['username'].value;
    var password = form['password'].value;
    var passwordConfirm = form['password-confirm'].value;
    var codeivateUsername = form['codeivate-username'].value;
    var githubUsername = form['github-username'].value;

    var params = { username: username, password: password, passwordConfirm: passwordConfirm, codeivateUsername: codeivateUsername, githubUsername: githubUsername };

    $.post('/actions/users/register', params, function(data) {

    });
};