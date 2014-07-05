/**
 * Created by PaulPa on 7/4/2014.
 */
$.get('/templates/header.html', function(data) {
    $('body').prepend(data);

    $('#logout-button').on('click', function() {
        $.post('/actions/users/logout', function() {
            window.location.reload();
        });
    })

    var logoutView = function() {
        $('#wrapper-no-login').removeClass('not-visible');
        $('#wrapper-login').addClass('not-visible');
    }

    var loginView = function(username) {
        $('#wrapper-no-login').addClass('not-visible');
        $('#wrapper-login').removeClass('not-visible');
        $('#navbar-username').html(username);
    }

    $.get('/actions/users/getSessionUser', function(data) {
        if (data == '') {
            logoutView();
        }
        else {
            loginView(data);
        }
    });
});