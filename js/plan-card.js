var accordionHeight;

$(document).ready(function(){

    //ACTIVE FIRST CARD
    $('.standard').first().find('.card').addClass('active');

    //SET INITIAL CLICK STATUS
    $('.standard').find('.card').addClass('initial');
    $('.standard').first().find('.card').removeClass('initial');

    accordionHeight = $('.accordion-content').outerHeight();
    $('.accordion-content').css('height', accordionHeight + 40 + 'px');

    $('.accordion-label').find('.accordion-notice').css('display','none');

    expandCard();
    collapseCard();

});



function expandCard() {
    let plan = $('.standard').find('.card');
    let expandHeight = $('.standard').first().find('.card').outerHeight();
    let collapseHeight = $('.standard').last().find('.card').outerHeight();

    //SET HEIGHTS
    $('.standard').find('.card').css({height : collapseHeight + 'px'});
    $('.standard').first().find('.card').css({height : expandHeight + 24 + 'px'});

    plan.on('click', function(){
        
        //ACTIVE CARD
        if(!$(this).hasClass('active')){

            //DEACTIVATE ALL
            plan.removeClass('active');

            //ACTIVATE CARD
            $(this).addClass('active');

            //EXPAND CARD
            plan.each(function(){
                if($(this).hasClass('active')){
                    $(this).css({height: expandHeight + 24 + 'px'});
                } else {
                    $(this).css({height: collapseHeight + 'px'});
                }
            });

            //ACTIVATE CONTINUE
            $('#sticky-footer').find('.button').removeClass('inactive');

            //REFRESH LABEL
            $('.nutrition-label').fadeOut(500).fadeIn(500);

            //CHECK IF CARD HAS BEEN SELECTED
            if($(this).hasClass('initial')){
                if(!$('.accordion-label').hasClass('active')){
                    $('.accordion-label').find('.accordion-notice').css('display','flex');
                }
                $('.accordion-label').addClass('active');
                $('.accordion-label').siblings('.accordion-content').css({height : accordionHeight + 40  + 'px'});
                $(this).removeClass('initial');
            }

        } else {

            //DEACTIVATE CARD
            $(this).removeClass('active');
            $(this).css({height: collapseHeight + 'px'});
            $('#sticky-footer').find('.button').addClass('inactive');

        };

    });
}

function collapseCard(){
    let accordion = $('.accordion-label');
 
    accordion.on('click', function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(this).siblings('.accordion-content').css({height : accordionHeight + 40  + 'px'});
        } else {
            $(this).removeClass('active');
            $(this).siblings('.accordion-content').css({height : '0px'});
            $(this).find('.accordion-notice').css('display','none');
        }
    });
}


