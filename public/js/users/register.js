/**
 * Created by PaulPa on 7/2/2014.
 */
$(function() {
    var register = function() {
        var form = document.forms['registration-form'];
        var username = form['username'].value;
        var password = Sha1.hash(form['password'].value);
        var passwordConfirm = Sha1.hash(form['password-confirm'].value);
        var codeivateUsername = form['codeivate-username'].value;
        var githubUsername = form['github-username'].value;

        var params = { username: username, password: password, passwordConfirm: passwordConfirm, codeivateUsername: codeivateUsername, githubUsername: githubUsername };

        clearErrors();

        if (password != passwordConfirm) {
            passwordError();
            return;
        }

        console.log(params);

        $.post('/actions/users/register', params, function(data) {
            switch(data) {
                case 'username-exists':
                    usernameError();
                    break;
                case 'username-empty':
                    usernameEmptyError();
                    break;
                case 'password-empty':
                    passwordEmptyError();
                    break;
                case 'registered':
                    window.location = '/users/register/success';
                    break;
            }
        });
    };

    var clearErrors = function() {
        $('#password-wrapper').removeClass('has-error');
        $('#password-confirm-wrapper').removeClass('has-error');
        $('#password-error').addClass('not-visible');
        $('#password-empty-error').addClass('not-visible');
        $('#username-wrapper').removeClass('has-error');
        $('#username-error').addClass('not-visible');
        $('#username-empty-error').addClass('not-visible');
    }

    var usernameError = function() {
        $('#username-wrapper').addClass('has-error');
        $('#username-error').removeClass('not-visible');
    }

    var passwordError = function() {
        $('#password-wrapper').addClass('has-error');
        $('#password-confirm-wrapper').addClass('has-error');
        $('#password-error').removeClass('not-visible');
    }

    var usernameEmptyError = function() {
        $('#username-wrapper').addClass('has-error');
        $('#username-empty-error').removeClass('not-visible');
    }

    var passwordEmptyError = function() {
        $('#password-wrapper').addClass('has-error');
        $('#password-empty-error').removeClass('not-visible');
    }

    $('.info-popover').popover();

    $('#register-submit-button').on('click', function() {
        console.log('hi');
        register();
    });
});