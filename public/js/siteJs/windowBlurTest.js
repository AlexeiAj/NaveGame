var fcs = true;
$(document).bind('focus', function() {
   console.log('welcome (back)');
   fcs = true;
}).bind('blur', function() {
   console.log('bye bye');
   fcs = false;
});
/*$(window).focus(function() {
   console.log('welcome (back)');
   fcs = true;
});

$(window).blur(function() {
   console.log('bye bye');
   fcs = false;
});*/