$(document).ready(function(){

});

$(window).on('load', function(){
    sizeMatch();
    expandOffers();
    launchSide();
});

function expandOffers(){
    let accordion = $('#offers-manager-nav');
    let offer = $('#offers-manager-nav').find('.offer');
    // let label = $('#offers-manager-nav').find('.offers').children('.label');
    let content = $('#offers-manager-nav').find('.offer').children('.content').children('.details');

    accordion.removeClass('expanded');

    //content.hide();
    accordion.on('click', function(){
        $(this).toggleClass('expanded');
        if($(this).hasClass('expanded')){
            offer.find('.details').css('max-height',offerH + 'px');
        } else {
            offer.find('.details').css('max-height','0px');
        }
    });
}

function launchSide(){
    let launch = $('#offers-manager-nav').find('.manage');

    launch.on('click',function(e){
        e.stopPropagation();
        $('#offers-manager-panel').removeClass('out');
    });
}

var offerHs = [];
var offerH;

function sizeMatch(){
    let offer = $('#offers-manager-nav').find('.offer');
    for(m = 0; m < offer.length; m++){
        offer.find('.details').each(function(){
            offerHs.push($(this).find('.wrapper').outerHeight());
            offerH = Math.max(...offerHs);
        });
    }
}