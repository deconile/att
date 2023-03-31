var initHeight;
var accHeight;

$(window).load(function(){
    selectCard();
    setTimeout(function(){
        //INITIAL HIDE CARD ACCORDIONS
        setHeaderHeights();
        setCollapsedAccordionHeights();
        //SET INITIAL HEIGHTS
        $('#plans-cards').find('.card').each(function(){
            let ih = parseInt($(this).find('.header').attr('data'));
            $(this).css('height',ih+'px');
        });
        openNutritionLabels()
        openAccordions();
    },100);
});


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

function setHeaderHeights(){
    $('#plans-cards').find('.card').each(function(){
        let hh = $(this).find('.header').outerHeight();
        $(this).find('.header').attr('data',hh);
    });
}

function setCollapsedAccordionHeights(){
    let amt = $('#plans-cards').find('.card').first().find('.accordion').length;
    let h = $('#plans-cards').find('.card').first().find('.accordion').outerHeight() * amt
    accHeight = h;
}

function openAccordions(){
    let plan = $('#plans-cards').find('.card');
    let pih = $('#progress-indicator').outerHeight();

    plan.find('.header').on('click', function(){

        var card = $(this).parent();

        if($(this).parent().hasClass('active')){

            //SMOOTH TRANSITION
            //GET FULL HEIGHT
            let head = $(this).outerHeight();
            let acc = $(this).siblings().outerHeight() + 26;
            let fullHeight = head + acc;
            //EXPAND
            $(this).parent().css('height', fullHeight + 'px');

            //APPLY CURRENT HEIGHT to SIBLINGS & COLLAPSE
            plan.not(card).each(function(){
                h = $(this).outerHeight();
                $(this).css('height',h + 'px');
            });
            setTimeout(function(){
                plan.not(card).each(function(){
                    let hh = parseInt($(this).find('.header').attr('data'));
                    $(this).css('height',hh + 'px');
                });
            },10);

            //TOGGLE TAB INDEXING
            plan.find('#acc-nl').find('.content').find('a').attr('tabIndex','-1');
            $(this).parent().find('#acc-nl').find('.content').find('a').attr('tabIndex','');

            //END OF TRANSITIONS
            setTimeout(function(){
                //SET TO AUTO HEIGHT
                card.css('height','auto');
                //SCROLL TO TOP OF SELECTED CARD
                if(card.find('#acc-nl').hasClass('expanded')){
                    $('html, body').delay(100).animate({
                        scrollTop: card.offset().top - pih - 24
                    },500);
                }
            },500);
                
        } else {
            let h = $(this).parent().outerHeight();
            $(this).parent().css('height',h+'px');
            setTimeout(function(){
                let hh = parseInt(card.find('.header').attr('data'));
                card.css('height',hh+'px');
            },10);
            $(this).parent().find('#acc-nl').find('.content').find('a').attr('tabIndex','-1');
        }
    });

}

function openNutritionLabels(){
    let plan = $('#plans-cards').find('.card');
    plan.each(function(){
        let nlh = $(this).find('#acc-nl').find('.content').attr('data');
        $(this).find('#acc-nl').addClass('expanded');
        $(this).find('#acc-nl').find('.content').css('height',parseInt(nlh) + 'px');
    });
}


