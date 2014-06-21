/**
 * Created by Paul on 6/21/2014.
 */
$(function() {
    var params = { username: 'camo1018' };
    $.get('/actions/getCodeivateUserInfo', params, function(data)  {
        $('#test').html(data);
    });
});