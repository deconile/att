var accordionHeight;
var accordionOffset = 130;

$(document).ready(function(){

    
    //SET INITIAL CLICK STATUS
    $('.card').addClass('initial');
    $('.card').first().removeClass('initial');

    //SET ACCORDION
    accordionHeight = $('.nutrition-label').outerHeight();
    $('.accordion-content').css('height', accordionHeight + accordionOffset + 'px');
    $('.accordion-label').find('.accordion-notice').css('display','none');

    //DELAY INVOKE 
    setTimeout(function(){
        planCard();
        collapseCard();
    }, 100);

});



function planCard() {
    
    let plan = $('.plan');
    
    plan.each(function(){

        let expandHeight = $(this).find('.container').outerHeight();
        $(this).find('.expand').css('height',expandHeight + 'px');

        //EXPAND & COLLAPSE
        $(this).on('click', function(){

            $(this).toggleClass('active');

            if($(this).hasClass('active')){
                plan.not(this).removeClass('active');
                plan.find('.expand').css('height','0px');
                $(this).find('.expand').css('height',expandHeight + 'px');

                //SCROLL TO TOP OF PLAN CARD
                /*setTimeout(() => {
                    let top = $(this).offset().top;
                    console.log(top)
                    $('html, body').animate({
                        scrollTop: top - 24
                    }, 500);;
                },500);*/
                
                $('#sticky-footer').find('.button').removeClass('inactive');

                //CHECK IF CARD HAS BEEN SELECTED
                if($(this).hasClass('initial')){
                    if(!$('.accordion-label').hasClass('active')){
                        $('.accordion-label').find('.accordion-notice').css('display','flex');
                    }
                    $('.accordion-label').addClass('active');
                    $('.accordion-label').siblings('.accordion-content').css({height : accordionHeight + accordionOffset  + 'px'});
                    $(this).removeClass('initial');
                }
                
                //SWAPPING LABEL | CHANGE CONTENT AND FADE IN
                if($(this).parent().hasClass('.dynamic-label')){
                    //GET PRICING AND PLAN
                    let price = $(this).find('.strikethrough').html().slice(0,-3);
                    let planname = $(this).find('.head').find('h3').html();

                    $('#planprice').html(price);
                    $('#planname').html(planname);

                    //REFRESH LABEL
                    $('.nutrition-label').hide().fadeIn(1000);
                }

                //SCROLL TO MATCHING LABEL
                //if($(this).parent().hasClass('.carousel-label')){}
                

            } else {
                $(this).find('.expand').css('height','0px');
                $('#sticky-footer').find('.button').addClass('inactive');
            }
        });

        //SET INITIAL STATES
        plan.not(":first").find('.expand').css('height','0px');

    });

}


function collapseCard(){
    let accordion = $('.accordion-label');
 
    accordion.on('click', function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(this).siblings('.accordion-content').css({height : accordionHeight + accordionOffset + 'px'});
        } else {
            $(this).removeClass('active');
            $(this).siblings('.accordion-content').css({height : '0px'});
            $(this).find('.accordion-notice').css('display','none');
        }
    });
}



