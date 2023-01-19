$(document).ready(function(){
    //TABS
    tabs();

    //JUMP LINKS
    jumpLinks();
    getScrollPositions();
    activeLinksOnScroll();

    //ICON CARDS
    iconCard();

    // QUANTITY INCREMENTOR
    quantity();

    //FILTER DROPDOWN
    displayFilters();

    //ACCORDION
    collapseAllAccordions();
    accordion();

    setTimeout(function(){
        //CHECKBOX & RADIO
        checkBox();

        //FAVORITE
        favorite();
    },1000);

});


// TABS FUNCTIONALITY ////////////////////////////////////////
var activeTab;

function tabs(){
    //INITIAL SETTINGS & ACTIVATE FIRST TAB
    activeTab = $('.tabs').find('div').first().attr('id');
    
    let tab = $('.tabs').children();
    let content = $('#drawer-left-content').find('.main').children();

    tab.siblings('#'+activeTab).addClass('active');
    content.siblings('#'+activeTab).addClass('active');

    //TAB SWITCHING
    tab.on('click', function(){
        activeTab = $(this).attr('id');

        if(!$(this).hasClass('active')){
            tab.removeClass('active');
            $(this).addClass('active');

            content.fadeOut(250);
            setTimeout(function(){
                content.siblings('#'+activeTab).fadeIn(250);
            },250);
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

var accordionHeight;

//INITIALLY COLLASPE ALL ACCORDIONS
function collapseAllAccordions(){
    let content = $('.accordion').find('.content');
    content.css('height','0px');
}

function accordion(){
    let accordion = $('.accordion').find('.control');

    accordion.on('click', function(){
        if(!$(this).parent().hasClass('expanded')){
            $(this).parent().addClass('expanded');

            accordionHeight = $(this).siblings('.content').find('.content-container').outerHeight();
            $(this).siblings('.content').css('height',accordionHeight+'px');

        } else {
            $(this).parent().removeClass('expanded');
            $(this).siblings('.content').css('height','0px');
        }
    });
}



/* FAVORITE HEART TOGGLE */
function favorite(){
    $('.favorite').on('click', function(){
        if($(this).hasClass('active')){
            $(this).empty().append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 29.9L3.46 17.36a8.41 8.41 0 0111.9-11.9l.64.64.64-.64a8.41 8.41 0 0111.9 11.9zM9.41 5a6.41 6.41 0 00-4.53 11L16 27.07 27.12 16a6.41 6.41 0 00-9.07-9.07l-2.05 2-2-2.05A6.41 6.41 0 009.41 5z"/></svg>`).removeClass('active');
        } else {
            $(this).empty().append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M31 11.41a8.39 8.39 0 01-2.46 5.95L16 29.9 3.46 17.36a8.41 8.41 0 0111.9-11.9l.64.64.64-.64a8.41 8.41 0 0114.36 6z"/></svg>`).addClass('active');
        }

    });
};