$(document).on('ready', function(){
    adjustSize();

    $(window).resize(function(){
        DCYOffset = Math.ceil(($(window).innerHeight() * 0.3) + 50);
    });

});

var DCYOffset;

function adjustSize(){

    let deviceCarousel = $('#device-carousel');
    let DCYPos = deviceCarousel.offset().top;
    DCYOffset = Math.ceil(($(window).innerHeight() * 0.3) + 50);
    
    $(window).scroll(function() {

        if(!deviceCarousel.hasClass('full')){
            DCYOffset = Math.ceil(($(window).innerHeight() * 0.3) + 50);
        } else {
            DCYOffset = 0;
        }

        if(Math.ceil($('html, body').scrollTop()) > DCYPos - 100) {
            deviceCarousel.addClass('full');
        }

        if(Math.ceil($('html, body').scrollTop()) <= 20) {
            deviceCarousel.removeClass('full');
        }

        setTimeout(function(){
            getScrollPositions();
        },1100);
        

    });

}