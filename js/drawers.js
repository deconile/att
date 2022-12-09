$(document).on('ready', function(){
    
    //INITIAL SETTINGS
    setTimeout(function(){
        initialSettings();
    },100);
    

    //ACTIVE RAILS
    collapseRightDrawer();
    collapseLeftDrawer();


    //GET WINDOW SPACE
    $(window).resize(function(){
        getWindowSpace();
        if($('#drawer-left-spacer').hasClass('opened')){
            $('#drawer-left-spacer').css('width',drawerLeftSpace);
        }
        if($('#drawer-right-spacer').hasClass('opened')){
            $('#drawer-right-spacer').css('width',drawerRightSpace);
        }
    });
    
});


var winWidth,
    drawerUseableSpace,
    drawerLeftSpace,
    drawerRightSpace;

function getWindowSpace(){
    winWidth = $(window).width();
    drawerUseableSpace = winWidth - 852;
    
    if(drawerUseableSpace < 852){
        drawerLeftSpace = drawerUseableSpace;
    } else {
        drawerLeftSpace = 852;
    }

    if(drawerUseableSpace < 508){
        drawerRightSpace = drawerUseableSpace;
    } else {
        drawerRightSpace = 508;
    }
}



function initialSettings(){
    //GET INITIAL WINDOW WIDTH
    getWindowSpace();
    $('#drawer-left-spacer').css('width','48px');
    $('#drawer-right-spacer').css('width','508px');
}

function collapseRightDrawer(){

    let drawer = $('#drawer-right'),
        spacer = $('#drawer-right-spacer');
    
    drawer.find('.pull-tab-container').on('click', function(){
    
        if(drawer.hasClass('opened')){
            drawer.removeClass('opened').addClass('closed');
            spacer.removeClass('opened').addClass('closed');
        } else {
            drawer.removeClass('closed').addClass('opened');
            spacer.removeClass('closed').addClass('opened');
        };

        if(spacer.hasClass('opened')){
            spacer.css('width', drawerRightSpace + 'px');
        } else {
            spacer.css('width', '48px');
        }

        if($('#drawer-left').hasClass('opened')){
            $('#drawer-left').removeClass('opened').addClass('closed');
            $('#drawer-left-spacer').removeClass('opened').addClass('closed').css('width', '48px');
        }

        //READJUST MAIN CONTENT SCROLL POSITIONS
        setTimeout(function(){
            getScrollPositions();
        },1500);
        
    });
}

function collapseLeftDrawer(){

    let drawer = $('#drawer-left'),
        spacer = $('#drawer-left-spacer');
    
    drawer.find('.pull-tab-container').on('click', function(){
    
        if(drawer.hasClass('opened')){
            drawer.removeClass('opened').addClass('closed');
            spacer.removeClass('opened').addClass('closed');
        } else {
            drawer.removeClass('closed').addClass('opened');
            spacer.removeClass('closed').addClass('opened');
        };

        if(spacer.hasClass('opened')){
            spacer.css('width', drawerLeftSpace + 'px');
        } else {
            spacer.css('width', '48px');
        }

        if($('#drawer-right').hasClass('opened')){
            $('#drawer-right').removeClass('opened').addClass('closed');
            $('#drawer-right-spacer').removeClass('opened').addClass('closed').css('width', '48px');
        }

        //READJUST MAIN CONTENT SCROLL POSITIONS
        setTimeout(function(){
            getScrollPositions();
        },1500);

    });
}







/* SWAP PRICING DEPENDING ON OPTIONS SELECTED */