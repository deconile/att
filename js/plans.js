$(window).on('load', function(){
    loadPlans();
    autoSelect();
});

$(window).on('resize',function(){
    //setElementHeights();
});

var planKey;
var lines = 1;
var sigDiscount = 0;

function loadPlans(){

    $('.plan-cards').each(function(){

        let promo = false;
        
        planKey = $(this).attr('id');

        for(p = 0; p < plans[planKey].length; p++){

            const plancard = `
            <div class="card plan md border shadow radio">
                <div class="main flex col sm top">
                    <div class="badge promo">
                        ${plans[planKey][p].promoIcon}
                        ${plans[planKey][p].promo}
                    </div>
                    <h4>${plans[planKey][p].plan}</h4>
                    <div class="price detailed">
                        <div class="price lg">
                            <div class="strikethrough plan">${Math.ceil(plans[planKey][p].price[lines - 1]).toFixed(2)}</div>
                            <div class="price-point plan">${Math.ceil(plans[planKey][p].price[lines - 1] - 10 - sigDiscount).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div class="accordions">
                
                </div>
            </div>
            `

            $(this).find('.card-carousel').find('.overflow-container').append(plancard);

            if(plans[planKey][p].promo != ''){
                promo = true
            } else {
                $(this).find('.card').eq(p).find('.promo').empty();
            }

        }

        // MAKE ADJUSTMENTS
        //REMOVE ALL PROMO BADGES IF NON EXIST
        if(!promo){$(this).find('.promo').remove();}

        // CENTER CARD IF ONLY ONE
        if($(this).find('.card').length <= 1){
            $(this).find('.overflow-container').addClass('center');
        }

    });

    //PLACE FEATURES
    placeFeatures();

    //SET SIMILAR ELEMENTS TO SAME HEIGHT
    setElementHeights();
}

function setElementHeights(){
    $('.plan-cards').each(function(){
        //SET LABELS
        let h = [];
        $(this).find('.card').each(function(){
            h.push($(this).find('h4').outerHeight());
        });
        h = Math.max(...h);
        $(this).find('.card').find('h4').css('height',h + 'px');
        
        //RESET ARRAY
        h = [];
        $(this).find('.card').each(function(){
            h.push($(this).find('.context').outerHeight());
        });
        h = Math.max(...h);
        $(this).find('.card').find('.context').css('height',h + 'px');
    });
}


function placeFeatures(){
    $('.plan-cards').find('.card').find('.accordions').append(featuresTemplate);
    
    $('.plan-cards').each(function(){
        
        planKey = $(this).attr('id');
        $(this).find('.accordion').attr('id',planKey+'-features');
        
        for(p = 0; p < plans[planKey].length; p++){
            
            let b = p;
            let card = $(this).find('.card').eq(p);
            //ADD FEATURES
            for(f = 0; f < plans[planKey][p].features.length; f++){

                card.find('#'+planKey+'-features').find('ul').append('<li></li>');
                card.find('#'+planKey+'-features').find('li').eq(f).html(plans[planKey][b].features[f].bullet)

                if(plans[planKey][b].features[f].tooltip || plans[planKey][b].features[f].legal){
                    if(plans[planKey][b].features[f].tooltip){
                        card.find('#'+planKey+'-features').find('li').eq(f).addClass('tip');
                        card.find('#'+planKey+'-features').find('li').eq(f).append(tooltipTemplate);
                        card.find('#'+planKey+'-features').find('li').eq(f).find('.tooltip').find('.text').children().html(plans[planKey][b].features[f].legal);
                        if(card.find('#'+planKey+'-features').find('li').eq(0).hasClass('tip')){
                            card.find('#'+planKey+'-features').find('li').eq(0).find('.tooltip').removeClass('top').addClass('bottom');
                        }
                    } 
                    else {
                        card.find('#'+planKey+'-features').find('li').eq(f).append('<div class="legal"></div>');
                        card.find('#'+planKey+'-features').find('li').eq(f).find('div').html(plans[planKey][b].features[f].legal)
                    }
                }
            }

            //ADD CONTEXTUAL MESSAGES
            if(plans[planKey][b].contextual){
                card.find('.main').append(contextualMessage);
                card.find('.main').find('.context').find('p').html(plans[planKey][b].contextual);
            }
        }

    });
}


function autoSelect(){
    $('.plan-cards').first().find('.card').first().addClass('active');
}


const featuresTemplate = `
<div class="accordion matching">
    <div class="control tab-adjust">
        <div class="label">Features & benefits</div>
        <div class="carat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M8 11.05L2.65 5.7l.7-.7L8 9.63 12.65 5l.7.71z"/></svg>
        </div>
    </div>
    <div class="content">
        <div class="wrapper">
            <ul class="bullets">
                
            </ul>
            <div class="legal mar-sm-t"><a href="javascript:void()">Read the legal stuff</a></div>
        </div>
    </div>
</div>
`

const tooltipTemplate = `
<div class="tooltip top right">
    <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M8.5 1A7.5 7.5 0 1016 8.5 7.5 7.5 0 008.5 1zM9 12H8v-1h1zm.83-3.55l-.1.08C9.16 9 9 9.13 9 9.68V10H8v-.32a2.21 2.21 0 011.1-1.93l.11-.08a1.11 1.11 0 00.54-.9c0-.69-.72-.76-1-.76a2.18 2.18 0 00-1.45.63l-.7-.74A3.14 3.14 0 018.72 5a1.8 1.8 0 012 1.76 2.11 2.11 0 01-.89 1.69z"/></svg></div>
    <div class="block">
        <div>
            <div class="tip"><div></div></div>
            <div class="text">
                <div></div> 
            </div>
        </div>
    </div>
</div>
`

const contextualMessage = `
<div class="context warning">
    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M29.21 24.53L18.62 5.63a3 3 0 00-5.24 0L2.79 24.53A3 3 0 005.41 29h21.18a3 3 0 002.62-4.47zM17 24h-2v-2h2zm0-4h-2v-8h2z"/></svg></div>
    <p></p>
</div>
`



//PLAN DETAILS

const star = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M11.88 10.21l.85 4.95-4.46-2.34a.57.57 0 00-.54 0l-4.46 2.34.85-4.95A.58.58 0 004 9.69L.35 6.18l5-.73a.59.59 0 00.44-.32L8 .62l2.23 4.51a.59.59 0 00.44.32l5 .73L12 9.69a.58.58 0 00-.12.52z"/></svg>'

const plans = {
    unlimited : [
        {
            promo : '',
            promoIcon : '',
            plan : 'AT&T Unlimited Premium<sup>SM</sup> Plan',
            price : [95.00,85.00,70.00,60.00,55.00],
            features : [
                {
                    icon : '',
                    bullet : 'Unlimited talk, text, and data',
                    tooltip : false,
                    legal : 'Unlimited high-speed data that can\'t slow down based on how much you use.',
                },
                {
                    icon : '',
                    bullet : '5G access included',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : '50GB mobile hotspot per line',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : 'AT&T ActiveArmor℠ advanced mobile security',
                    tooltip : true,
                    legal : 'Free app with public Wi-Fi protection, identity monitoring and more.',
                },
            ]
        },
        {
            promo : '',
            promoIcon : '',
            plan : 'AT&T Unlimited Extra<sup>®</sup> Plan',
            price : [85.00,75.00,60.00,50.00,45.00],
            features : [
                {
                    icon : '',
                    bullet : 'Unlimited talk, text, data + 50GB of Premium Data',
                    tooltip : false,
                    legal : 'After 50GB, AT&T may temporarily slow data speeds if the network is busy.',
                },
                {
                    icon : '',
                    bullet : '5G access included',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : '15GB mobile hotspot per line',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : 'AT&T ActiveArmor℠ advanced mobile security',
                    tooltip : true,
                    legal : 'Free app with public Wi-Fi protection, identity monitoring and more.',
                },
            ]
        },
        {
            promo : '',
            promoIcon : '',
            plan : 'AT&T Unlimited Starter<sup>®</sup> Plan',
            price : [75.00,70.00,55.00,45.00,40.00],
            features : [
                {
                    icon : '',
                    bullet : 'Unlimited talk, text, and data',
                    tooltip : false,
                    legal : 'AT&T may temporarily slow data speeds if the network is busy.',
                },
                {
                    icon : '',
                    bullet : '5G access included',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : '3GB mobile hotspot per line',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : 'AT&T ActiveArmor℠ mobile security',
                    tooltip : true,
                    legal : 'Free app with Public Wi-Fi Protection, Identity Monitoring, and more.',
                },
            ]
        },
        {
            promo : '',
            promoIcon : '',
            plan : 'AT&T Unlimited Starter<sup>®</sup> Plan',
            price : [75.00,70.00,55.00,45.00,40.00],
            features : [
                {
                    icon : '',
                    bullet : 'Unlimited talk, text, and data',
                    tooltip : false,
                    legal : 'AT&T may temporarily slow data speeds if the network is busy.',
                },
                {
                    icon : '',
                    bullet : '5G access included',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : '3GB mobile hotspot per line',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : 'AT&T ActiveArmor℠ mobile security',
                    tooltip : true,
                    legal : 'Free app with Public Wi-Fi Protection, Identity Monitoring, and more.',
                },
            ]
        },
    ],
    other : [
{
            promo : '',
            promoIcon : '',
            plan : 'AT&T Value Plus<sup>SM</sup>',
            price : [60.00,'N/A','N/A','N/A','N/A'],
            features : [
                {
                    icon : '',
                    bullet : 'Unlimited talk, text, and data',
                    tooltip : false,
                    legal : 'AT&T may temporarily slow data speeds if the network is busy.',
                },
                {
                    icon : '',
                    bullet : '5G access included',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : 'AT&T ActiveArmor℠ mobile security',
                    tooltip : true,
                    legal : 'Free app with Spam Call Blocking and more.',
                },
            ],
            contextual : 'The plan is only eligible for one line.',
        },
        {
            promo : '',
            promoIcon : '',
            plan : 'AT&T 4GB<sup>SM</sup>',
            price : [60.00,55.00,50.00,50.00,50.00],
            features : [
                {
                    icon : '',
                    bullet : 'Unlimited talk, text, and 4GB data per line',
                    tooltip : false,
                    legal : 'Roaming may be at 2G speeds.',
                },
                {
                    icon : '',
                    bullet : 'Mobile Hotspot',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '',
                    bullet : 'AT&T ActiveArmor℠ mobile security',
                    tooltip : true,
                    legal : 'Free app with Spam Call Blocking and more.',
                },
                {
                    icon : '',
                    bullet : 'Standard-definition streaming',
                    tooltip : false,
                    legal : false,
                },
            ],
            contextual : 'If you choose this plan, it will also apply to any other devices you add to your order.',
        },
    ],
    firstnet : []
}



//SIGNATURE ******************************/
const sigBadge = `
<div class="signature">
    <div class="badge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M12.5 0A1.5 1.5 0 0114 1.5v14.3l-5.5-2.66L3 15.8V1.5A1.5 1.5 0 014.5 0zM9 3H8v1a1.5 1.5 0 000 3h1a.5.5 0 010 1H7v1h1v1h1V9a1.51 1.51 0 001.46-1.5A1.5 1.5 0 009 6H8a.5.5 0 110-1h2V4H9V3z"/></svg>
        <span>Exclusive Signature Offer</span>
    </div>
    <div class="tooltip top">
        <div class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M8.5 1A7.5 7.5 0 1016 8.5 7.5 7.5 0 008.5 1zM9 12H8v-1h1zm.83-3.55l-.1.08C9.16 9 9 9.13 9 9.68V10H8v-.32a2.21 2.21 0 011.1-1.93l.11-.08a1.11 1.11 0 00.54-.9c0-.69-.72-.76-1-.76a2.18 2.18 0 00-1.45.63l-.7-.74A3.14 3.14 0 018.72 5a1.8 1.8 0 012 1.76 2.11 2.11 0 01-.89 1.69z"/></svg></div>
        <div class="block">
            <div>
                <div class="tip"><div></div></div>
                <div class="content">
                    <div>Save $10/mo. per phone line on AT&T Unlimited Premium. <u>See offer details.</u></div> 
                </div>
            </div>
        </div>
    </div>
</div>
`
