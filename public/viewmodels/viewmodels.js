/* Master javascript file that will load all viewmodels.  For all pages that use viewmodels, load this script instead of loading individual ones. */

function include(file) {
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';

    var elementsByTagName = document.getElementsByTagName('body');
    elementsByTagName.item(elementsByTagName.length-1).appendChild(script);
}

// List all viewmodels here.
include('viewmodels/codeivateUsers.js');