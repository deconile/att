

$(window).load(function(){
    drawerCard();
    toggleNL();

    //SET FIRST OPTION ACTIVE & OPEN ALL NT LABELS
    setTimeout(function(){
        //EXPAND ALL LABELS
        $('#plans-cards').find('.card').each(function(){
            $(this).find('.accordion').addClass('expanded');
            $(this).find('.accordion').find('.content').find('a').attr('tabIndex','');
            let nlh = $(this).find('.accordion').find('.content').attr('data');
            $(this).find('.accordion').find('.content').css('height',parseInt(nlh));
            
        });
        
        //ACTIVATE CARD
        $('#plans-cards').find('.card').first().addClass('active');
    },50);
    
});

function drawerCard() {
    let plan = $('#plans-cards').find('.card');
    plan.on('click', function(){
        if(!$(this).hasClass('active')){
            plan.removeClass('active');
            $(this).addClass('active');
            $('#sticky-footer').find('.button').removeClass('inactive');
        } else {
            $(this).removeClass('active');
            $('#sticky-footer').find('.button').addClass('inactive');
        };
    });

}

function toggleNL() {
    //ACTIVATE NEXT LINE TO SET TOGGLE TO "ON" ON START
    $('.toggle').addClass('active');
    let nl = $('#plans-cards').find('.card').find('.accordion');

    $('.toggle').on('click',function(){
        if($(this).hasClass('active')){
            nl.each(function(){
                $(this).addClass('expanded');
                let nlh = $(this).find('.content').attr('data');
                $(this).find('.content').css('height',parseInt(nlh));
            });
        } else {
            nl.removeClass('expanded')
            nl.find('.content').css('height','0px');
        }
    });
}




