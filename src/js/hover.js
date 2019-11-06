$(function() {
    $('.directory .gallery a').hover(function() {
        console.log('test');
        $('.directory .gallery').css('background-color', 'yellow');
    }, function() {
        // on mouseout, reset the background colour
        $('.directory .gallery').css('background-color', '');
    });
});