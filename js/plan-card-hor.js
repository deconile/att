var initHeight;
var accHeight;

$(window).load(function(){
    selectCard();
    
    cardCarousel();
    collapseDetails();

    setTimeout(function(){
        //INITIAL HIDE CARD ACCORDIONS
        setHeaderHeights();
        getCollapsedAccordionHeights();
        openAccordions();
        setPagination();
        setPages();
    },100);
});

function setHeaderHeights(){
    let ih = []
    $('#plans-cards').find('.card').each(function(){
        ih.push($(this).find('.header').outerHeight())
    });
    initHeight = Math.max(...ih);
    if(!$('#plans-cards').find('.card').hasClass('active')){
        $('#plans-cards').find('.card').css('height',initHeight + 'px'); 
    }
}

function getCollapsedAccordionHeights(){
    let amt = $('#plans-cards').find('.card').first().find('.accordion').length;
    let h = $('#plans-cards').find('.card').first().find('.accordion').outerHeight() * amt
    accHeight = h + 8;
}

function openNutritionLabels(){
    let plan = $('#plans-cards').find('.card');
    plan.each(function(){
        let nlh = $(this).find('#acc-nl').find('.content').attr('data');
        $(this).find('#acc-nl').addClass('expanded');
        $(this).find('#acc-nl').find('.content').css('height',parseInt(nlh) + 'px');
    });
}

function selectCard() {
    let plan = $('#plans-cards').find('.card');

    plan.find('.header').on('click',function(){
        
        let card = $(this);
        //PREVENT ACCIDENTAL DOUBLE CLICK
        $(this).parent().addClass('disable');
        setTimeout(function(){
            card.parent().removeClass('disable');
        },500);

        if(!$(this).parent().hasClass('active')){
            plan.removeClass('active');
            $(this).parent().addClass('active');
        } else {
            plan.removeClass('active');
        }

        //ACTIVATE CONTINUE
        activateContinue();
    });
}

function activateContinue(){

    if($('#plans-cards').find('.card').hasClass('active')){
        $('#continue').removeClass('inactive');
    } else {
        $('#continue').addClass('inactive');
    }
}

function openAccordions(){
    let plan = $('#plans-cards').find('.card');
    let pih = $('#progress-indicator').outerHeight();

    plan.each(function(){
        $(this).find('.acc-nl').addClass('expanded');
        let nlh = $(this).find('.acc-nl').find('.content').attr('data')
        $(this).find('.acc-nl').find('.content').css('height',parseInt(nlh));
    });

    plan.find('.header').on('click', function(){

        if($(this).parent().hasClass('active')){
            //SET CARD HEIGHT
            let uh = [];
            let ch;

            plan.each(function(){
                h = $(this).find('.accordions').outerHeight();
                uh.push(h);
                ch = Math.max(...uh);
            });
            plan.addClass('expanded');
            setHeaderHeights();
            plan.css('height',initHeight + ch + 28 + 'px');
            setTimeout(function(){
                //EXPAND CARDS  
                $('#plans-cards').find('.card').css('height','auto');

                // if(!$('.acc-nl').hasClass('manual')){
                //     $('html, body').delay(100).animate({
                //         scrollTop: plan.offset().top - pih - 24
                //     },500);
                // }
            },500);

        } else {
            //plan.find('.accordion').removeClass('expanded');
            //plan.find('.content').css('height','0px');
            let h = $(this).parent().outerHeight();
            plan.css('height',h+'px');
            plan.removeClass('expanded');
            setHeaderHeights();
            setTimeout(function(){
                plan.css('height',initHeight);
            },10);
            // if(!$('.acc-nl').hasClass('manual')){
            //     $('html, body').delay(100).animate({
            //         scrollTop: plan.offset().top - pih - 24
            //     },500);
            // }
            plan.removeClass('expanded');

        }
    });
}

var cardWidth;
var scrollDis = 0;
var page = 0;

function setPagination(){
    //SET HEIGHT
    let pagHeight = $('#plans-header').outerHeight() + initHeight + 56;
    $('#pagination').css('height', 'calc(100% - '+ pagHeight +'px)');

    //SET LOCATION
    let footerHeight = $('#sticky-footer').outerHeight();
    let pagContHeight = $('#pagination').find('#nav-container').outerHeight();
    let pagLoc = footerHeight + pagContHeight;
    $('#pagination').find('#nav-container').css('top', 'calc(100% - '+ pagLoc +'px)');

}

function setPages(){
    //SET PAGES
    cardWidth = $('#plans-carousel').find('.cards').find('.card').first().outerWidth() + 24;
    let carousel = $('#plans-carousel').find('.cards');

    //CALCULATE PAGINATION
    let cardAmt = carousel.find('.card').length;
    let carouselWidth = cardWidth * cardAmt;
    let ex = carouselWidth - $('#plans-carousel').innerWidth();

    if(ex <= 0){
        ex = 0;
    }

    let addAmt = Math.ceil(ex / cardWidth) + 1;

    //ADD PAGE BUBBLES
    let bubbles = $('#pagination').find('#pag-bubbles');
    $('#pag-bubbles').empty();
    let bubbleElem = `<div class="pag-bubble"></div>`;
    //
    for(b = 0; b < addAmt ; b++){
        $('#pag-bubbles').append(bubbleElem);
    }

    if(bubbles.find('.pag-bubble').length < page + 1){
        page--;
        scrollDis = cardWidth * page;
        carousel.scrollLeft(scrollDis);
    } else {
        scrollDis = cardWidth * page;
        carousel.scrollLeft(scrollDis);
    }

    bubbles.find('.pag-bubble').eq(page).addClass('active');

    if(bubbles.find('.pag-bubble').last().hasClass('active')){
        $('#pagination').find('#next').removeClass('active').addClass('inactive');
    } else {
        $('#pagination').find('#next').removeClass('inactive').addClass('active');
    }
}

function cardCarousel(){
    //cardWidth = $('#plans-carousel').find('.cards').find('.card').first().outerWidth() + 24;
    let carousel = $('#plans-carousel').find('.cards');
    let prev = $('#pagination').find('#prev');
    let next = $('#pagination').find('#next');
    let bubbles = $('#pagination').find('#pag-bubbles');

    next.on('click',function(){
        page++;
        scrollDis = (cardWidth * page);
        carousel.scrollLeft(scrollDis);
        bubbles.find('.active').next().addClass('active');
        bubbles.find('.active').first().removeClass('active');
        if(bubbles.find('.pag-bubble').last().hasClass('active')){
            $(this).addClass('inactive');
        }
        prev.removeClass('inactive');
    });

    prev.on('click',function(){
        page--;
        scrollDis = (cardWidth * page);
        carousel.scrollLeft(scrollDis);
        bubbles.find('.active').prev().addClass('active');
        bubbles.find('.active').last().removeClass('active');
        if(bubbles.find('.pag-bubble').first().hasClass('active')){
            $(this).addClass('inactive');
        }
        next.removeClass('inactive');
    });
}


//COLLAPSE | CHEVRON IN DETAILS CARD
// function collapseDetails(){
//     let card = $('.device-info.collapsible')
//     let min = card.find('.minimize');
//     let nav = $('#pagination');

//     min.on('click',function(e){
//         e.stopPropagation();
//         card.addClass('collapsed').removeClass('unselectable');
//         $('#plans-carousel').addClass('false');
//         nav.hide();
//         resizeAccordions();
//     });

//     card.on('click',function(){
//         if($(this).hasClass('collapsed')){
//             $(this).removeClass('collapsed').addClass('unselectable');
//             $('#plans-carousel').removeClass('false');
//             nav.show();
//             resizeAccordions();
//         }
//     });
// }


//COLLAPSE | LINK IN PLANS SECTION
function collapseDetails(){
    let card = $('.device-info.collapsible');
    let carousel = $('#plans-carousel').find('.cards');
    let min = $('.link-expand').find('.cta');
    let nav = $('#pagination');
    let cardAmt = $('.card.plan').length;

    min.on('click',function(){
        if(!$(this).hasClass('expanded')){
            $(this).addClass('expanded');
            carousel.addClass('expanded');
            $(this).find('span').text('Minimize view');
            card.addClass('collapsed');
            if(cardAmt <= 3){
                $('#plans-carousel').addClass('false');
                nav.hide();
            }
            $('#available').addClass('hidden');
        } else {
            $(this).removeClass('expanded');
            carousel.removeClass('expanded');
            $(this).find('span').text('Expand view');
            card.removeClass('collapsed');
            $('#plans-carousel').removeClass('false');
            nav.show();
            $('#available').removeClass('hidden');
        }
        // setTimeout(function(){
        //     $('html, body').delay(100).animate({
        //         scrollTop: min.offset().top - $('#progress-indicator').outerHeight() - 24
        //     },500);
        // },500);
        setTimeout(setHeaderHeights,500);
        resizeAccordions();
        setTimeout(setPages,500);
    });
}

function resizeAccordions(){

    setTimeout(function(){
        sizeMatchingAccordions();

        let acc = $('#plans-cards').find('.card').find('.accordion');
        acc.each(function(){
            h = parseInt($(this).find('.content').attr('data'));
            if($(this).hasClass('expanded')){
                $(this).find('.content').css('height',h+'px');
            }
        });

    },500);
    
}

