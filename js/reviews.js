$(document).ready(function(){
    collapseAllPosts();
    expandPost();
    vote();
});

//INITIALLY COLLASPE ALL POSTS
function collapseAllPosts(){
    let post = $('.post-text').find('.post-container');
    post.css('height','60px');
}

var responseHeight;

function expandPost(){

    let more = $('.post-text').find('.more');

    //SET HEIGHTS OF EACH POST
    more.on('click', function(){
        responseHeight = $(this).siblings('.post-container').find('.post-height').outerHeight();
        $(this).siblings('.post-container').addClass('expanded').css('height',responseHeight+'px')
    });

}

function vote(){

    let vote = $('.vote'),
        x,
        y;

    vote.on('click', function(){

        x = parseInt($(this).find('div').last().text());
        y = parseInt($(this).siblings().find('div').last().text());

        if(!$(this).hasClass('active')){
            $(this).find('div').last().text(x + 1);
            if($(this).siblings().hasClass('active')){
                $(this).siblings().find('div').last().text(y - 1);
            }
        } else {
            $(this).find('div').last().text(x - 1);
        }

        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        } else {
            $(this).removeClass('active');
        }

            

    });
}
