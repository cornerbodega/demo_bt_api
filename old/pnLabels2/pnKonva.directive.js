angular.module('countryApp')
.directive("pnKonva", pnKonva)

function pnKonva() {
    return {
        templateUrl: 'pnLabels2/pnKonva.template.html',
        link: function ($scope, elem, attrs) {
            // console.log("Direct!");
            var width = window.innerWidth;
            var height = window.innerHeight;

            function update(activeAnchor) {
                var group = activeAnchor.getParent();

                var topLeft = group.get('.topLeft')[0];
                var topRight = group.get('.topRight')[0];
                var bottomRight = group.get('.bottomRight')[0];
                var bottomLeft = group.get('.bottomLeft')[0];
                var image = group.get('Image')[0];

                var anchorX = activeAnchor.getX();
                var anchorY = activeAnchor.getY();

                // update anchor positions
                switch (activeAnchor.getName()) {
                    case 'topLeft':
                    topRight.setY(anchorY);
                    bottomLeft.setX(anchorX);
                    break;
                    case 'topRight':
                    topLeft.setY(anchorY);
                    bottomRight.setX(anchorX);
                    break;
                    case 'bottomRight':
                    bottomLeft.setY(anchorY);
                    topRight.setX(anchorX);
                    break;
                    case 'bottomLeft':
                    bottomRight.setY(anchorY);
                    topLeft.setX(anchorX);
                    break;
                }

                image.position(topLeft.position());

                var width = topRight.getX() - topLeft.getX();
                var height = bottomLeft.getY() - topLeft.getY();
                if(width && height) {
                    image.width(width);
                    image.height(height);
                }
            }
            function addAnchor(group, x, y, name) {
                var stage = group.getStage();
                var layer = group.getLayer();

                var anchor = new Konva.Circle({
                    x: x,
                    y: y,
                    stroke: '#666',
                    fill: '#ddd',
                    strokeWidth: 2,
                    radius: 8,
                    name: name,
                    draggable: true,
                    dragOnTop: false
                });

                anchor.on('dragmove', function() {
                    update(this);
                    layer.draw();
                });
                anchor.on('mousedown touchstart', function() {
                    group.setDraggable(false);
                    this.moveToTop();
                });
                anchor.on('dragend', function() {
                    group.setDraggable(true);
                    layer.draw();
                });
                // add hover styling
                anchor.on('mouseover', function() {
                    var layer = this.getLayer();
                    document.body.style.cursor = 'pointer';
                    this.setStrokeWidth(4);
                    layer.draw();
                });
                anchor.on('mouseout', function() {
                    var layer = this.getLayer();
                    document.body.style.cursor = 'default';
                    this.setStrokeWidth(2);
                    layer.draw();
                });

                group.add(anchor);
            }

            var stage = new Konva.Stage({
                container: 'container',
                width: width,
                height: height
            });

            var layer = new Konva.Layer();
            stage.add(layer);


            $scope.save = function () {
                var image = new Image()
                image.onload = function () {
                    proceed()
                }
                hideAnchors()
                image.src = stage.toDataURL()

                function proceed() {
                    window.open(image.src);

                    var newCanvas = document.createElement('canvas');
                    var w = 100;
                    var h = 500;
                    newCanvas.width = w;
                    newCanvas.height = h;
                    var newContext = newCanvas.getContext('2d');
                    var x = 0;
                    var y = 0;
                    newContext.drawImage(image, x, y, w, h, 0, 0, w, h);

                    var newImage = document.createElement('img');
                    newImage.src = newCanvas.toDataURL();

                    // canvas = document.createElement('canvas'),
                    // ctx = canvas.getContext('2d');
                    // ctx.drawImage(image,50,50,image.width,image.height,0,0,50,50);


                    // var dataURL = canvas.toDataURL();
                    window.open(newImage.src);
                }

            }
            function hideAnchors(group) {
                console.log(group);
            }
            initElements()

            function initElements() {
                // darth vader
                // var darthVaderImg = new Konva.Image({
                //     width: 200,
                //     height: 137
                // });
                //
                // // yoda
                // var yodaImg = new Konva.Image({
                //     width: 93,
                //     height: 104
                // });


                makeImage({
                    x: 180,
                    y: 50,
                    height: 137,
                    width: 200,
                    url: 'img/potlogo-36.png',
                    id: 'cartman'
                })

                makeImage({
                    x: 20,
                    y: 110,
                    height: 137,
                    width: 200,
                    url: 'img/potlogo-01.png',
                    id: 'vader'
                })
                var register = {
                    groups: {},
                    images: {}
                }
                function makeImage(params) {
                    var darthVaderImg = new Konva.Image({
                        width: params.width,
                        height: params.height
                    });
                    var imageObj1 = new Image();
                    imageObj1.onload = function() {
                        darthVaderImg.image(imageObj1);
                        var darthVaderGroup = new Konva.Group({
                            x: params.x,
                            y: params.y,
                            draggable: true
                        });
                        console.log(darthVaderImg.width());
                        console.log(darthVaderImg.height());
                        layer.add(darthVaderGroup);
                        darthVaderGroup.add(darthVaderImg);
                        addAnchor(darthVaderGroup, 0, 0, 'topLeft');
                        addAnchor(darthVaderGroup, darthVaderImg.width(), 0, 'topRight');
                        addAnchor(darthVaderGroup, darthVaderImg.width(), darthVaderImg.height(), 'bottomRight');
                        addAnchor(darthVaderGroup, 0, darthVaderImg.height(), 'bottomLeft');
                        layer.draw();
                    };
                    imageObj1.src = params.url;

                }


                // var imageObj2 = new Image();
                //
                // imageObj2.onload = function() {
                //     yodaImg.image(imageObj2);
                //     var yodaGroup = new Konva.Group({
                //         x: 20,
                //         y: 110,
                //         draggable: true
                //     });
                //     layer.add(yodaGroup);
                //     yodaGroup.add(yodaImg);
                //     addAnchor(yodaGroup, 0, 0, 'topLeft');
                //     addAnchor(yodaGroup, 93, 0, 'topRight');
                //     addAnchor(yodaGroup, 93, 104, 'bottomRight');
                //     addAnchor(yodaGroup, 0, 104, 'bottomLeft');
                //     layer.draw();
                // };
                // imageObj2.src = 'img/potlogo-01.png';

            }


            //     var data = canvas.toDataURL();
            //     // e.src  =data
            //     console.log(data);
            //     var docDefinition = {
            //
            //         // pageOrientation: 'portrait',
            //         content: [{
            //             image: data,
            //             width: oldWidth,
            //             height: oldHeight,
            //
            //
            //         }],
            //         pageSize: {
            //             width: oldWidth,
            //             height: oldHeight,
            //         },
            //         pageMargins: [ 0, 0, 0, 0 ],
            //     };
            //     pdfMake.createPdf(docDefinition).download("labels_"+  Date.now()+".pdf");
        }
    }
}
