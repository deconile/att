$(window).on('load', function(){
    setPages();
    
    setTimeout(function(){
        centerControls();
    },250);
});

$(window).on('resize',function(){

});

$(window).on('scroll',function(){

    centerControls();
    
});

var scrollControls;

var cardWidth;

function setPages(){
    $('.card-carousel').each(function(){
        let bubbleElem = `<div class="pag-control pag-bubble"></div>`;

        //CALCULATE PAGINATION
        cardWidth = $(this).find('.overflow-container').find('.plan-card').first().outerWidth();
        $(this).attr('data-dis',(cardWidth - 28));
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
        });

    });

}

function centerControls(){
    let middle = Math.ceil($(window).outerHeight() / 2);
    let scrPos = $(document).scrollTop();

    $('.card-carousel').children('.overflowing').each(function(){
        let control = $(this).parent().children('.pag-control').children('svg');
        let yPos = Math.ceil($(this).parent().offset().top);
        let pos = Math.ceil(((yPos) - (scrPos + middle)));
        let carH = $(this).parent().outerHeight();
        let fPos = Math.ceil(((pos / carH) * 100) * -1);

        if($('.card-carousel').outerHeight() > $(window).innerHeight()){
            if(fPos <= 5){
                fPos = 5;
            } else if(fPos >= 95){
                fPos = 95;
            }
            
            control.css('top',fPos+'%')
        } else {
            control.css('top','50%')
        }
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M19.73 26.71L9 16 19.73 5.29l1.41 1.42L11.85 16l9.29 9.29z"/></svg>
</div>
`

const nextTemplate = `
<div class="next pag-control pag-button base">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M12.27 26.71l-1.41-1.42L20.15 16l-9.29-9.29 1.41-1.42L23 16z"/></svg>
</div>
`