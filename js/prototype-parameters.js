
$(document).ready(function(){
    getQuery();
    
    //DISABLE COLLAPSIBLE DEVICE INFO PANEL
    disableDeviceInfoCollapse();
    
    //SET SCROLLABLE NUTRITION LABELS
    scrollableNL();

    //REMOVES ALL INSTANCES OF SIGNATURE OFFERS
    showSignature();

    //REMOVES INSTANCES OF SINGLE LINE AND DISPLAYS MULTILINE
    showMultiLine();

    //FULL PAGE PLANS
    fullPagePlans();

    //NEW HEADER
    newHeader();
});

// QUERY VALUES ****************************/
// cdip = Collapse Device Info Panel
//      set to "false" to disable

var query = [];
var qObject;

function getQuery(){
    var queries = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(var q = 0; q < queries.length; q++)
    {
        qObject = queries[q].split('=');
        query.push(qObject[0]);
        query[qObject[0]] = qObject[1];
    }
    return query;
}

// QUERY VALUES
// cdip = Collapse Device Info Panel
// USED ON HORIZONTAL PLANS
function disableDeviceInfoCollapse(){
    let param = getQuery()['cdip'];
    if(param === 'false'){
        $('.device-info').removeClass('collapsible');
        $('.link-expand').remove();
    }
}


// scr = Collapse Device Info Panel
// USED IN DRAWER PLANS PAGE
function scrollableNL(){
    let param = getQuery()['scr'];
    if(param === 'true'){
        $('#plans-cards').find('.accordion').find('.wrapper').addClass('scrollable scrollbar thin');
    }
}


//sig = Signature
function showSignature(){
    let param = getQuery()['sig'];
    if(param != 'true'){
        $('.signature').remove();
    } else {
        $('.card.plan').find('.price-point.plan').each(function(){
            let price = parseInt($(this).html());
            price = price - 10;
            $(this).html(price);
        });

        $('.tooltip').find('.total').each(function(){
            let price = $(this).children().last().html();
            price = parseInt(price.slice(1));
            price = price - 10;
            $(this).children().last().html('$' + price + '.00');
        });
    }
}

//multi = Multiline in NL
function showMultiLine(){
    let param = getQuery()['multi'];
    if(param != 'true'){
        $('.nutrition-label').find('.multi').remove();
    } else {
        $('.nutrition-label').find('.single').remove();
    }
}



//fullpage = Plans column full page, no left column details panel
function fullPagePlans(){
    let param = getQuery()['fullpage'];
    if(param === 'true'){
        //REMOVE LEFT PANEL
        $('#details-panel').parent().removeClass('auto-left');
        $('#details-panel').remove();
        //SET CARDS
        $('#plans-carousel').find('.cards').addClass('expanded');
        let cardAmt = $('.card.plan').length;
        let nav = $('#pagination');
        if(cardAmt <= 3 && $(window).width() > 600){
            $('#plans-carousel').addClass('false');
            nav.hide();
        }
        $('.link-expand').remove();
    } else {
        $('#details-footer').remove();
    }

    param = getQuery()['top'];
    if(param === 'true'){
        $('#details-footer').remove();
    } else {
        $('#details-header').remove();
    }
}


//newheader = Apply new header format
function newHeader() {
    param = getQuery()['newheader'];
    if(param === 'true'){
        $('#plans-header').remove();
    } else {
        $('#plans-header-advanced').remove();
    }
}