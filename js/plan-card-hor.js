var initHeight;
var accHeight;

$(document).ready(function(){
    selectCard();
    cardCarousel();
    collapseDetails();

    setTimeout(function(){
        //INITIAL HIDE CARD ACCORDIONS
        getHeaderHeights();
        getCollapsedAccordionHeights();
        $('#plans-cards').find('.card').css('height',initHeight+'px');
        openAccordions();
    },50);
});

function getHeaderHeights(){
    let ih = []
    $('#plans-cards').find('.card').each(function(){
        ih.push($(this).find('.header').outerHeight())
    });
    initHeight = Math.max(...ih) + 40;
}

function getCollapsedAccordionHeights(){
    $('#plans-cards').find('.card').each(function(){
        let amt = $(this).find('.accordion').length;
        let h = $(this).find('.accordion').outerHeight() * amt
        accHeight = h;
    });
}

function selectCard() {
    let plan = $('#plans-cards').find('.card');

    plan.on('click',function(){
        if(!$(this).hasClass('active')){
            plan.removeClass('active');
            $(this).addClass('active');
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
    let accordion = plan.find('.accordion');
    let extended = false;

    plan.on('click', function(){

        if($(this).hasClass('active')){

            if(!extended){
                plan.css('height',initHeight + accHeight);
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
                    $('#pagination').addClass('extended');
                }
                
            },500);

        } else {
            plan.find('.accordion').removeClass('expanded');
            plan.find('.content').css('height','0px');
            let h = $(this).outerHeight()
            plan.css('height',h+'px');
            setTimeout(function(){
                plan.css('height',initHeight);
                extended = false;
            },10);
            setTimeout(function(){
                $('#pagination').removeClass('extended');
            },500);
        }
    });
}

function cardCarousel(){
    let carousel = $('#plans-carousel').find('#cards');
    let prev = $('#pagination').find('#prev');
    let next = $('#pagination').find('#next');
    let bubble = $('#pagination').find('.pag-bubble');

    next.on('click',function(){
        carousel.scrollLeft(304);
        $(this).addClass('inactive');
        prev.removeClass('inactive');
        bubble.toggleClass('active');
    });

    prev.on('click',function(){
        carousel.scrollLeft(-304);
        $(this).addClass('inactive');
        next.removeClass('inactive');
        bubble.toggleClass('active');
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
    // let r = 0;
    // let plan = $('#plans-cards').find('.card');
    // while(r < 500){
    //     setAccordionHeights();

    //     if($('#acc-nl').hasClass('expanded')){
    //         plan.each(function(){
    //             $(this).find('.acc-nl').addClass('expanded');
    //             nlh = $(this).find('.acc-nl').find('.content').attr('data')
    //             $(this).find('.acc-nl').find('.content').css('height',parseInt(nlh));
    //         });
    //     }
    //     r++
    // }

    setTimeout(function(){
        setAccordionHeights();

        let plan = $('#plans-cards').find('.card');
        if($('#acc-nl').hasClass('expanded')){
            plan.each(function(){
                $(this).find('.acc-nl').addClass('expanded');
                let nlh = $(this).find('.acc-nl').find('.content').attr('data')
                $(this).find('.acc-nl').find('.content').css('height',parseInt(nlh));
            });
        }
    },500);
}

