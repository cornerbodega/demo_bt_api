angular.module('countryApp')
.directive('pnForumPostButtons', pnForumPostButtons)
.directive('pnForumEditPostButtons', pnForumEditPostButtons)

function pnForumPostButtons() {
    return {
        templateUrl: 'pnForum/directives/pnForumPostButtons.template.html'
    }
}

function pnForumEditPostButtons() {
    return {
        templateUrl: 'pnForum/directives/pnForumEditPostButtons.template.html'
    }
}
