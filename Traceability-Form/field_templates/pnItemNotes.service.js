angular.module('countryApp')
.factory('pnItemNotes', pnItemNotes)

function pnItemNotes() {
    return {
        notesByConcerningId: {}
    }


}
