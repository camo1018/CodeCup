var activeMasonry = new Masonry($('#active-user-container').get(0), {
    columnWidth: 200
});

var inactiveMasonry = new Masonry($('#inactive-user-container').get(0), {
    columnWidth: 200
});

$(function() {
    $.get('/actions/getAllCodeivateUsers', function(data)  {
        var users = JSON.parse(data);
        var activeUsers = Enumerable.From(users).Where(function (x) { return x.programming_now == true}).ToArray();
        var inactiveUsers = Enumerable.From(users).Where(function (x) { return x.programming_now == false}).ToArray();
    	codeivateUsersViewModel.activeUsers(activeUsers);
        codeivateUsersViewModel.inactiveUsers(inactiveUsers);
    });

    $('#login-button').on('click', function() {
        window.location = '/users/login';
    });

    $('#register-button').on('click', function() {
        window.location = '/users/register';
    });
});
