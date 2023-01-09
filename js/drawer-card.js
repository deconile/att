var labelOffset;

$(document).ready(function(){
    drawerCard();
    labelAccordion();
    expandAllNutrition();
    toggle();

    //INITIAL COLLAPSE NUTRITION LABEL CONTAINERS
    $('.nutrition-details').css('height','0px');
    
    if (window.matchMedia('(max-width: 600px)').matches) {
        labelOffset = 40;
    } else {
        labelOffset = 24;
    }

    //SET FIRST OPTION EXPANDED
    setTimeout(function(){
        //EXPAND LABEL
        let nutritionHeight = $('.drawer').first().find('.nutrition-label').outerHeight();
        $('.drawer').first().find('.nutrition-details').css({height: nutritionHeight + labelOffset + 'px'});
        //ACTIVATE CARD
        $('.drawer').first().find('.card').addClass('active');
        //SET ACCORDION
        $('.nutrition-label-accordion').first().addClass('active');
    },100);
    
});

function drawerCard() {
    drawer = $('.drawer');
    drawer.find('.card').on('click', function(){
        
        //ACTIVE CARD
        if(!$(this).hasClass('active')){

            //DEACTIVATE & COLLAPSE ALL
            drawer.find('.card').removeClass('active');
            $('.nutrition-label-accordion').each(function(){
                if(!$(this).hasClass('opened')){
                    $(this).removeClass('active');
                }
            });
            //drawer.find('.card').find('.nutrition-label-accordion').removeClass('active');
            //drawer.find('.card').find('.nutrition-label-accordion').find('span').html('Show');
            
            if(!$('#drawer-nutrition').hasClass('active')){
                $('.nutrition-details').each(function(){
                    if(!$(this).siblings('.front').find('.nutrition-label-accordion').hasClass('opened')){
                        $(this).css({height: '0px'});
                    }
                });
            }
            //$('.nutrition-details').css({height: '0px'});
        
            //ACTIVATE CARD
            drawer.find('.card').removeClass('active');
            $(this).addClass('active');
            $('#sticky-footer').find('.button').removeClass('inactive');

            //EXPAND NUTRITION LABEL
            let nutritionHeight = $(this).find('.nutrition-label').outerHeight();
            if(!$(this).find('.nutrition-label-accordion').hasClass('closed')){
                $(this).find('.nutrition-details').css({height: nutritionHeight + labelOffset + 'px'});
                $(this).find('.nutrition-label-accordion').addClass('active');
            }

        } else {

            //DEACTIVATE CARD
            $(this).removeClass('active');
            $('#sticky-footer').find('.button').addClass('inactive');

            //COLLAPSE NUTRITION LABEL
            if(!$('#drawer-nutrition').hasClass('active')){
                $(this).find('.nutrition-details').css({height: '0px'});
                $(this).find('.nutrition-label-accordion').removeClass('active');
                //$('.nutrition-details').css({height: '0px'});
            }
        };

        //EXPAND

    });
}

function labelAccordion(){
    let accordion = $('.nutrition-label-accordion');
    
    accordion.on('click', function(e){
        //IGNORE PARENT CARD CLICK
        e.stopPropagation();

        let nutritionHeight = $(this).parent().siblings('.nutrition-details').find('.nutrition-label').outerHeight();

        if(!$(this).hasClass('active')){
            //ACTIVATE CARD STYLES
            $(this).addClass('active');

            //MARK AS USER OPENED
            $(this).addClass('opened').removeClass('closed');

            //EXPAND LABEL
            $(this).parent().siblings('.nutrition-details').css({height: nutritionHeight + labelOffset + 'px'});


        } else if(!$('#drawer-nutrition').hasClass('active')){
            //DEACTIVATE CARD STYLES
            $(this).removeClass('active');

            //MARK AS USER CLOSED
            $(this).addClass('closed').removeClass('opened');

            //COLLAPSE LABEL
            $(this).parent().siblings('.nutrition-details').css({height: '0px'});

        }
    });
}

function toggle() {
    $('.toggle').on('click', function(){
        
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }

    });
}

function expandAllNutrition() {
    $('#drawer-nutrition').on('click', function(){

        if(!$(this).hasClass('active')){
            $('.drawer').each(function(){
                let nutritionHeight = $(this).find('.nutrition-label').outerHeight();
                $(this).find('.nutrition-details').css({height: nutritionHeight + labelOffset + 'px'});
            });

            $('.nutrition-label-accordion').addClass('inactive');
            
        } else {
            $('.drawer').each(function(){
                if(!$(this).find('.card').hasClass('active') && !$(this).find('.nutrition-label-accordion').hasClass('opened')){
                    $(this).find('.nutrition-details').css({height: '0px'});
                }
            });

            $('.nutrition-label-accordion').removeClass('inactive');
        } 

    });
}

