var initHeight;
var accHeight;

$(document).ready(function(){
    selectCard();
    setTimeout(function(){
        //INITIAL HIDE CARD ACCORDIONS
        getHeaderHeights();
        getCollapsedAccordionHeights()
        $('#plans-cards').find('.card').css('height',initHeight+'px');

        openAccordions();
    },50);
});


function selectCard() {
    let plan = $('#plans-cards').find('.card');

    plan.on('click',function(){
        if(!$(this).hasClass('active')){
            plan.removeClass('active');
            $(this).addClass('active');
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

function getHeaderHeights(){
    let ih = []
    $('#plans-cards').find('.card').each(function(){
        ih.push($(this).find('.header').outerHeight())
    })
    initHeight = Math.max(...ih) + 48;
}

function getCollapsedAccordionHeights(){
    $('#plans-cards').find('.card').each(function(){
        let amt = $(this).find('.accordion').length;
        let h = $(this).find('.accordion').outerHeight() * amt
        accHeight = h;
    });
}

function openAccordions(){
    let plan = $('#plans-cards').find('.card');
    let extended = false;

    plan.on('click', function(){

        var card = $(this);

        if($(this).hasClass('active')){

            plan.css('height',initHeight);

            // if(!extended){
            //     $(this).css('height',initHeight + accHeight);
            //     extended = true;
            // }

            //EXPAND CARDS
            $(this).css('height','auto');
            if(!$(this).find('#acc-nl').hasClass('manual')){
                $(this).find('#acc-nl').addClass('expanded');
                let nlh = $(this).find('#acc-nl').find('.content').attr('data')
                $(this).find('#acc-nl').find('.content').css('height',parseInt(nlh));
            }
                
        } else {
            plan.find('.accordion').removeClass('expanded');
            plan.find('.content').css('height','0px');
            // let h = $(this).outerHeight()
            // plan.css('height',h+'px');
            $(this).css('height',initHeight);
            extended = false;
        }
    });
    
    // plan.each(function(){
    //     let accordion = $(this).find('.accordion');
    //     var accHeights = [];

    //     accordion.each(function(){
    //         accHeights.push($(this).find('.content').outerHeight());
    //     });

    //     $(this).on('click',function(){
    //         //CLOSE OTHERS

    //         plan.find('.accordion').removeClass('expanded');
    //         plan.find('.content').css('height','0px');
    //         $('#plans-cards').find('.card').css('height',initHeight);

    //         if($(this).hasClass('active')){
    //             //for(h=0; h < accHeights.length; h++){
    //                 $(this).find('.accordion').eq(1).addClass('expanded');
    //                 $(this).find('.content').eq(1).css('height',accHeights[1]+'px');
    //             //}
    //             $(this).css('height','auto');
    //         } else {
    //             $(this).find('.accordion').removeClass('expanded');
    //             $(this).find('.content').css('height','0px');
    //             $(this).css('height',initHeight);
    //         }
    //     });
    // });
}


