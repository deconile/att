$(window).on('load', function(){
    selectCard();
    flexCard();
});

$(window).on('resize',function(){
    
});


function selectCard(){
    $('.card').on('click',function(){

        //IF RADIO TYPE
        if($(this).hasClass('radio')){
            $(this).parents('.card-set').find('.radio').removeClass('active');
            $(this).addClass('active');
        }
        
        if($(this).hasClass('check')) {
            $(this).toggleClass('active');
        }
    });
}

function flexCard(){
    $('.flex-card').each(function(){
        if($(this).outerWidth() >= 600){
            $(this).addClass('extended');
        }
    });
}


