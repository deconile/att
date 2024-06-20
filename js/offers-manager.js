$(document).ready(function(){

});

$(window).on('load', function(){
    sizeMatch();
    expandOffers();
    launchSide();
    removeNEW();

    setTimeout(function(){
        revealInfo();
        hideOffer();
        completeOffer();
        checkOfferOverflow();
        offerCarousel();
    },500);
});


function expandOffers(){
    let accordion = $('#offers-manager-nav').find('.carat');
    let offer = $('#offers-manager-nav').find('.offer');

    accordion.closest('#offers-manager-nav').removeClass('expanded');

    accordion.on('click', function(){
        $(this).closest('#offers-manager-nav').toggleClass('expanded');
        if($(this).closest('#offers-manager-nav').hasClass('expanded')){
            offer.find('.details').css('max-height',offerH + 'px');
        } else {
            offer.find('.details').css('max-height','0px');
        }

        $('.offer-carousel').children('.overflow-container').scrollLeft(0);

        setTimeout(function(){
            checkOfferOverflow();
        },500);
    });
}




function launchSide(){
    let launch = $('#offers-manager-nav').find('.manage');

    launch.on('click',function(e){
        e.stopPropagation();
        $('#offers-manager-panel').removeClass('out');

        if($(this).hasClass('offer')){
            let id = $(this).attr('id');
            let acc = $('#offers-manager-panel').find('#'+id);

            $('#offers-manager-panel').find('.accordion').removeClass('expanded');
            $('#offers-manager-panel').find('.accordion').children('.content').css('height','0px');

            acc.addClass('expanded');
            acc.children('.content').css('height', acc.children('.content').attr('data') + 'px');
        }
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



function hideOffer(){
    let acc = $('#offers-manager-panel').find('.accordion');

    const eyeOpen = `<path class="svg-base" d="M24.62 9.58a12.24 12.24 0 00-17.24 0L1 16l6.36 6.43a12.19 12.19 0 0017.3 0L31 16zM23.23 21a10.19 10.19 0 01-14.46 0l-5-5 5-5a10.21 10.21 0 0114.4 0l5 5zM16 10a6 6 0 106 6 6 6 0 00-6-6zm0 10a4 4 0 114-4 4 4 0 01-4 4z"/>`
    const eyeClose = `<path class="svg-base" d="M11.77 8.94l-1.5-1.5a12.28 12.28 0 0114.35 2.14L31 16l-6 6.13-1.41-1.42 4.6-4.71-5-5A10.08 10.08 0 0016 8a10.27 10.27 0 00-4.23.94zm9.64 9.64a6 6 0 00-8-8L15 12.15a3.81 3.81 0 011-.15 4 4 0 014 4 3.81 3.81 0 01-.15 1zm7.24 10.07l-1.42 1.41-5.47-5.47a12.21 12.21 0 01-14.41-2.16L1 16l6.07-6.1-5.13-5.13 1.41-1.42 5.21 5.21L10 10l1.77 1.77 1.41 1.41 5.66 5.66 1.41 1.41L22 22l1.43 1.43zM12 16a4 4 0 004 4 3.81 3.81 0 001-.15L12.15 15a3.81 3.81 0 00-.15 1zm8.26 7.09l-1.68-1.68a6 6 0 01-8-8l-2.1-2.1L3.81 16l5 5a10.17 10.17 0 0011.49 2.07z"/>`

    acc.children('.control').find('.eye').on('click', function(e){
        let accordion = $(this).closest('.accordion');
        let control = $(this).closest('.control');
        let id = accordion.attr('id');

        e.stopPropagation();

        accordion.toggleClass('inactive');

        if(accordion.hasClass('inactive')){
            accordion.removeClass('expanded');
            control.siblings('.content').css('height','0px');
            $(this).html(eyeClose);
            $('#offers-manager-nav').find('#'+id).addClass('hidden').hide();
        } else {
            $(this).html(eyeOpen);
            $('#offers-manager-nav').find('#'+id).removeClass('hidden').show();
        }

        checkOfferOverflow();

        // IF ALL HIDDEN * IN PROGRESS * NOT WORKING
        // let offer = $('#offers-manager-nav').find('.offers').children();
        // for(h = 0; h < offer.length; h++){
        //     if(!offer.eq(h).hasClass('hidden')){
        //         console.log('showing at least one');
        //     } else {
        //         console.log('hiding all');
        //     }
        // }

    });
}



// REVEAL INFORMATION WHEN CHECKED
function revealInfo(){
    let rev = $('.accordion').find('.reveal');

    rev.each(function(){

        $(this).prev('.check').on('click', function(){
            let acc = $(this).closest('.content');
            let reveal = $(this).next('.reveal');
            let accH = parseInt(acc.attr('data'));
            let revH = parseInt(reveal.attr('data'));

            if($(this).hasClass('active')){
                acc.attr('data',accH + revH).css('height',accH + revH + 'px');
                reveal.css('height',revH + 'px');
            } else {
                acc.attr('data',accH - revH).css('height',accH - revH+ 'px');
                reveal.css('height','0px');
            }

            // SET INTEREST IN NAV
            let navId = $(this).closest('.accordion').attr('id');
            $('#offers-manager-nav').find('#'+navId).toggleClass('interest');
        });
    });
}


// COMPLETE OFFER
function completeOffer(){
    $('.plan-card').children('.card').on('click', function(){

        let card = $(this)

        //SET ACTION ITEM TO COMPLETE
        $('#offers-manager-panel').find('.action-plan').each(function(){
            $(this).addClass('complete');
            $(this).children('.icon').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 1a15 15 0 1015 15A15 15 0 0016 1zm-2.33 21.08l-5.38-5.37 1.42-1.42 4 4 8.62-8.62L23.71 12z"/></svg>');
            $(this).find('.details').children('p').html(card.find('.plan-name').children('h3').html());
        });
        
        //SET PHONE CATEGORY TO COMPLETE
        $('#offers-manager-panel').find('#offer-id-aphone').addClass('complete');
        $('#offers-manager-panel').find('#offer-id-aphone').find('.carat').children().last().remove();
        $('#offers-manager-panel').find('#offer-id-aphone').find('.carat').append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 1a15 15 0 1015 15A15 15 0 0016 1zm-2.33 21.08l-5.38-5.37 1.42-1.42 4 4 8.62-8.62L23.71 12z"/></svg>');

        //SET PHONE CATEGORY TO COMPLETE
        $('#offers-manager-nav').find('#offer-id-aphone').addClass('complete');
        $('#offers-manager-nav').find('#offer-id-aphone').children('.shaped-container').html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M11.33 26.75l-10-10 1.42-1.42 8.62 8.63 18-18 1.42 1.41z"/></svg>');

    });
}


//REMOVE NEW TAGS
function removeNEW(){
    $('#offers-manager-nav').find('.offer').on('mouseenter',function(){
        let offer = $(this)
        if($(this).children('.new').length >= 1){
            console.log('NEW triggered')
            setTimeout(function(){
                offer.children('.new').remove();
                console.log('timeout')
            },500);
        }
    })
}



// OFFER CAROUSEL

var offerPage;
var offerPages;

function setOffersParams(){
    
}

function checkOfferOverflow(){

    console.log('check overflow');

    let offers = $('.offer-carousel');
    let offerW = offers.find('.offer').first().outerWidth();

    if(offers.closest('#offers-manager-nav').hasClass('expanded')){
        offers.attr('data-dis',offerW);
    } else {
        offers.attr('data-dis',offers.find('.overflow-container').innerWidth());
    }

    let offersAmt = offers.find('.overflow-container').children().not('.hidden').length;

    let offersW = offerW * offersAmt;


    let over = offersW - offers.innerWidth();

    let offerAmt = Math.ceil(over / offerW) + 1;   
    offers.attr('data-pages',offerAmt);

    offerPage = 0;
    offerPages = parseInt(offers.attr('data-pages'));

    if(over > 0){
        offers.children('.overflow-container').addClass('overflowing');
        offers.children('.prev').addClass('inactive');
        offers.children('.next').removeClass('inactive');
    } else {
        offers.children('.overflow-container').removeClass('overflowing');
        offers.children('.prev').addClass('inactive');
        offers.children('.next').addClass('inactive');
    }

}



function offerCarousel(){

    let offers = $('.offer-carousel');
    let control = offers.children('.control');
    let prev = offers.children('.prev');
    let next = offers.children('.next');
    let offerGap = parseInt(offers.children('.overflow-container').css('gap'));

    offerPage = 0;
    offerPages = parseInt(offers.attr('data-pages'));

    control.on('click',function(e){
        e.stopPropagation();
        
        if($(this).hasClass('next')){
            offerPage++
        } else if($(this).hasClass('prev')){
            offerPage--
        }

        pages = parseInt(offers.attr('data-pages'));

        //ACTIVATE ARROW CONTROLS
        control.removeClass('inactive');
        if(offerPage >= offerPages - 1){
            next.addClass('inactive');
        } else if(offerPage <= 0){
            prev.addClass('inactive');
        }

        let offerDis = parseInt(offers.attr('data-dis'));

        //SLIDE CAROUSEL
        offers.children('.overflow-container').scrollLeft((offerDis + offerGap) * offerPage);
    });

}















