angular.module('countryApp')
.directive('pnPrint', pnPrint)
.directive('pnPrintManifest', pnPrintManifest)

function pnPrintManifest() {
    return {
        restrict: 'E',
        templateUrl: 'pnPrint/pnPrint.template.html',
        link: function($scope, elem, attrs) {
            $scope.pnPrint = function () {
                printDiv(attrs.toPrint)
            }
            function printDiv (divName) {
                var printContents = document.getElementById(divName).innerHTML;
                var originalContents = document.body.innerHTML;

                if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                    var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
                    popupWin.window.focus();
                    popupWin.document.write('<!DOCTYPE html><html><head>' +
                    '<link rel="stylesheet" type="text/css" href="styles/style.css" />' +
                    '<link rel="stylesheet" href="bower_components/angular-material/angular-material.css" />' +
                    '' +
                    '</head><body onload="window.print()" flex><div class="container" flex></div>' + printContents + '</div></html>');
                    popupWin.onbeforeunload = function (event) {
                        popupWin.close();
                        return '.\n';
                    };
                    popupWin.onabort = function (event) {
                        popupWin.document.close();
                        popupWin.close();
                    }
                } else {
                    var popupWin = window.open('', '_blank', 'width=800,height=600');
                    popupWin.document.open();
                    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</html>');
                    popupWin.document.close();
                }
                popupWin.document.close();

                return true;
            }

        }
    }
}
function pnPrint($rootScope, $window, pnDB) {
    return {
        restrict:'E',
        // scope: {},
        templateUrl: 'pnPrint/pnPrint.template.html',
        link: function($scope, elem, attrs) {
            // console.log(document.getElementById(attrs.pnType));
            $scope.pnPrint = function() {
                console.log();

                printDiv3()
                // attrs.toPrint = attrs.toPrint
                // printDiv2(attrs.toPrint)
                // console.log('TO PRINT!!');
            }
        
            function printDiv3() {
                var l = $scope.model.label_template
                var p = $scope.model.page_template
                console.log($scope.model);
                var i = $scope.model[$scope.model.my_label.category][0]
                var id = makeid();

                console.log(l);
                console.log(p);
                console.log(i);
                console.log(id);

                pnDB.saveToDB('labels_to_print',
                    {
                        id: id,
                        label: JSON.stringify({
                            page_template: JSON.stringify(p),
                            label_template: JSON.stringify(l),
                            item: JSON.stringify(i),
                        })
                    }
                ).then(function () {
                    $window.open('https://abctraceability.com/wa/#/print_labels?id='+id, '_blank');
                })
                // var printContents = document.getElementById(divName).innerHTML;
                // var printTab =






                // popupWin.window.focus();
                // printTab.document.write('<div>' + printContents + '</div></html>');
                // printTab.onbeforeunload = function (event) {
                //     popupWin.close();
                //     return '.\n';
                // };
                // printTab.onabort = function (event) {
                //     popupWin.document.close();
                //     popupWin.close();
                // }
            }

            // function printDiv2(toPrint) {
            //     if(!toPrint) return
            //
            //     html2canvas(document.getElementById(toPrint), {
            //         onrendered: function (canvas) {
            //             var width = document.getElementById(toPrint).clientWidth
            //             var data = canvas.toDataURL();
            //             var docDefinition = {
            //                 content: [{
            //                     image: data,
            //                     width: 500, // ??
            //                 }]
            //             };
            //             pdfMake.createPdf(docDefinition).download("labels_"+  Date.now()+".pdf");
            //         }
            //     });
            // }
        }
    }
}
