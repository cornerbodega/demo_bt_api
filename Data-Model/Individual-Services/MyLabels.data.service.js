angular.module("countryApp")
.factory("MyLabels",
MyLabels
)

function MyLabels(pnDB, $rootScope, pnCols, $location) {
    var _MyLabels = {
        init: init,
        addLabel: addLabel,
        removeLabel: removeLabel,
        getLabelFields: getLabelFields,
        getDefaultLayouts: getDefaultLayouts,
        modifyLabel: modifyLabel
    };

    function getDefaultLayouts() {

        var l = [
            {
                label: 'WAC 314-55-105 (11) Warning',
                id: 'WAC_314-55-105_(11)_Warning Label',
                template: {
                    "A": [
                        {
                            "label": "Custom Text",
                            "type": "pnCustomText",
                            "id": 5,
                            "customText": "Warning: This product has intoxicating effects and may be habit forming. Smoking is hazardous to your health. There may be health risks associated with consumption of this product. Should not be used by women that are pregnant or breastfeeding. For use only by adults twenty-one and older. Keep out of reach of children. Marijuana can impair concentration, coordination, and judgment. Do not operate a vehicle or machinery under the influence of this drug.",
                            "align": "left",
                            "textSize": 10
                        }
                    ]
                }
            },
            {
                id: 'basic_plant_label',
                label: 'Basic Plant Label',
                template:     {
                    "A": [
                        {
                            "label": "container",
                            "type": "container",
                            "id": 1,
                            "columns": [
                                [
                                    {
                                        "id": 3,
                                        "label": "Strain",
                                        "key": "strain",
                                        "type": "item",
                                        "hide": true
                                    }
                                ],
                                [
                                    {
                                        "id": 5,
                                        "label": "Birthday",
                                        "key": "plantBirthday",
                                        "type": "item",
                                        "hide": true
                                    }
                                ]
                            ]
                        },
                        {
                            "label": "Barcode Image",
                            "type": "barcodeImage",
                            "id": 2,
                            "barcodeHeight": 35
                        },
                        {
                            "id": 2,
                            "label": "ID",
                            "key": "id",
                            "type": "item",
                            "hide": true
                        }
                    ]
                },
            },
            {
                id: 'inventory_label_has_qa',
                label:'Inventory Label (has QA)',
                template: {
                    "A": [
                        {
                            "label": "container",
                            "type": "container",
                            "id": 1,
                            "columns": [
                                [
                                    {
                                        "id": 3,
                                        "label": "Strain",
                                        "key": "strain",
                                        "type": "item",
                                        "hide": true,
                                        "textSize": 12,
                                        "align": "left"
                                    }
                                ],
                                [
                                    {
                                        "id": 6,
                                        "label": "Quantity",
                                        "quantityLabel": true,
                                        "key": "pnQuantitiyLabel",
                                        "type": "item",
                                        "hide": true,
                                        "units": "g",
                                        "textSize": 12
                                    }
                                ]
                            ]
                        },
                        {
                            "label": "container",
                            "type": "container",
                            "id": 1,
                            "columns": [
                                [
                                    {
                                        "id": 9,
                                        "label": "Total THC%",
                                        "key": "totalThc",
                                        "type": "item",
                                        "font": "Arial, sans-serif",
                                        "textSize": 12,
                                        "align": "left"
                                    }
                                ],
                                [
                                    {
                                        "id": 14,
                                        "label": "CBD%",
                                        "key": "cbd",
                                        "type": "item",
                                        "textSize": 12,
                                        "align": "center"
                                    }
                                ]
                            ]
                        },
                        {
                            "id": 5,
                            "label": "Type",
                            "key": "inventorytypelabel",
                            "type": "item",
                            "hide": true,
                            "textSize": 12
                        },
                        {
                            "label": "Barcode Image",
                            "type": "barcodeImage",
                            "id": 2,
                            "barcodeHeight": 35
                        },
                        {
                            "id": 2,
                            "label": "ID",
                            "key": "id",
                            "type": "item",
                            "hide": true,
                            "textSize": 12
                        }
                    ]
                },
            },
            {
                id: 'retailer',
                label:'Retail Back Label',
                template: {
                    "A": [
                        {
                            "label": "container",
                            "type": "container",
                            "id": 1,
                            "columns": [
                                [
                                    {
                                        "id": 3,
                                        "label": "Strain",
                                        "key": "strain",
                                        "type": "item",
                                        "hide": true,
                                        "textSize": 9,
                                        "align": "left"
                                    }
                                ],
                                [
                                    {
                                        "id": 20,
                                        "label": "Net Weight",
                                        "detail": true,
                                        "key": "usable_weight",
                                        "type": "item",
                                        "hide": false,
                                        "textSize": 9,
                                        "align": "left",
                                        "units": "g"
                                    }
                                ]
                            ]
                        },
                        {
                            "label": "container",
                            "type": "container",
                            "id": 1,
                            "columns": [
                                [
                                    {
                                        "id": 9,
                                        "label": "Total THC%",
                                        "key": "totalThc",
                                        "type": "item",
                                        "font": "Arial, sans-serif",
                                        "textSize": 10,
                                        "align": "left"
                                    }
                                ],
                                [
                                    {
                                        "id": 14,
                                        "label": "CBD%",
                                        "key": "cbd",
                                        "type": "item",
                                        "textSize": 10,
                                        "align": "left"
                                    }
                                ]
                            ]
                        },
                        {
                            "label": "container",
                            "type": "container",
                            "id": 1,
                            "columns": [
                                [
                                    {
                                        "label": "My Name",
                                        "me": sessionStorage.myName + " (" +sessionStorage.myLocation +")",
                                        "type": "me",
                                        "id": 2,
                                        "textSize": 8,
                                        "align": "left"
                                    }
                                ],
                                [
                                    {
                                        "id": 9,
                                        "label": "Total Cannabinoids%",
                                        "detail": true,
                                        "key": "totalCannabinoids",
                                        "type": "item",
                                        "textSize": 9,
                                        "align": "left"
                                    }
                                ]
                            ]
                        },
                        {
                            "id": 7,
                            "label": "Retailer",
                            "key": "manifestedToNameLicense",
                            "type": "item",
                            "textSize": 12
                        },
                        {
                            "label": "Barcode Image",
                            "type": "barcodeImage",
                            "id": 2,
                            "barcodeHeight": 35
                        },
                        {
                            "id": 2,
                            "label": "ID",
                            "key": "id",
                            "type": "item",
                            "hide": true,
                            "textSize": 11
                        }
                    ]
                },
            },
        ]
        return l
    }
    function init() {
        console.log('init my labels');
        return pnDB.getFromDB('select * from labels where created_by = "'+sessionStorage.ubi+'" and deleted="0"')
        .then(function (res) {
            console.log(res);
            _.map(res.data, function (l) {
                l.label = l.name
            })

            // .data = _.filter(res.data, {deleted: "0"})
            var t = [
                {
                    id: 'label_add',
                    pnAction: true,
                    labelName:'Create a New Label Template',
                    label:'Create a New Label Template',
                    pnOnSelectAction: function () {
                        // console.log('pnOnSelectAction');
                        // console.log($location);
                        $location.path('/traceability/labels/label_templates/label_add')
                    }
                }
            ]
            // _l.data.concat(t)
            // console.log(_l.data);
            // console.log(t);
            t = res.data.concat(t)
            // _l.data = t

            _MyLabels.data = t
            $rootScope.$broadcast('my_label')
            $rootScope.$broadcast('myLabels')

        })
    }

    getLabelFields()

    function getLabelFields(type) {
        var d =  [
            // {label: "Strain", id: 'strain'},
            // {label: "Strain", id: 'strain'},
            {label: "container", type:"container", id: 1, columns: [[], []]},
            {label: "Custom Text", type:"pnCustomText", id: 5 },
            {label: "My Name", me: sessionStorage.myName + " ("+sessionStorage.myLocation +")", type:"me", id: 2, },
            {label: "Barcode", type:"barcodeImage", id: 3 },
            {label: "Image", type:"image", id: 4 },
        ]
        var inventoryCols = pnCols(type)
        // console.log(inventoryCols);
        // console.log(type);
        var colid =0
        _.map(inventoryCols, function (col) {
            col.key = angular.copy(col.id)
            col.type = "item"
            col.id = colid
            colid++
        })

        return d.concat(inventoryCols)
        // return
        // $rootScope.$broadcast('myLabelTemplates')
    }

    function removeLabel(label_id_to_remove) {
        return pnDB.saveToDB('labels', {id: label_id_to_remove, deleted: 1}).then(function (res) {
            console.log(res);
        })
    }
    function addLabel(request) {
        delete request.action
        return pnDB.saveToDB('labels', request).then(function (res) {
            console.log(res);
        })
    }

    function modifyLabel(form) {
        var req = {}
        req.id = form.id
        req.name = form.name
        req.category = form.category
        req.page_template = form.page_template
        req.label_template = form.label_template
        return pnDB.saveToDB('labels', req).then(function (res) {
            console.log(res);
        })
    }


    return _MyLabels;


};
