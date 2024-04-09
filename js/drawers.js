$(document).on('ready', function(){
    
    closeDrawer();
    $('#open-offers').on('click', function(e){
        e.stopPropagation();
        toggleDrawer('#special-offers');
    });

});


function closeDrawer(){
    $('aside').find('.close').on('click',function(){
        let thisAside = $(this).closest('aside');
        $(this).closest('aside').addClass('out');
        if($(this).closest('aside').hasClass('can-hover')){
            $(this).closest('aside').removeClass('can-hover');
            setTimeout(function(){
                thisAside.addClass('can-hover');
            },1500);
        }

    });
    $(document).on('click', function(event){
        if(!$(event.target).closest('aside').length){
            $('aside').addClass('out');
        }
    });
}


function toggleDrawer(d){
    $(d).siblings('aside').addClass('out');
    $(d).toggleClass('out');
}


