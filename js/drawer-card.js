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

    //SET FIRST OPTION ACTIVE & OPEN ALL NT LABELS
    setTimeout(function(){
        //EXPAND LABEL
        let nutritionHeight = $('.drawer').first().find('.nutrition-label').outerHeight();
        $('.drawer').find('.nutrition-details').css({height: nutritionHeight + labelOffset + 'px'});
        //ACTIVATE CARD
        $('.drawer').first().find('.card').addClass('active');
    },100);
    
});

function drawerCard() {
    drawer = $('.drawer');
    drawer.find('.card').on('click', function(){
        
        $(this).toggleClass('active');

        //ACTIVE CARD
        if(!$(this).hasClass('active')){
            //ACTIVATE CARD
            drawer.find('.card').removeClass('active');
            $('#sticky-footer').find('.button').removeClass('inactive');
        } else {
            $('#sticky-footer').find('.button').addClass('inactive');
        };

    });
}

function labelAccordion(){
    let accordion = $('.nutrition-label-accordion');

    //ACTIVE ALL NT LABEL ACCORDIONS
    accordion.addClass('active');
    
    accordion.on('click', function(e){
        //IGNORE PARENT CARD CLICK
        e.stopPropagation();

        //$(this).toggleClass('active');

        let nutritionHeight = $(this).parent().siblings('.nutrition-details').find('.nutrition-label').outerHeight();

        if($(this).hasClass('active')){
            //COLLAPSE LABEL
            $(this).parent().siblings('.nutrition-details').css({height: '0px'});
            $(this).removeClass('active');
        } else {
            //EXPAND LABEL
            $(this).parent().siblings('.nutrition-details').css({height: nutritionHeight + labelOffset + 'px'});
            $(this).addClass('active');
        }
    });
}

function toggle() {
    //ACTIVATE NEXT LINE TO SET TOGGLE TO "ON" ON START
    $('.toggle').addClass('active');

    $('.toggle').on('click', function(){
        $(this).toggleClass('active');
    });
}

function expandAllNutrition() {
    $('#drawer-nutrition').on('click', function(){

        if(!$(this).hasClass('active')){
            $('.drawer').each(function(){
                let nutritionHeight = $(this).find('.nutrition-label').outerHeight();
                $(this).find('.nutrition-details').css({height: nutritionHeight + labelOffset + 'px'});
            });

        } else {
            $('.drawer').find('.nutrition-details').css({height: '0px'});
        } 

    });
}

