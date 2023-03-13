var initHeight;
var accHeight;

$(window).load(function(){
    selectCard();
    cardCarousel();
    collapseDetails();

    setTimeout(function(){
        //INITIAL HIDE CARD ACCORDIONS
        getHeaderHeights();
        getCollapsedAccordionHeights();
        $('#plans-cards').find('.card').css('height',initHeight+'px');
        setPagination()
        openAccordions();
    },100);
});

function getHeaderHeights(){
    let ih = []
    $('#plans-cards').find('.card').each(function(){
        ih.push($(this).find('.header').outerHeight())
    });
    initHeight = Math.max(...ih);
}

function getCollapsedAccordionHeights(){
    let amt = $('#plans-cards').find('.card').first().find('.accordion').length;
    let h = $('#plans-cards').find('.card').first().find('.accordion').outerHeight() * amt
    accHeight = h;
}

function openNutritionLabels(){
    let plan = $('#plans-cards').find('.card');
    plan.each(function(){
        let nlh = $(this).find('#acc-nl').find('.content').attr('data');
        $(this).find('#acc-nl').addClass('expanded');
        $(this).find('#acc-nl').find('.content').css('height',parseInt(nlh) + 'px');
    });
}

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

function selectCard() {
    let plan = $('#plans-cards').find('.card');

    plan.find('.header').on('click',function(){
        console.log('plan clicked');
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
    let extended = false;

    plan.find('.header').on('click', function(){

        if($(this).parent().hasClass('active')){

            //GET FULL HEIGHT
            //let head = $(this).find('.header').outerHeight();
            //let acc = $(this).find('.accordions').outerHeight();
            //let fullHeight = head + acc + 72;
            //EXPAND
            //$(this).css('height', fullHeight + 'px');

            if(!extended){
                plan.css('height',initHeight + accHeight + 'px');
                extended = true;
            }

            setTimeout(function(){
                //EXPAND CARDS  
                $('#plans-cards').find('.card').css('height','auto');
                if(!$('.acc-nl').hasClass('manual')){
                    plan.each(function(){
                        $(this).find('.acc-nl').addClass('expanded');
                        let nlh = $(this).find('.acc-nl').find('.content').attr('data')
                        $(this).find('.acc-nl').find('.content').css('height',parseInt(nlh));
                    });
                    $('html, body').delay(100).animate({
                        scrollTop: plan.offset().top - 24
                    },500);
                }
            },500);


        } else {
            plan.find('.accordion').removeClass('expanded');
            plan.find('.content').css('height','0px');
            let h = $(this).parent().outerHeight()
            plan.css('height',h+'px');
            setTimeout(function(){
                plan.css('height',initHeight);
                extended = false;
            },10);
        }
    });
}

function cardCarousel(){
    let scrollDis = 0;
    let cardWidth = $('#plans-carousel').find('#cards').find('.card').first().outerWidth() + 24;
    let carousel = $('#plans-carousel').find('#cards');

    //ADD PAGE BUBBLES
    let bubbleElem = `<div class="pag-bubble"></div>`;
    let pages = carousel.find('.card').length;
    //
    for(b = 0; b < pages; b++){
        $('#pag-bubbles').append(bubbleElem);
    }

    //DELETE ONE IF DESKTOP
    if ($(window).width() > 600) {
        $('#pag-bubbles').children().last().remove();
    }

    let prev = $('#pagination').find('#prev');
    let next = $('#pagination').find('#next');
    let bubbles = $('#pagination').find('#pag-bubbles');

    bubbles.find('.pag-bubble').first().addClass('active');

    next.on('click',function(){
        scrollDis = scrollDis + cardWidth;
        carousel.scrollLeft(scrollDis);
        bubbles.find('.active').next().addClass('active');
        bubbles.find('.active').first().removeClass('active');
        if(bubbles.find('.pag-bubble').last().hasClass('active')){
            $(this).addClass('inactive');
        }
        prev.removeClass('inactive');
    });

    prev.on('click',function(){
        scrollDis = scrollDis - cardWidth;
        carousel.scrollLeft(scrollDis);
        bubbles.find('.active').prev().addClass('active');
        bubbles.find('.active').last().removeClass('active');
        if(bubbles.find('.pag-bubble').first().hasClass('active')){
            $(this).addClass('inactive');
        }
        next.removeClass('inactive');
    });
}

function collapseDetails(){
    let card = $('.device-info.collapsible')
    let min = card.find('.minimize');
    let nav = $('#pagination');

    min.on('click',function(e){
        e.stopPropagation();
        card.addClass('collapsed').removeClass('unselectable');
        $('#plans-carousel').addClass('expanded');
        nav.hide();
        resizeAccordions();
    });

    card.on('click',function(){
        if($(this).hasClass('collapsed')){
            $(this).removeClass('collapsed').addClass('unselectable');
            $('#plans-carousel').removeClass('expanded');
            nav.show();
            resizeAccordions();
        }
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

