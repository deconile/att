$(window).on('load', function(){
    
    setPages();
    
});

$(window).on('resize',function(){

});

var cardWidth;

function setPages(){
    $('.card-carousel').each(function(){
        let bubbleElem = `<div class="control pag-bubble"></div>`;

        //CALCULATE PAGINATION
        cardWidth = $(this).find('.overflow-container').children().first().outerWidth();
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
        }

        let addAmt = Math.ceil(ex / cardWidth) + 1;
        $(this).attr('data-pages',addAmt)

        for(c = 0; c < addAmt; c++){
            $(this).siblings().find('.pag-bubbles').append(bubbleElem);
        }

        $(this).siblings().find('.pag-bubbles').children().first().addClass('active');

    });

    setScrollDistance();

    cardCarousel();
}

function setScrollDistance(){
    $('.card-carousel').each(function(){
        $(this).attr('data-dis',cardWidth);
    });
}

function cardCarousel(){

    $('.card-carousel').each(function(){
        let control = $(this).siblings().find('.control');
        let prev = $(this).siblings().find('.prev');
        let next = $(this).siblings().find('.next');
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
            let dis = parseInt($(this).parents('.pagination').siblings('.card-carousel').attr('data-dis'));
            let gap = parseInt($(this).parents('.pagination').siblings('.card-carousel').children().css('gap'));
            $(this).parents('.pagination').siblings('.card-carousel').children().scrollLeft((dis + gap) * page);

        });

    });

}

//PAGINATION TEMPLATE
const pagTemplate = `
<div class="pagination mar-md-t">
    <div class="pag-container">
        <div class="pag-bar">
            <div class="prev control pag-button inactive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 31A15 15 0 101 16a15 15 0 0015 15zm0-28A13 13 0 113 16 13 13 0 0116 3zm1.71 19.71L11 16l6.7-6.71 1.42 1.42L13.83 16l5.3 5.29z"/></svg>
            </div>
            <div class="pag-bubbles"></div>
            <div class="next control pag-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 1a15 15 0 1015 15A15 15 0 0016 1zm0 28a13 13 0 1113-13 13 13 0 01-13 13zM14.29 9.29L21 16l-6.7 6.71-1.42-1.42L18.17 16l-5.3-5.29z"/></svg>
            </div>
        </div>
    </div>
</div>
`