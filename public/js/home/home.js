$(function() {
    $.get('/actions/getAllCodeivateUsers', function(data)  {
    	codeivateUsersViewModel.users(JSON.parse(data));
    });
});


