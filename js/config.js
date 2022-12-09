$(document).on('ready', function(){
    //WRITE HTML ELEMENTS
    fillColorOptions();
    createCapacityOptions();
    
    
    //FILL REMAINING DETAILS FOR STATIC CONFIG OPTIONS
    fillInitialOptionDetails();


    //ACTIVATE CONFIGURATION CATAGORIES & WALKTHROUGH
    activateConfigOptions();
    initialExpandFirstOption();

    //ACTIVATE INDIVIDUAL CONFIGURE OPTIONS
    optionPricingAdjustments();
    
});



function activateConfigOptions(){
    let head = $('.configure-option-head'),
        option = $('.config');

    head.on('click', function(){

        let contentHeight = $(this).next().children().innerHeight();
        
        if($(this).parent().hasClass('closed')){
            $(this).parent().removeClass('closed').addClass('opened');
            $(this).next().animate({height: contentHeight + 'px'},300);
        } else {
            $(this).parent().removeClass('opened').addClass('closed');
            $(this).next().animate({height: '0px'},300);
        }

    });

    option.on('click', function(){
        
        //CHANGE LABEL
        let label = $(this).parents('.configure-option').find('.configure-option-head').find('.label').find('.selection'),
            labelText = $(this).find('.label').html();
        
        // ANIMATE LABEL CHANGE | FADE OUT-IN
        if(!$(this).hasClass('active')){
                
                label.animate({opacity:'0', left:'10px'},400, function(){
                    label.css('left','-5px');
                });
                setTimeout(function(){
                    label.html(labelText).animate({opacity:'1', left:'0px'},400);
                },400);
 
        }
            

        //ENTER SCRIPT TO CLOSE ON OPTION SELECTION
        //SET "USER OPENED" CHECK BEFORE RUNNING
        //let contentHeight = $(this).parents('.configure-option-container').innerHeight();
        if(!$(this).parents('.configure-option').hasClass('selected')){
            $(this).parents('.configure-option').removeClass('opened').addClass('closed');
            $(this).parents('.configure-option').find('.configure-option-container').animate({height: '0px'},300);
        }

        //SET OPTION TO SELECTED
        $(this).parents('.configure-option').removeClass('unselected progressive').addClass('selected');
    });

}




function fillColorOptions(){
    let colorLabels = ['Alpine Green', 'Silver', 'Gold', 'Graphite', 'Sierra Blue'],
        colorHEX = ['#576856', '#E3E4DF', '#FCEBD3', '#52514D', '#276787'];

    for(c = 0; c < colorLabels.length; c++){

        let hex = colorHEX[c],
            label = colorLabels[c];

        let swatchTemplate = `
        <div class="swatch config">
            <div style="background-color:`+hex+`;"><span class="label">`+label+`</span></div>
        </div>
        `

        $('#color-options').append(swatchTemplate);
    }
}


//
var currentPrice,
    updatePriceTo,
    pricingType = 'plan',
    tradeIn = false,
    nextUp = 0;

const capacity = [128,256];
const planPrice = [27.78,30.56];
const tradePrice = [8.34,11.12];
const retailPrice = [999.99,1099.99];


function createCapacityOptions(){
    for(cap = 0; cap < capacity.length; cap++){

        const capTemplate = `
            <div id="config-${capacity[cap]}" class="card config">
                <div class="label"><span>${capacity[cap]}</span>GB</div>
                <div class="price sm">
                    <div class="price-point ${pricingType}">${planPrice[cap]}</div>
                </div>
            </div>
        `
        $('#capacity-options').append(capTemplate); 
    }
}



//SET HEIGHTS OF ALL OPTION CONTAINERS
function setOptionHeights(){
    $('.configure-option-container').each(function(){
        let contentHeight = $(this).innerHeight();
        $(this).css({height: contentHeight+'px'});
    });
};




// SWAP PRICING DEPENDING ON OPTIONS SELECTED

function optionPricingAdjustments(){
    let option = $('#configure-options').find('.config');
    let c = 0;

    option.on('click', function(){


        if(!$(this).hasClass('active')){

            //SET CAPACITY INDEX FOR OPTION ARRAYS
            if($(this).parents().is('#configure-capacity')){
                c = $(this).index()
            }


            //CAPACITY CONFIG OPTIONS
            if($(this).parents().is('#configure-capacity')){
                if(pricingType === 'retail'){
                    updatePriceTo = retailPrice[c];
                } else if(tradeIn) {
                    updatePriceTo = tradePrice[c] + nextUp;
                } else if(pricingType === 'plan') {
                    updatePriceTo = planPrice[c] + nextUp;
                } 

                if(tradeIn) {
                    $('#config-plan').find('.price-point').text(tradePrice[c] + nextUp);
                } else {
                    $('#config-plan').find('.price-point').text(planPrice[c] + nextUp);
                } 
                
                $('#config-retail').find('.price-point').text(retailPrice[c]);

                $('#config-tradein-true').find('.price-point').text(tradePrice[c] + nextUp);
                $('#config-tradein-false').find('.price-point').text(planPrice[c] + nextUp);
                

            }

            //PLAN & RETAIL CONFIG OPTIONS
            if($(this).is('#config-plan')){
                pricingType = 'plan';

                //CHECK IF NEXT UP WAS SELECTED
                // if($('#config-upgrade-true').hasClass('active')){
                //     nextUp = 5;
                // }
                // //CHECK IF TRADE IN WAS SELECTED
                // if($('#config-tradein-true').hasClass('active')){
                //     tradeIn = true;
                // }

                if(tradeIn){
                    for(p = 0; p < tradePrice.length; p++){
                        $('#configure-capacity').find('.price-point').eq(p).removeClass('retail').addClass('plan').text(tradePrice[p] + nextUp);
                    }
                    updatePriceTo = tradePrice[c] + nextUp;
                } else {
                    for(p = 0; p < planPrice.length; p++){
                        $('#configure-capacity').find('.price-point').eq(p).removeClass('retail').addClass('plan').text(planPrice[p] + nextUp);
                    }
                    updatePriceTo = planPrice[c] + nextUp;
                }

                //UPDATE PRICING PLAN
                $()

                //CHANGE PRICE APPEARANCE
                $('#configure-price').find('.price-point').removeClass('retail').addClass('plan');
                
            }
            
            if($(this).is('#config-retail')){
                pricingType = 'retail';

                //CLEAR NEXT UP AND TRADE IN VALUES (N/A DURING RETAIL PRICE)
                //nextUp = 0;
                //tradeIn = false;

                for(p = 0; p < retailPrice.length; p++){
                    $('#configure-capacity').find('.price-point').eq(p).removeClass('plan').addClass('retail').text(retailPrice[p]);
                }

                updatePriceTo = retailPrice[c];

                //CHANGE PRICE APPEARANCE
                $('#configure-price').find('.price-point').removeClass('plan').addClass('retail');

            }


            //NEXT UP CONFIG OPTIONS
            if($(this).is('#config-upgrade-true') || $(this).is('#config-upgrade-false')){
                
                if($(this).is('#config-upgrade-true')){
                    nextUp = 5;
                    if(updatePriceTo != undefined){
                        updatePriceTo = updatePriceTo + nextUp;
                    }
                    
                } else if($(this).is('#config-upgrade-false')){
                    if(updatePriceTo != undefined){
                        updatePriceTo = updatePriceTo - nextUp;
                    }
                    nextUp = 0;
                }

                if(tradeIn){
                    for(p = 0; p < tradePrice.length; p++){
                        $('#configure-capacity').find('.price-point').eq(p).removeClass('retail').addClass('plan').text(tradePrice[p] + nextUp);
                    }
                    $('#config-plan').find('.price-point').text(tradePrice[c] + nextUp);
                    updatePriceTo = tradePrice[c] + nextUp;
                } else {
                    for(p = 0; p < planPrice.length; p++){
                        $('#configure-capacity').find('.price-point').eq(p).removeClass('retail').addClass('plan').text(planPrice[p] + nextUp);
                    }
                    $('#config-plan').find('.price-point').text(planPrice[c] + nextUp);
                    updatePriceTo = planPrice[c] + nextUp;
                }

                $('#config-tradein-true').find('.price-point').text(tradePrice[c] + nextUp);
                $('#config-tradein-false').find('.price-point').text(planPrice[c] + nextUp);

            }
            


            //TRADE IN CONFIG OPTIONS
    
            if($(this).is('#config-tradein-true')){
                tradeIn = true;
                for(p = 0; p < tradePrice.length; p++){
                    $('#configure-capacity').find('.price-point').eq(p).text(tradePrice[p] + nextUp);
                }

                $('#config-plan').find('.price-point').text(tradePrice[c] + nextUp);

                updatePriceTo = tradePrice[c] + nextUp;
            } else if($(this).is('#config-tradein-false')){
                tradeIn = false;
                for(p = 0; p < planPrice.length; p++){
                    $('#configure-capacity').find('.price-point').eq(p).text(planPrice[p] + nextUp);
                }

                $('#config-plan').find('.price-point').text(planPrice[c] + nextUp);

                updatePriceTo = planPrice[c] + nextUp;
            }


            //ADJUST MAIN PRICES & CONVERT CONFIG PRICES
            
            if(!$(this).hasClass('swatch')){
                adjustPrice();
                convertToPrices();
            }
            
            
            
            //SET SELECTED TO ACTIVE
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            //HIDE/SHOW NON PLAN OPTIONS
            if(pricingType === 'retail'){
                $('#configure-upgrade').hide().removeClass('unselected');
                $('#configure-tradein').hide().removeClass('unselected');
            } else {
                $('#configure-upgrade').show();
                $('#configure-tradein').show();
                if(!$('#configure-upgrade').hasClass('selected')){
                    $('#configure-upgrade').addClass('unselected');
                }
                if(!$('#configure-tradein').hasClass('selected')){
                    $('#configure-tradein').addClass('unselected');
                }
            }

            //GO TO NEXT OPTION AND EXPAND
            openNextOption();

            //CHECK THAT ALL OPTIONS ARE COMPLETE
            checkComplete();

        }
        
    });
}


//CONVERT TO PRICES [ADD COMMAS TO THOUSANDS]
function convertToPrices(){
    $('#configure-options').find('.config').find('.price-point').each(function(){
        let t = parseFloat($(this).text().replace(',',''));
        t = t.toLocaleString('en', {minimumFractionDigits: 2});
        $(this).text(t);
    });
}


// ANIMATED PRICE ROLLING
let addComma
function adjustPrice(){
    $('.adjustable-price').each(function() {
        if($(this).parents().is('#price-monthly') && pricingType === 'retail'){
            $(this).prop('Counter',parseFloat($(this).text().replace(',',''))).animate({
                Counter: 0
            }, {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.abs(now).toFixed(2));
                }
            });
        } else if($(this).parents().is('#price-today') && pricingType === 'plan'){
            $(this).prop('Counter',parseFloat($(this).text().replace(',',''))).animate({
                Counter: 0
            }, {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.abs(now).toFixed(2));
                }
            }); 
        } else {
            $(this).prop('Counter',parseFloat($(this).text().replace(',',''))).animate({
                Counter: updatePriceTo
            }, {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.abs(now).toFixed(2));
                }
            }); 
        }

        setTimeout(() => {
            addComma = parseFloat($(this).text());
            addComma = addComma.toLocaleString('en', {minimumFractionDigits: 2});
            $(this).text(addComma);
        },1100);

    });

}


//CHECK FOR COMPLETION
function checkComplete(){
    let options = $('.configure-option');

    if(options.hasClass('unselected')){ 
        $('#continue').addClass('inactive');
        return false;
    } else {
        $('#continue').removeClass('inactive');
    }

}

//SET ADDITIONAL CONFIG DETAILS & SET HEIGHTS
function fillInitialOptionDetails(){
    $('#configure-price').find('.price-point').text(planPrice[0]);
    $('#configure-pricing').find('.price-point.plan').text(planPrice[0]);
    $('#configure-pricing').find('.price-point.retail').text(retailPrice[0]);

    setTimeout(function(){
        setOptionHeights();
    },500);
}
//CONFIGURATION WALKTHROUGH


function initialExpandFirstOption(){
    let option = $('.configure-option');

    option.removeClass('opened').addClass('closed');
    option.first().removeClass('closed').addClass('opened');
    setTimeout(function(){
        option.first().addClass('progressive');
    },1000);
    
}

function openNextOption(){
    let option = $('.configure-option-container');

    option.each(function(){
        if($(this).parent().hasClass('unselected')){

            let contentHeight = $(this).children().innerHeight();
            $(this).animate({height: contentHeight + 'px'},300);
        
            $(this).parent().removeClass('closed').addClass('opened progressive');
            return false;
        }
    })
}

