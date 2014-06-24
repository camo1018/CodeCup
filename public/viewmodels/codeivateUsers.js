// Requires MasonryLoader

function CodeivateUsersViewModel() {
    this.addToMasonry = function(element, index, data) {
        masonry.appended(element);
        console.log('adding');
    };
    this.users = ko.observable([]);
}

var codeivateUsersViewModel = new CodeivateUsersViewModel();

ko.applyBindings(codeivateUsersViewModel);