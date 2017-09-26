angular.module('countryApp')
.controller('pnBusinessModelCanvasController', pnBusinessModelCanvasController)

function pnBusinessModelCanvasController($scope, pnDB) {
    $scope.comments = {}
    getComments()

    function getComments() {
        pnDB.getFromDB('select * from pnBusinessModelCanvas').then(function (res) {
            _.map(res.data, function (r) {
                $scope.comments[r.id] = r.comment
            })
            console.log($scope.comments);
        })
    }
    $scope.saveComment = function (option) {
        var id = option.id
        pnDB.saveToDB('pnBusinessModelCanvas', {
            at: Date.now(),
            id: id,
            comment: $scope.comments[id]
        }).then(function (res) {
            console.log(res);
            getComments()
            option.col = _.findWhere(boxes(), {id: id}).col
            option.row = _.findWhere(boxes(), {id: id}).row
        })
    }
    $scope.selectBox = function (id) {
        _.map($scope.boxes[id], function (box) {
            box.col = _.findWhere(boxes(), {id: id}).col
        })
        if(_.findWhere($scope.boxes, {id: id}).col === 5) {
            console.log(id);
            // if (_.findWhere(boxes(), {id: id}).col) {
            var c = _.findWhere(boxes(), {id: id}).col
            // }
            // if (_.findWhere(boxes(), {id: id}).row) {
            var r = _.findWhere(boxes(), {id: id}).row
            // }
            // else {
            //     var c = 1
            //     var r = 1
            // }
            console.log(r);
            // console.log('ALREADTY' + _.findWhere(boxes(), {id: id}).col);
            _.findWhere($scope.boxes, {id: id}).col = c
            _.findWhere($scope.boxes, {id: id}).row = r
        } else {
            _.findWhere($scope.boxes, {id: id}).col = 5
            _.findWhere($scope.boxes, {id: id}).row = 3
        }

    }
    function boxes() {
        var b = [
            {
                l: 'Key Partners',
                row: 2,
                color: 'blue',
            },
            {
                l: 'Key Activities',
                color: 'red',
            },
            {
                l: 'Value Propositions',
                row: 2,
                color: 'purple',
            },
            {
                l: 'Customer Relationships',
                color: 'orange',
            },

            {
                l: 'Customer Segments',
                row: 2,
                color: 'grey',
            },
            {
                l: 'Key Resources',
                color: 'green',
            },

            {
                l: 'Channels',
                color: 'yellow',
            },
            {
                l: 'Cost Structure',
                color: 'pink',
                col: 2
            },
            {
                l: 'Revenue Streams',
                color: 'brown',
                col: 3
            },


        ]
        _.map(b, function (box) {
            box.id = box.l.split(' ').join('_')
            if (!box.col) box.col = 1
            if (!box.row) box.row = 1

        })
        return b
    }


    // {
    //     l: 'Cost Structure',
    // },
    // {
    //     l: 'Revenue Streams',
    // },


    $scope.boxes = angular.copy(boxes())
}
