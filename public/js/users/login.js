/**
 * Created by PaulPa on 7/2/2014.
 */
$(function() {
    $('#login-button').on('click', function() {
        window.location = '/users/login';
    });

    $('#register-button').on('click', function() {
        window.location = '/users/register';
    });
});