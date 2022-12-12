$(document).ready(function(){
    drawerCard();
    expandAllNutrition();
    toggle();

    //INITIAL COLLAPSE NUTRITION LABEL CONTAINERS
    $('.nutrition-details').css('height','0px');

    //SET FIRST OPTION EXPANDED
    setTimeout(function(){
        let nutritionHeight = $('.drawer').first().find('.nutrition-label').outerHeight();
        if($('.drawer').first().hasClass('scrollable')){
            $('.drawer').first().find('.nutrition-details').css({height: '150px'});
        } else {
            $('.drawer').first().find('.nutrition-details').css({height: nutritionHeight + 'px'});
        }
        //$('.drawer').first().find('.nutrition-details').css({height: nutritionHeight + 'px'});
        $('.drawer').first().find('.card').addClass('active');
    },100);
    
});

function drawerCard() {
    drawer = $('.drawer');
    drawer.find('.card').on('click', function(){
        
        //ACTIVE CARD
        if(!$(this).hasClass('active')){

            //DEACTIVATE & COLLAPSE ALL
            drawer.find('.card').removeClass('active');
            
            if(!$('#drawer-nutrition').hasClass('active')){
                $('.nutrition-details').css({height: '0px'});
            }
        
            //ACTIVATE CARD
            drawer.find('.card').removeClass('active');
            $(this).addClass('active');
            $('#sticky-footer').find('.button').removeClass('inactive');

            //EXPAND NUTRITION LABEL
            let nutritionHeight = $(this).find('.nutrition-label').outerHeight();
            if($(this).parent().hasClass('scrollable')){
                $(this).find('.nutrition-details').css({height: '150px'});
            } else {
                $(this).find('.nutrition-details').css({height: nutritionHeight + 'px'});
            }
            //$(this).find('.nutrition-details').css({height: nutritionHeight + 'px'});

        } else {

            //DEACTIVATE CARD
            $(this).removeClass('active');
            $('#sticky-footer').find('.button').addClass('inactive');

            //COLLAPSE NUTRITION LABEL
            if(!$('#drawer-nutrition').hasClass('active')){
                $('.nutrition-details').css({height: '0px'});
            }

        };

        //EXPAND

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
                $(this).find('.nutrition-details').css({height: nutritionHeight + 24 + 'px'});
            });
            
        } else {
            $('.drawer').each(function(){
                if(!$(this).find('.card').hasClass('active')){
                    $(this).find('.nutrition-details').css({height: '0px'});
                }
            });
        } 

    });
}

