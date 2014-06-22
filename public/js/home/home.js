/**
 * Created by Paul on 6/21/2014.
 */

 var masonry = new Masonry($('#user-container').get(0), {
 	columnWidth: 200
 });

 function CodeivateUsersViewModel() {
 	this.addToMasonry = function(element, index, data) {
 		masonry.appended(element);
 		console.log('adding');
 	};
 	this.users = ko.observable([]);
 }

 var codeivateUsersViewModel = new CodeivateUsersViewModel();

$(function() {
    var params = { username: 'camo1018' };
    $.get('/actions/getAllCodeivateUserInfo', params, function(data)  {
    	codeivateUsersViewModel.users(JSON.parse(data));
    });
});

ko.applyBindings(codeivateUsersViewModel);
