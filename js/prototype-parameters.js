
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