$(window).on('load', function(){
    signatureHeadband();
});




// HEADBAND NAV
function signatureHeadband(){
    let nav = $('#signature-component').find('.headband').find('li');
    let acc = $('#signature-component').find('.accordion').find('.content');
    setTimeout(function(){
        let h = acc.attr('data');
        acc.attr('data-base',h);
    },500);

    nav.on('click', function(){
        //ACTIVATE
        nav.removeClass('active');
        $(this).addClass('active');

        showInputs();

    });
}

function showInputs(){
    let reveal = $('#signature-component').find('.reveal');
    let acc = $('#signature-component').find('.accordion').find('.content');


    let revealH = parseInt(reveal.attr('data'));
    let accH = parseInt(acc.attr('data-base'));

    acc.css('height',accH + revealH + 'px');
    reveal.css('height',revealH + 'px');

    acc.attr('data',accH + revealH);

}