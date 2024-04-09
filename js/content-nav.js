$(window).load(function(){
    //INTERACTIVE ELEMENTS
    buttonGroup(); //BUTTON GROUP
    toggle(); //TOGGLE
    quantity(); // QUANTITY INCREMENTOR
    checkBox(); //CHECKBOX & RADIO
    favorite(); //FAVORITE

    //JUMP LINKS ************************** EXAMINE
    jumpLinks();
    getScrollPositions();
    activeLinksOnScroll();

    //ICON CARDS ************************** EXAMINE
    iconCard();

    //FILTER DROPDOWN ************************** EXAMINE
    displayFilters();

    //FOR SCRIPTS THAT NEED TO ENSURE ALL HTML & CSS HAS BEEN APPLIED
    setTimeout(function(){

        //TOOLTIP
        tooltip();
        
        //ACCORDION
        setAccordionHeights();
        unifyMatchingAccordions();
        sizeMatchingAccordions();
        accordion();
        collapseAllAccordions();

        //REVEALS
        reveal();

        //NAVIGATION COMPONENTS
        tabs(); //TABS
        setTabsH();
        setTabsW(); //SET WIDTH OF TABS CONTAINER

        tabContentAdjusters(); //APPLY CLICK TO ELEMENTS THAT ADJUST TAB HEIGHTS
        disableLinks(); //DISABLE LINK w/o LOCATION

    },200);

});

$(window).on('resize', function(){
    setTabsW();
});


// DIABLE ANY LINKS WITHOUT AN HREF /////////////
function disableLinks(){
    $(document).find('a').each(function(){
        if($(this).attr('href') === ''){
            $(this).attr('href','JavaScript:void(0)')
        }
    });
}


// TABS FUNCTIONALITY ////////////////////////////////////////

function setTabsW(){
    $('.tabs-container').each(function(){
        $(this).attr('data-width', $(this).outerWidth());
    });
};

function setTabsH(){
    $('.tab-content').each(function(){
        $(this).attr('data-height', $(this).children().outerHeight());
    });
};

function hideOtherTabs(){
    $('.tabs-container').each(function(){
        $(this).find('.tab-content').not(':first').children().children().hide();
    });
}

function tabs(){
    //INITIAL SETTINGS & ACTIVATE FIRST TAB
    let tab = $('.tabs').find('.list').children();
    tab.first().addClass('active');

    setTabsH();

    //TAB SWITCHING
    tab.on('click', function(){

        $(this).parent().children().css('pointer-events','none');

        let thisTab = $(this);
        let i,h;

        //REAPPLY HEIGHTS FOR SMOOTH TRANSITION
        i = $(this).parent().find('.active').index();
        h = $(this).parents('.tabs').siblings().find('.tab-content').eq(i).attr('data-height');
        $(this).parents('.tabs').siblings().css('height',h+'px');
        
        //SWITCH TABS
        tab.removeClass('active');
        $(this).addClass('active');

        //RESIZE ACTIVE TAB
        i = $(this).parent().find('.active').index();
        h = $(this).parents('.tabs').siblings().find('.tab-content').eq(i).attr('data-height');
        
        setTimeout(function(){
            thisTab.parents('.tabs').siblings().css('height',h+'px');
            thisTab.parents('.tabs').siblings().find('.tab-content').eq(i).children().children().show();
            // thisTab.parents('.tabs').siblings().children().not(':eq('+i+')').children().children().hide();
            // thisTab.parents('.tabs').siblings().find('.tab-content').css('height',h+'px');
        },100);

        //SLIDE CONTENT
        let num = $(this).index();
        let w = parseInt($(this).parents('.tabs').siblings('.tabs-container').attr('data-width'));
        $(this).parents('.tabs').siblings().children().scrollLeft(w * num);


        //HIDE NON VISIBLE CONTENT / ALLOW RESPONSIVE HEIGHT
        setTimeout(function(){
            thisTab.parents('.tabs').siblings().css('height','');
            thisTab.parents('.tabs').siblings().find('.tab-content').not(':eq('+i+')').children().children().hide();
            // thisTab.parents('.tabs').siblings().find('.tab-content').eq(i).css('height','');
            thisTab.parent().children().css('pointer-events','');
        },1000);


        //SPECIFIC CHANGES
        //HIDE BOLT-ONS WHEN SWITCHING TABS
        // if($(this).parents('.tabs').siblings().eq(i).find('.has-bolton').hasClass('active')){
        //     $('#boltons').css('height',parseInt($('#boltons').attr('data'))+'px');
        // } else {
        //     $('#boltons').css('height','0px');
        // }

    });

    //DELAY HIDING UNSEEN TABS UNTIL ADJUSTMENTS ARE MADE
    setTimeout(function(){
        hideOtherTabs();
    },100);

}




function tabContentAdjusters(){
    $('.tab-adjust').on('click',function(){
        let tab = $(this);
        setTimeout(function(){
            tab.parents('.tab-content').attr('data-height', tab.parents('.tab-content').outerHeight());
        },500);
    });
}


// BUTTON GROUP FUNCTIONALITY ////////////////////////////////////////
function buttonGroup(){
    btnGroup = $('.button-group');

    btnGroup.find('.button').on('click',function(){
        if(!$(this).hasClass('active')){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        }
    });
}



// JUMP LINKS FUNCTIONALITY ////////////////////////////////////////
var i = 0;
var clickedTo = false;

function jumpLinks(){
    let link = $('#jump-links').find('.link');
    let section;

    link.on('click', function(){

        clickedTo = true;

        section = $(this).attr('id');

        if(!$(this).hasClass('active')){
            link.removeClass('active');
            $(this).addClass('active');
        }

        i = $(this).index();

        if($(this).is('#top')){
            $('html, body').animate({
                scrollTop: Math.ceil($('html, body').offset().top)
            }, 1000);
        }

        $('html, body').animate({
            scrollTop: Math.ceil(($('section#'+section).offset().top - 100) + DCYOffset)
        }, 1000);

        setTimeout(function(){
            clickedTo = false;
        },1000)

    });
};

var positions = [];

function getScrollPositions(pos){
    // GET ELEMENTS POSITIONS
    // Possibly add to array and check values at each point
    positions = [];

    //SET NUMERIC POSITIONS IN ARRAY
    for(s = 0; s < $('main > section').length; s++){
        positions.push(Math.ceil(($('main > section').eq(s).offset().top)) - 150);  
    }

    //SET REMOVE FIRST SECTION POSITION (INTRO COPY)
    positions.shift();
}

function activeLinksOnScroll(){

    //CHECK POSITION OF SCROLL
    $(window).scroll(function() {
        if(!clickedTo){
            if(Math.ceil($('html, body').scrollTop()) < positions[i - 1] - 250) {
                i--
                
                if(i <= 0){
                    $('#jump-links').find('.link').removeClass('active');
                    i = 0;
                }
            }

            if(Math.ceil($('html, body').scrollTop()) >= positions[i]) {
                i++
            }

            if(!$('#jump-links').find('.link').eq(i).hasClass('active')){
                $('#jump-links').find('.link').removeClass('active');
                $('#jump-links').find('.link').eq(i).addClass('active');
            }
        }

        if(i <= 0){
            $('#jump-links').find('#top').find('.label').empty();
        } else {
            $('#jump-links').find('#top').find('.label').text('Back to top');
        }
    });
}



// ICON CARDS //////////////////////////////////////////////////
function iconCard(){
    let card = $('.icon-cards').find('.card.icon');

    card.on('click', function(){
        if(!$(this).hasClass('active') && $(this).parent().hasClass('type-radio')){
            card.removeClass('active');
            $(this).addClass('active');
        } else if(!$(this).hasClass('active') && $(this).parent().hasClass('type-checkbox')){
            $(this).addClass('active');
        } else if($(this).hasClass('active') && $(this).parent().hasClass('type-checkbox')) {
            $(this).removeClass('active');
        } else {
            card.removeClass('active');
        }

    });
}


// CHECKBOX //////////////////////////////////////////////////
function checkBox(){
    let checkbox = $('.checkbox');

    checkbox.on('click', function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }

        if(!$(this).parents('.card').hasClass('active')){
            $(this).parents('.card').addClass('active');
        } else {
            $(this).parents('.card').removeClass('active');
        }
    });
}


// QUANTITY INCREMENTOR //////////////////////////////////////
function toggle(){
    $('.toggle').find('.switch').on('click', function(){
        $(this).toggleClass('active');
    });
}



// QUANTITY INCREMENTOR //////////////////////////////////////
function quantity(){

    let button = $('.add').children('.button'),
        up = $('.add').find('.plus'),
        down = $('.add').find('.minus'),
        q;

    $('.quantity').fadeOut(1);

    button.on('click', function(){
        q = parseInt($(this).siblings().find('.amount').text());

        $(this).fadeOut(250);
        $(this).siblings().delay(250).fadeIn(250);

        q++
        $(this).siblings().find('.amount').text(q);

        $(this).parents('.card').addClass('active');
    });

    up.on('click', function(){
        q = parseInt($(this).siblings('.amount').text());
        q++
        $(this).siblings('.amount').text(q);
    });

    down.on('click', function(){
        q = parseInt($(this).siblings('.amount').text());
        if(q > 0){
            q--
        }

        if(q <= 0){
            $(this).parents('.card').removeClass('active');
            $(this).parent().fadeOut(250)
            $(this).parent().siblings().delay(250).fadeIn(250);
        }

        $(this).siblings('.amount').text(q);
    });
}


// TOOLTIPS //////////////////////////////
function tooltip(){

    $('.tooltip:not(.popover)').find('.hitarea').on({
        mouseenter : function(){
            $(this).siblings().fadeIn();
        },
        mouseleave: function(){
            $(this).siblings().fadeOut();
        }
    });

    $('.popover').find('.hitarea').on('click', function(e){
        e.stopPropagation();
        // $('.popover').not(this).removeClass('active');
        // $('.popover').not(this).find('.hitarea').siblings().fadeOut();
        $(this).parent().toggleClass('active');
        if($(this).parent().hasClass('active')){
            $(this).siblings().fadeIn();
        } else {
            $(this).siblings().fadeOut();
        }
    });

    $('.popover').find('.close').on('click', function(e){
        e.stopPropagation();
        $(this).parents('.popover').removeClass('active');
        $(this).parents('.popover').find('.hitarea').siblings().fadeOut();
    });

    $(document).on('click', function(event){
        if(!$(event.target).closest('.popover').length){
            $('.popover').removeClass('active');
            $('.popover').find('.hitarea').siblings().fadeOut();
        }
    });

}



// FILTER DROPDOWN //////////////////////////////////////////////////

function displayFilters(){
    let button = $('.filter').find('.button'),
        filter = $('.filter').find('.modal').find('div');

    //INITIALLY SET FIRST FILTER
    filter.each(function(){
        let label = $(this).siblings().first().text();
        $(this).parent().siblings().find('.label').find('span').text(label);
    });

    button.on('click', function(){
        
        if($(this).parent().siblings('.modal').css('display') === 'none'){
            $(this).parent().siblings('.modal').fadeIn(250);
        } else {
            $(this).parent().siblings('.modal').fadeOut(250);
        }
    });

    filter.on('click', function(){
        let label = $(this).text();
        let controlLabel = $(this).parent().siblings('.filter-control').find('.label').find('span');
        
        controlLabel.hide();
        //$(this).parent().siblings('.filter-control').find('span').text(label);
        controlLabel.text(label).fadeIn(1000);

        $(this).parent().fadeOut(500);
    });
}




//ACCORDION FUNCTIONALITY ////////////////////////////////////

function setAccordionHeights(){
    $('.accordion').each(function(){
        let h = $(this).find('.content').find('.wrapper').outerHeight();
        $(this).find('.content').attr('data',h);
    });
}

//UNIFY MATCHING ACCORDIONS
var uniqueAcc = [];
var uniqueH = [];
var matchedH;

function unifyMatchingAccordions() {

    $('.accordion.matching').each(function(){
        let id = $(this).attr('id');
        $(this).addClass(id);
        let dup = jQuery.inArray(id, uniqueAcc);
        if (dup >= 0) {
            return;
        } else {
            uniqueAcc.push(id);
        }

    });
}

function sizeMatchingAccordions(){
    for(m = 0; m < uniqueAcc.length; m++){
        $('.accordion.'+ uniqueAcc[m]).each(function(){
            uniqueH.push($(this).find('.content').find('.wrapper').outerHeight());
            matchedH = Math.max(...uniqueH);
        });
        $('.' + uniqueAcc[m]).find('.content').attr('data',matchedH);
        uniqueH = [];
    }
}

//INITIALLY COLLASPE ALL ACCORDIONS
function collapseAllAccordions(){
    $('.accordion').each(function(){
        if($(this).hasClass('open')) {
            $(this).addClass('expanded');
            let h = $(this).find('.content').attr('data');
            $(this).find('.content').css('height',h + 'px');
        } else {
            $(this).find('.content').css('height','0px');
            $(this).find('.content').find('a').attr('tabIndex','-1');
        }
    });
}

function accordion(){
    let accordion = $('.accordion');

    //GET HEIGHT OF CONTENT
    accordion.each(function(){
        //APPLY CONTENT HEIGHT
        let ah = $(this).find('.content').attr('data');

        $(this).find('.control').on('click', function(e){
            e.stopPropagation();
            $(this).parent().addClass('manual');
            if($(this).parent().hasClass('matching')){
                accId = '.'+$(this).parent().attr('id');
                $(accId).addClass('manual');
                if(!$(this).parent().hasClass('expanded')){
                    $(accId).addClass('expanded');
                    let fh = parseInt($(accId).first().find('.content').attr('data'));
                    $(accId).find('.content').css('height',fh+'px');
                } else {
                    $(accId).removeClass('expanded');
                    $(accId).find('.content').css('height','0px');
                }
            } else {
                if(!$(this).parent().hasClass('expanded')){
                    $(this).parent().addClass('expanded');
                    $(this).siblings('.content').css('height',ah+'px');
                } else {
                    $(this).parent().removeClass('expanded');
                    $(this).siblings('.content').css('height','0px');
                }
            }

            //ADD / REMOVE TAB INDEXING
            if(!$(this).parent().hasClass('expanded')){
                $(this).siblings().find('a').attr('tabIndex','-1');
            } else {
                $(this).siblings().find('a').attr('tabIndex','');
            }
        
        });
    });
    
}


/* REVEAL ELEMENTS ************************/
/* ONLY SETS INITIAL SETTINGS / WILL NEED TO CONTROL INDIVIDUALLY ************************/
function reveal(){
    $('.reveal').each(function(){
        $(this).attr('data',$(this).outerHeight());
        $(this).css('height','0px')
    });
}



/* FAVORITE HEART TOGGLE */
function favorite(){
    $('.favorite').on('click', function(){
        if($(this).hasClass('active')){
            $(this).removeClass('blue');
            $(this).empty().append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 29.9L3.46 17.36a8.41 8.41 0 0111.9-11.9l.64.64.64-.64a8.41 8.41 0 0111.9 11.9zM9.41 5a6.41 6.41 0 00-4.53 11L16 27.07 27.12 16a6.41 6.41 0 00-9.07-9.07l-2.05 2-2-2.05A6.41 6.41 0 009.41 5z"/></svg>`).removeClass('active');
        } else {
            $(this).addClass('blue');
            $(this).empty().append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M31 11.41a8.39 8.39 0 01-2.46 5.95L16 29.9 3.46 17.36a8.41 8.41 0 0111.9-11.9l.64.64.64-.64a8.41 8.41 0 0114.36 6z"/></svg>`).addClass('active');
        }

    });
};