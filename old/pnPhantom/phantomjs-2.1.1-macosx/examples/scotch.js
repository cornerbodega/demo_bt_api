var webpage = require('webpage').create();

webpage.open('http://localhost:5000/#/traceability/labels/label_view', function() {
    webpage.render('scotch2.png');
    phantom.exit();
});
