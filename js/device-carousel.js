$(document).on('ready', function(){
    adjustSize();
    deviceCarousel();
    // $(window).resize(function(){
    //     DCYOffset = Math.ceil(($(window).innerHeight() * 0.3) + 50);
    // });

});

var DCYOffset;

function adjustSize(){

    let deviceCarousel = $('#device-carousel');
    //let DCYPos = deviceCarousel.offset().top;
    //DCYOffset = Math.ceil(($(window).innerHeight() * 0.3) + 50);
    let headerHeight = $('header').outerHeight();
    $(window).scroll(function() {

        // if(!deviceCarousel.hasClass('full')){
        //     DCYOffset = Math.ceil(($(window).innerHeight() * 0.3) + 50);
        // } else {
        //     DCYOffset = 0;
        // }

        if(Math.ceil($('html, body').scrollTop()) > headerHeight) {
            deviceCarousel.addClass('full');
        } else {
            deviceCarousel.removeClass('full');
        }

        setTimeout(function(){
            getScrollPositions();
        },1100);
        
    });

}

function deviceCarousel(){
    let scrollDis = 0;
    let imageWidth = $('#device-images').outerWidth();
    let carousel = $('#device-carousel').find('#device-images');
    let bubbles = $('#device-carousel').find('.pagination');

    //ADD PAGE BUBBLES
    let bubbleElem = `<div></div>`;
    let pages = carousel.children().length;
    //
    for(b = 0; b < pages; b++){
        bubbles.append(bubbleElem);
    }

    bubbles.children().first().addClass('active');

    //CONTROLS
    let prev = $('#device-carousel').find('.prev').find('svg');
    let next = $('#device-carousel').find('.next').find('svg');

    prev.on('click',function(){
        scrollDis = scrollDis - imageWidth;
        carousel.scrollLeft(scrollDis);
        bubbles.find('.active').prev().addClass('active');
        bubbles.find('.active').last().removeClass('active');
        if(bubbles.children().first().hasClass('active')){
            $(this).parent().addClass('inactive');
        }
        next.parent().removeClass('inactive');
    });

    next.on('click',function(){
        scrollDis = scrollDis + imageWidth;
        carousel.scrollLeft(scrollDis);
        bubbles.find('.active').next().addClass('active');
        bubbles.find('.active').first().removeClass('active');
        if(bubbles.children().last().hasClass('active')){
            $(this).parent().addClass('inactive');
        }
        prev.parent().removeClass('inactive');
    });

    //PAGINATION
    let pageAmt = $('#device-images').children().length;
    let page = $('#device-carousel').find('.pagination').children();
    page.on('click',function(){
        let pageNum = $(this).index();
        scrollDis = imageWidth * pageNum;
        carousel.scrollLeft(scrollDis);
        
        page.removeClass('active');
        $(this).addClass('active');
        if(pageNum === 0){
            prev.parent().addClass('inactive');
        } else if(pageNum === pageAmt - 1){
            next.parent().addClass('inactive');
        } else {
            prev.parent().removeClass('inactive');
            next.parent().removeClass('inactive');
        }
    });
}