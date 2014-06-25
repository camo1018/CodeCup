// Requires MasonryLoader

function CodeivateUsersViewModel() {
    this.addToActiveMasonry = function(element, index, data) {
        activeMasonry.appended(element);
    };
    this.addToInactiveMasonry = function(element, index, data) {
        inactiveMasonry.appended(element);
    };
    this.activeUsers = ko.observableArray();
    this.inactiveUsers = ko.observableArray();
}

var codeivateUsersViewModel = new CodeivateUsersViewModel();

ko.applyBindings(codeivateUsersViewModel);