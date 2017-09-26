angular.module("countryApp")
.factory("PageTemplates", PageTemplates)

function PageTemplates(pnDB, $rootScope, $location) {
    var _l = {
        init: init,
        remove: remove,
        addPageTemplate: addPageTemplate,
        getHeightAndWidthFromString: getHeightAndWidthFromString
    };

    init();

    function addPageTemplate(request) {
        // console.log(request);
        delete request.action
        return pnDB.saveToDB('page_templates',request)
    }

    function getHeightAndWidthFromString(string) {

        // "height:1.125in;width:3.75in;"
        var h = 0
        var w = 0
        var r = {
            height: h,
            width: w
        }
        var sides = string.split(";")
        sides.map(function (side) {
            //["height:1.25in", "width:3.75in"]

            var vals = side.split(":")
            // ["height", 1.25in]

            if(vals[0]==='height') {
                r.height = stripIn(vals[1])
            }
            if(vals[0]===' width' || vals[0] ==='width') {
                r.width=stripIn(vals[1])
            }
            function stripIn(toStrip){


                var stripped = toStrip.split('in')[0]

                return stripped
            }
        })


        return r
    }

    function remove(page_template_id_to_remove) {
        // pnDB.getFromDB('select * from page_templates where created_by="' + sessionStorage.ubi+'" and id="'+page_template_to_remove.id+'"')
        // .then(function (res) {
        //     console.log(res.data);
        // })
        return pnDB.saveToDB('page_templates', {
            id: page_template_id_to_remove,
            deleted: 1,
        })
    }

    function init() {
        pnDB.getFromDB('select * from page_templates where created_by="' + sessionStorage.ubi+'" or isDefaultTemplate="1" order by `id` desc')
        .then(function(res){
            _l.data = _.filter(res.data, {deleted: "0"})
            _.map(res.data, function (d) {
                 d.labelsPerPage = +d.cols * +d.rows
                 var hw = getHeightAndWidthFromString(d.labelSize)
                 d.labelSizeString = ''+hw.width+'" x '+hw.height+'"'
                //  console.log(d.labelSize);
            })

            // var t = [
            //     {
            //         id: 'page_template_add',
            //         pnAction: true,
            //         labelName:'Create a New Page Template',
            //         pnOnSelectAction: function () {
            //             $location.path('/traceability/labels/page_templates/page_templates_add')
            //         }
            //     }
            // ]
            // t = _l.data.concat(t)
            // _l.data = t
            $rootScope.$broadcast('page_template')
        })
    }

    return _l;

};
