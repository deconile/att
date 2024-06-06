$(window).on('load', function(){
    setPages()
    //setTimeout(function(){setPages()},500);
});

$(window).on('resize',function(){

});

$(window).on('scroll',function(){
    clearTimeout(scrollControls);
    scrollControls = setTimeout(function(){
        centerControls()
    },200);
    
});

var scrollControls;

var cardWidth;

function setPages(){
    $('.card-carousel').each(function(){
        let bubbleElem = `<div class="pag-control pag-bubble"></div>`;

        //CALCULATE PAGINATION
        cardWidth = $(this).find('.overflow-container').find('.plan-card').first().outerWidth();
        $(this).attr('data-dis',(cardWidth - 32));
        let cardAmt = $(this).find('.overflow-container').children().length;
        let carouselWidth = cardWidth * cardAmt;
        let ex = carouselWidth - $(this).innerWidth();

        if(ex <= 0){
            ex = 0;
            $(this).addClass('condensed');
        } else {
            $(this).parent().addClass('bleed');
            $(this).children().addClass('overflowing');
            $(this).parent().append(pagTemplate);
            $(this).prepend(prevTemplate);
            $(this).append(nextTemplate);
        }

        let addAmt = Math.ceil(ex / cardWidth) + 1;
        $(this).attr('data-pages',addAmt)

        for(c = 0; c < addAmt; c++){
            $(this).siblings().find('.pag-bubbles').append(bubbleElem);
        }

        $(this).siblings().find('.pag-bubbles').children().first().addClass('active');

    });

    cardCarousel();
}


function cardCarousel(){

    $('.card-carousel').each(function(){
        let control = $(this).parent().find('.pag-control');
        let prev = $(this).find('.prev');
        let next = $(this).find('.next');
        let bubble = $(this).siblings().find('.pag-bubble');

        //CONTROLS
        let page = 0;
        let pages = parseInt($(this).attr('data-pages'));

        control.on('click',function(){
            if($(this).hasClass('next')){
                page++
            } else if($(this).hasClass('prev')){
                page--
            } else {
                page = $(this).index();
            }

            //ACTIVATE ARROW CONTROLS
            control.removeClass('inactive');
            if(page >= pages - 1){
                next.addClass('inactive');
            } else if(page <= 0){
                prev.addClass('inactive');
            }

            //SWITCH BUBBLE
            bubble.removeClass('active');
            bubble.eq(page).addClass('active');

            //SLIDE CAROUSEL
            let dis = parseInt($(this).parents('.card-set').children('.card-carousel').attr('data-dis'));
            let gap = parseInt($(this).parents('.card-set').children('.card-carousel').children('.overflow-container').css('gap'));
            $(this).parents('.card-set').children('.card-carousel').children('.overflow-container').scrollLeft((dis + gap) * page);

            console.log(dis);
            console.log(gap);
        });

    });

}

function centerControls(){
    let middle = Math.ceil($(window).outerHeight() / 2);
    let scrPos = $(document).scrollTop();

    $('.card-carousel').children('.overflowing').each(function(){
        let control = $(this).parent().children('.pag-control').children('.icon');
        let yPos = Math.ceil($(this).parent().offset().top);
        let pos = Math.ceil(((yPos) - (scrPos + middle)));
        let carH = $(this).parent().outerHeight();
        let fPos = Math.ceil(((pos / carH) * 100) * -1);

        if(fPos <= 0){
            fPos = 0;
        } else if(fPos >= 100){
            fPos = 100;
        }
        
        control.css('top',fPos+'%')
    });
}

//PAGINATION TEMPLATE
const pagTemplate = `
<div class="pagination mar-md-t">
    <div class="pag-container">
        <div class="pag-bar">
            <div class="pag-bubbles"></div>
        </div>
    </div>
</div>
`

const prevTemplate = `
<div class="prev pag-control pag-button base inactive">
    <div class="icon px32">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path class="svg-base" d="M38.13 43.29l-1.41 1.42L24 32l12.72-12.71 1.41 1.42L26.84 32zM32 62a30 30 0 1130-30 30 30 0 01-30 30zm0-2A28 28 0 104 32a28 28 0 0028 28z"/></svg>
    </div>
</div>
`

const nextTemplate = `
<div class="next pag-control pag-button base">
    <div class="icon px32">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path class="svg-base" d="M25.87 20.71l1.41-1.42L40 32 27.28 44.71l-1.41-1.42L37.16 32zM32 2A30 30 0 112 32 30 30 0 0132 2zm0 2a28 28 0 1028 28A28 28 0 0032 4z"/></svg>
    </div>
</div>
`