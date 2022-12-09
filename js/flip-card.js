$(document).ready(function(){
    flipCard();
    flipAllNutrition();
    toggle();
    
});

function flipCard() {
    $('.flip').find('.card').on('click', function(){
        
        //ACTIVE CARD
        if(!$(this).hasClass('active')){
            $('.flip').find('.card').removeClass('active');
            if(!$('#flip-nutrition').hasClass('active')){
                $('.flip').find('.card').removeClass('flipped');
            }
            $(this).addClass('active flipped');
            $('#sticky-footer').find('.button').removeClass('inactive');
        } else {
            $('.flip').find('.card').removeClass('active');
            if(!$('#flip-nutrition').hasClass('active')){
                $('.flip').find('.card').removeClass('flipped');
            }
            $('#sticky-footer').find('.button').addClass('inactive');
        };

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

function flipAllNutrition() {
    $('#flip-nutrition').on('click', function(){

        if(!$(this).hasClass('active')){
            console.log('flip trigger');
            $('.flip').find('.card').addClass('flipped');
        } else {
            $('.flip').each(function(){
                if(!$(this).find('.card').hasClass('active')){
                    $(this).find('.card').removeClass('flipped');
                }
            });
        } 

    });
}

