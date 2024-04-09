$(window).on('load', function(){
    
});

$(window).on('resize',function(){
    wh = $(window).height();
});

var wh = $(window).height();




// INDIVIDUAL JUMP LINKS *************************/
function jumpBoltOns(){
    let loc = $('#boltons').offset().top;
    let ch = $('#boltons').outerHeight();

    $('html, body').animate({
        scrollTop: loc - ((wh / 2) - (ch / 2))
    }, 1000);
}