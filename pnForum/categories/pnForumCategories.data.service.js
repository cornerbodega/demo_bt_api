angular.module('countryApp')
.factory('pnForumCategories', pnForumCategories)

function pnForumCategories() {
    return {
        data: 
        [
            {
                id: 'news',
                label: 'News',
                desc: 'News and announcements of ABC releases'
            },
            {
                id: 'how_do_i',
                label: 'How Do I...?',
                desc: 'This is the place to ask questions... and to find answers'
            },
            {
                id: 'bugs',
                label: 'Bugs',
                desc: 'This forum is for bug reports and discussions'
            },
            {
                id: 'feature_requests',
                label: 'Feature Requests',
                desc: 'Suggest new features'
            },
            {
                id: 'tips_tricks',
                label: 'Samples, Tips and Tricks',
                desc: 'Show off what you can do with ABC'
            },
            {
                id: 'documentation',
                label: 'Documentation',
                desc: 'Comments and questions about the ABC Traceability documentation'
            },
        ]
    }
}
