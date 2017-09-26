angular.module('countryApp').directive('pnPrintThisElement', pnPrintThisElement)

function pnPrintThisElement() {
    return {
        link: function ($scope, elem, attrs) {
            // console.log(elem.prop('offsetHeight'));
            setTimeout(function () {
                // console.log(elem);
                var body = angular.element(document).find('body').eq(0);

                var bigCanvas = angular.element('<div></div>')
                // var bigCanvas = document.createElement('div')
                // var bigCanvas = angular.element('#bigCanvas2')
                // console.log(bigCanvas);
                // console.log('pnLabelRoot Height  '+ angular.element('#pnLabelRoot').height() );

                // console.log(body);
                // bigCanvas.appendTo(body)
                body.append(bigCanvas)
                var scaledElement = angular.element('#pnLabelRoot').clone().css({'transform': 'scale(3,3)','transform-origin': '0 0' }) ;
                scaledElement.appendTo(bigCanvas)
                // console.log('Big Canvas height ' + bigCanvas.height);
                // console.log('Big Canvas height ' + bigCanvas.prop('offsetHeight'));

                // console.log(' pnLabelRoot height ' + angular.element('#pnLabelRoot').prop('offsetHeight'));
                // console.log(' scaledElement height ' + scaledElement.prop('offsetHeight'));
                // console.log(' scaledElement height ' + scaledElement.height());

                var oldWidth = scaledElement.width();
                var oldHeight = scaledElement.height();

                var newWidth = oldWidth * 3;
                var newHeight = oldHeight * 3;

                body.css({
                  'width': newWidth,
                  'height': newHeight
                })
                // body.css({
                //   'width': angular.element('#pnLabelRoot').width() * 3,
                //   'height': angular.element('#pnLabelRoot').height() * 3
                // })
                bigCanvas.css({
                  'width': newWidth,
                  'height': newHeight
                })
                // bigCanvas.height = newHeight
                // bigCanvas.width = newWidth
                // console.log('oldHeight' + oldHeight);
                // console.log('oldWidth' + oldWidth);
                // console.log('bigCanvas.height ' + bigCanvas.height);
                // console.log('bigCanvas.width ' + bigCanvas.width);
                // console.log('oldWidth' + oldWidth);
                // angular.element('#pnLabelRoot')

                // var bigCanvas2 = angular.element('#bigCanvas2')
                bigCanvas2 = bigCanvas
                // console.log('Big Canvas height ' + bigCanvas.prop('offsetHeight'));
                //
                html2canvas(angular.element('#pnLabelRoot'), {
                    useCORS: true,
                    scale: 3,

                    onrendered: function (canvas) {
                        var data = canvas.toDataURL();
                        // window.open(data)
                        var docDefinition = {

                            // pageOrientation: 'portrait',
                            content: [{
                                image: data,
                                width: oldWidth,
                                height: oldHeight,


                            }],
                            pageSize: {
                                width: oldWidth,
                                height: oldHeight,
                            },
                            pageMargins: [ 0, 0, 0, 0 ],
                        };
                        pdfMake.createPdf(docDefinition).download("labels_"+  Date.now()+".pdf");
                        // pdfMake.createPdf(docDefinition).open()
                        // bigCanvas.hide()
                        // pdfMake.createPdf(docDefinition).download("labels_"+  Date.now()+".pdf");
                        bigCanvas.hide()
                    }
                })
                // console.log(elem.prop('offsetHeight'));

            }, 1000)

        }
    }
}
