/**
 * Created by PaulPa on 7/2/2014.
 */
$(function() {
    var login = function() {
        var form = document.forms['login-form'];
        var username = form['username'].value;
        var password = Sha1.hash(form['password'].value);

        clearErrors();

        var params = { username: username, password: password };

        $.post('/actions/users/login', params, function(data) {
            switch(data) {
                case 'login-fail':
                    loginError();
                    break;
                case 'login-success':
                    window.location = '/home';
                    break;
            }
        });
    }

    var loginError = function() {
        $('#username-field').addClass('has-error');
        $('#password-field').addClass('has-error');
        $('#login-error').removeClass('not-visible');
    }

    var clearErrors = function() {
        $('#username-field').removeClass('has-error');
        $('#password-field').removeClass('has-error');
        $('#login-error').addClass('not-visible');
    }

    $('#login-submit-button').on('click', function() {
        login();
    });
});