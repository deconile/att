$(document).ready(function(){
    initialSpecSettings();
    selectSpec();
});

$(window).resize(function(){
    resizeFrame();
});

function resizeFrame(){
    if(!$('#specs-frame').hasClass('closed')){
        specsHeight = $('#specs-content').children('#'+selection+'-content').outerHeight();
        $('#specs-frame').css('height',specsHeight+'px');
    }
}

var selection;
var specsHeight;

function initialSpecSettings(){
    $('#specs-frame').addClass('closed').css('height','0px');
    $('#specs-content').children().css({'opacity':'0','display':'none'});
}

function selectSpec(){
    let option = $('#specs-container').find('.card.icon');
    let adj;

    option.on('click', function(){
        selection = $(this).attr('id');

        if($('#specs-frame').hasClass('closed')){
            specsHeight = $('#specs-content').children('#'+selection+'-content').innerHeight();
            //console.log(specsHeight);
            $('#specs-frame').css('height',specsHeight+'px').removeClass('closed');
        }

        if(!$(this).hasClass('active')){

            //FADE OUT CURRENT (ALL)
            $('#specs-content').children().css({'opacity':'0'});
            
            //LOAD SPEC CONTENT CONTAINER & ADJUST FRAME HEIGHT
            setTimeout(function(){
                $('#specs-content').children().css({'display':'none'});
                $('#specs-content').children('#'+selection+'-content').css('display','block');
                specsHeight = $('#specs-content').children('#'+selection+'-content').innerHeight();
                $('#specs-frame').css('height',specsHeight+'px');
            },250);

            //DISPLAY SPEC CONTENT
            setTimeout(function(){
                $('#specs-content').children('#'+selection+'-content').css('opacity','1');
            },500);

        } else {
            //FADE OUT SPEC CONTENT
            $('#specs-content').children().css({'opacity':'0'});

            //HIDE CONTAINER
            setTimeout(function(){
                $('#specs-frame').addClass('closed').css('height','0px');
            },250);
            
        }

        //READJUST MAIN CONTENT SCROLL POSITIONS
        setTimeout(function(){
            getScrollPositions();
        },550);

    });
}






