$(window).on('load', function(){
    loadPlans();
    disableContinue();
    //autoSelect();
});

$(window).on('resize',function(){
    //setElementHeights();
});

var planKey;
var lines = 1;
var sigDiscount = 0;
var abp = 0;

function disableContinue(){
    $('#continue').addClass('inactive');
}

function loadPlans(){

    $('.plan-cards').each(function(){

        let promo = false;
        cards = $(this);
        
        planKey = $(this).attr('id');

        for(p = 0; p < plans[planKey].length; p++){

            const plancard = `
            <div class="plan-card flex col md">
                <div class="card plan base border shadow md radio">
                    <div class="content flex col md">
                        <div class="badge-container promo">
                            <div class="badge">
                                ${plans[planKey][p].promoIcon}${plans[planKey][p].promo}
                            </div>
                        </div>
                        <div class="plan-name">
                            <div class="eyebrow">${plans[planKey][p].eyebrow}</div>
                            <h3>${plans[planKey][p].plan}</h3>
                            <div class="legal bold speed">${plans[planKey][p].speed}</div>
                        </div>
                        <div class="icons flex row sm"></div>
                        <div class="desc"><h6>${plans[planKey][p].desc}</h6></div>
                        <div class="hr"></div>
                        <div class="plan-price flex sm spaced bottom">
                            <div class="flex col xs">
                                <div class="price detailed">
                                    <div class="price xl">
                                        <div class="strikethrough" style="display:none;">${Math.abs(plans[planKey][p].price[lines - 1]).toFixed(2)}</div>
                                        <div class="price-point plan">${Math.abs(plans[planKey][p].price[lines - 1] - abp - sigDiscount)}</div>
                                        <div class="disclosure legal">${plans[planKey][p].priceDisc}</div>
                                    </div>
                                </div>
                                <div class="legal shortlegal">${plans[planKey][p].shortlegal}</div>
                            </div>
                            <div class="icon-button lg" onClick="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M17 15h6v2h-6v6h-2v-6H9v-2h6V9h2z"/></svg>
                            </div>
                        </div>

                    </div>
                    
                </div>

                <div class="underlegal flex col xs" style="display:none;">
                    <p class="legal longlegal">${plans[planKey][p].longlegal}</p>
                </div>
                
            </div>
            `

            $(this).find('.card-carousel').find('.overflow-container').append(plancard);

            // CHECK FOR ICONS
            if(plans[planKey][p].icons){
                for(i = 0; i < plans[planKey][p].icons.length; i++){
                    $(this).find('.card').eq(p).find('.icons').append('<div class="icon px24">'+plans[planKey][p].icons[i]+'</div>');
                }
            }

            // CHECK BADGES
            if(!plans[planKey][p].promo){
                $(this).find('.card').eq(p).find('.promo').children('.badge').remove();
            } else {
                promo = true;
            }

            // CHECK FOR SPEED LEGAL
            if(!plans[planKey][p].speed){
                $(this).find('.card').eq(p).find('.content').children('.speed').remove();
            }

            //CHECK FOR SHORT LEGAL
            if(!plans[planKey][p].shortlegal){
                $(this).find('.card').eq(p).find('.content').find('.shortlegal').remove();
            }

            //CHECK FOR LONG LEGAL
            if(plans[planKey][p].longlegal){
                $(this).find('.plan-card').eq(p).children('.underlegal').show();
            } else {
                $(this).find('.plan-card').eq(p).children('.underlegal').remove();  
            }
        }

        // MAKE ADJUSTMENTS
        //REMOVE ALL PROMO BADGES IF NON EXIST
        if(!promo){
            $(this).find('.promo').remove();
        }

    });

    //PLACE CONGTEXTUAL MESSAGES
    contextualMessages();

    //PLACE FEATURES
    $('.plan-cards').find('.plan-card').append('<div class="accordions"></div>');
    
    placeFeatures();
    placeFiberKit();
    placeSpecialOffers();

    //PLACE NUTRITION LABELS
    nutritionLabels();

    //SET SIMILAR ELEMENTS TO SAME HEIGHT
    setTimeout(function(){
        setElementHeights();
        applyCardClick();
    },100);

}

function setElementHeights(){
    $('.plan-cards').each(function(){
        //SET LABELS
        let h = [];
        $(this).find('.card').find('.content').each(function(){
            h.push($(this).find('.plan-name').outerHeight());
        });
        h = Math.max(...h);
        $(this).find('.card').find('.plan-name').css('height',h + 'px');

        //SET CONTEXT MESSAGES
        h = [];
        $(this).find('.card').find('.content').each(function(){
            h.push($(this).find('.desc').outerHeight());
        });
        h = Math.max(...h);
        $(this).find('.card').find('.desc').css('height',h + 'px');
        
        //SET CONTEXT MESSAGES
        h = [];
        $(this).find('.plan-card').each(function(){
            h.push($(this).find('.frame').outerHeight());
        });
        h = Math.max(...h);
        $(this).find('.plan-card').find('.frame').css('height',h + 'px');
    });
}


function placeFeatures(){
    $('.plan-cards').find('.plan-card').find('.accordions').append(featuresTemplate);
    $('.plan-cards').each(function(){
        planKey = $(this).attr('id');
        $(this).find('.accordions').children().eq(0).each(function(){
            $(this).attr('id',planKey+'-features');
        });
    
        for(p = 0; p < plans[planKey].length; p++){
 
            let b = p;
            let card = $(this).find('.overflow-container').children().eq(p);

            //APPLY MATCHING ACCORDIONS
            card.find('#features').attr('id',planKey+'-features');
            
            //ADD FEATURES
            for(f = 0; f < plans[planKey][p].features.length; f++){

                card.find('#'+planKey+'-features').find('ul').append('<li></li>');

                const iconBullet = `
                    <div>${plans[planKey][b].features[f].icon}</div>
                    <div class="flex col">
                        <div class="flex xs middle">
                            <h6>${plans[planKey][b].features[f].bullet}</h6>
                        </div>
                    </div>
                `

                card.find('#'+planKey+'-features').find('ul').find('li').eq(f).append(iconBullet);

                //APPLY LEGAL
                if(plans[planKey][b].features[f].legal){
                    card.find('#'+planKey+'-features').find('ul').find('li').eq(f).children().last().append('<div class="legal">'+plans[planKey][b].features[f].legal+'</div>')
                } else {
                    card.find('#'+planKey+'-features').find('ul').find('li').eq(f).css('align-items','center');
                }

                //APPLY TOOLTIPS
                let listItem = card.find('#'+planKey+'-features').find('ul').find('li').eq(f);
                if(plans[planKey][b].features[f].tooltip){
                    listItem.children().last().find('h6').parent().append(tooltipTemplate);
                    listItem.children().last().find('.tooltip').find('.text').html(plans[planKey][b].features[f].tooltip);
                    if(f < 2){
                        listItem.children().last().find('.tooltip').addClass('bottom');
                    }
                    if(listItem.find('h6').outerWidth() > (listItem.outerWidth() / 2)){
                        listItem.children().last().find('.tooltip').addClass('right');
                    }
                }
            }

        }

    });
}

function placeFiberKit(){

}

function placeSpecialOffers(){

}

function nutritionLabels(){
    $('.plan-cards').find('.plan-card').find('.accordions').append(nutrition);
    $('.plan-cards').each(function(){
        planKey = $(this).attr('id');

        for(p = 0; p < plans[planKey].length; p++){
            let b = p;
            let card = $(this).find('.overflow-container').children().eq(p);
            
            //APPLY MATCHING ACCORDIONS
            card.find('#nl').attr('id',planKey+'-nl');
            
            //ADD LABEL CONTENT
            card.find('#'+planKey+'-nl').find('.price-point').html(Math.abs(plans[planKey][p].price[lines - 1]).toFixed(2) + '*');
            card.find('#'+planKey+'-nl').find('.plan-title').html(plans[planKey][p].plan);
            
        }
    });
}


function contextualMessages(){
    
    $('.plan-cards').each(function(){
        planKey = $(this).attr('id');

        for(p = 0; p < plans[planKey].length; p++){

            let b = p;
            let card = $(this).find('.overflow-container').children().eq(p);

            if(plans[planKey][b].contextual){
                card.append(contextualMessage);
                card.find('.context').find('p').html(plans[planKey][b].contextual);
            }
            
        }
    });
}

function applyCardClick(){
    $('.plan-cards').find('.card').on('click', function(){
        
        let card = $(this);

        //REVEAL CARD ELEMENTS
        $(this).parents('.plan-cards').find('.reveal').each(function(){
            let t = $(this);
            let h = parseInt($(this).attr('data'));
            $(this).css('height',h+'px');
            $(this).addClass('mar-sm-t');
    
            setTimeout(function(){
                t.removeClass('reveal').css('height','');
            },1000);
        });

        setTimeout(function(){
            card.parents('.tab-content').attr('data-height',card.parents('.tab-content').children().outerHeight());
        },1000);

        //ACTIVATE CONTINUE
        $('#continue').removeClass('inactive');
    });
}

function autoSelect(){
    $('.plan-cards').first().find('.card').first().addClass('active');
}




const boltOn = `

<div class="icon-button lg" onClick="">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path class="svg-base" d="M18 32a4 4 0 11-4-4 4 4 0 014 4zm14-4a4 4 0 104 4 4 4 0 00-4-4zm18 0a4 4 0 104 4 4 4 0 00-4-4z"/></svg>
</div>

`

const featuresTemplate = `
<div id="features" class="accordion matching">
    <div class="control tab-adjust">
        <div class="label">Compare features</div>
        <div class="carat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M8 11.05L2.65 5.7l.7-.7L8 9.63 12.65 5l.7.71z"/></svg>
        </div>
    </div>
    <div class="content">
        <div class="wrapper">
            <ul class="icons">
                
            </ul>
        </div>
    </div>
</div>
`

const tooltipTemplate = `
<div class="tooltip">
    <div class="icon hitarea">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path class="svg-base" fill-rule="evenodd" d="M7.5 5.5h1v-1h-1zm0 6h1v-5h-1zm.5 3a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zm0-14a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15z" clip-rule="evenodd"/>
        </svg>
    </div>
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
<div class="frame xs neutral flex middle">
    <div class="context warning">
        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M29.21 24.53L18.62 5.63a3 3 0 00-5.24 0L2.79 24.53A3 3 0 005.41 29h21.18a3 3 0 002.62-4.47zM17 24h-2v-2h2zm0-4h-2v-8h2z"/></svg></div>
        <p></p>
    </div>
</div>
`

//PLAN DETAILS

const star = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M11.88 10.21l.85 4.95-4.46-2.34a.57.57 0 00-.54 0l-4.46 2.34.85-4.95A.58.58 0 004 9.69L.35 6.18l5-.73a.59.59 0 00.44-.32L8 .62l2.23 4.51a.59.59 0 00.44.32l5 .73L12 9.69a.58.58 0 00-.12.52z"/></svg>',
    star2 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 6.76l2.52 5.1a3.1 3.1 0 002.32 1.69l5.63.82-4.07 4a3.07 3.07 0 00-.89 2.73l1 5.6-5-2.64a3.06 3.06 0 00-2.88 0l-5 2.64 1-5.6a3.1 3.1 0 00-.89-2.74l-4.07-4 5.63-.82a3.1 3.1 0 002.32-1.69L16 6.76m0-4.52L11.69 11a1.09 1.09 0 01-.82.6L1.23 13l7 6.8a1.1 1.1 0 01.31 1l-1.65 9.6 8.62-4.53a1.07 1.07 0 011 0l8.62 4.53-1.65-9.6a1.1 1.1 0 01.31-1l7-6.8-9.64-1.4a1.09 1.09 0 01-.82-.6L16 2.24z"/></svg>',
    activeArmor = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" fill-rule="evenodd" clip-rule="evenodd" d="M7.05 11.05c-.56.42-1.08.88-1.56 1.36A19.84 19.84 0 0 0 1.27 19 15.09 15.09 0 0 1 17.69 1.1c.29.2.59.43.88.72a18.25 18.25 0 0 1 4.37 6.9c.14.38.25.78.35 1.18a14.92 14.92 0 0 0-16.24 1.16Zm17.42-2.7a14.76 14.76 0 0 1 .77 4.61c.02 2.22-.43 4.53-1.46 6.71-1.15 2.42-3 4.69-5.64 6.28l.09.03.09.03a16.85 16.85 0 0 0 7.84.44c.4-.07.75-.18 1.07-.3A15.07 15.07 0 0 0 31 16.13C31 9.4 26.65 3.72 20.69 1.86a19.6 19.6 0 0 1 3.78 6.48Zm-1.58 19.72c-1.84 0-3.75-.25-5.48-.77a14.52 14.52 0 0 1-3.2-1.4A15 15 0 0 1 6.76 13l-.41.4a17.9 17.9 0 0 0-4.23 6.86c-.14.42-.22.8-.27 1.18A15.04 15.04 0 0 0 15.89 31c3.43 0 6.58-1.14 9.11-3.05-.68.08-1.4.12-2.11.12Z"/></svg>',
    car = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M28.982 14.87l-4.818-1.604-3.294-2.786a10.223 10.223 0 00-6.589-2.417H8.17a2.828 2.828 0 00-2.649 1.91q-.127.374-.246.756l1.771.547c.074-.238.152-.475.227-.697a.956.956 0 01.897-.662h6.111a8.366 8.366 0 015.391 1.978l3.43 2.902a.929.929 0 00.307.172l4.98 1.657a.94.94 0 01.644.885v1.678a.931.931 0 01-.275.667.946.946 0 01-.652.26h-.132a3.69 3.69 0 00-7.152-.008l-6.706-.068a3.688 3.688 0 00-7.13.076h-.124a.93.93 0 01-.936-.908v-1.206H4.072v1.206a2.791 2.791 0 002.782 2.763h.131a3.694 3.694 0 007.178-.075l6.654.067a3.691 3.691 0 007.157.008h.149a2.736 2.736 0 001.94-.799 2.77 2.77 0 00.824-1.983v-1.678a2.797 2.797 0 00-1.905-2.642zm-18.42 8.027a1.854 1.854 0 111.854-1.854 1.856 1.856 0 01-1.854 1.854zm13.835 0a1.854 1.854 0 111.854-1.854 1.856 1.856 0 01-1.854 1.854zM9.175 14.002H2v-2h7.176zm-3 3H1v-2h5.176z"/></svg>',
    gameController = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M11 12h2v2h-2v2H9v-2H7v-2h2v-2h2zm9 0h2v-2h-2zm3 4h2v-2h-2zm5.22 11.55a3.64 3.64 0 01-3.7-1.22L20.11 21h-8.22l-4.41 5.33a3.62 3.62 0 01-2.81 1.33 3.34 3.34 0 01-.89-.11 3.75 3.75 0 01-2.76-4L2.61 9.44A5 5 0 017.57 5h16.86a5 5 0 015 4.44L31 23.5a3.76 3.76 0 01-2.78 4.05zM29 23.7l-1.58-14a3 3 0 00-3-2.66H7.57a3 3 0 00-3 2.66L3 23.72a1.78 1.78 0 001.27 1.9 1.63 1.63 0 001.66-.56l5-6.06h10.13l5 6.06a1.63 1.63 0 001.66.56A1.79 1.79 0 0029 23.7z"/></svg>',
    fourk = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M14.21 12.1h-1.5L8.85 17v1.36h3.77V20h1.59v-1.63h.94v-1.32h-.94zm-1.59 5h-2.19l2.19-2.77zM20 15.26L22.82 20h-2.11l-2-3.48-.9 1.1V20H16v-8h1.8v3.34L20.5 12h2.14zM28 6H4a3 3 0 00-3 3v14a3 3 0 003 3h24a3 3 0 003-3V9a3 3 0 00-3-3zm1 17a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1h24a1 1 0 011 1z"/></svg>',
    sd = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M14.83 16.5a2.26 2.26 0 01.23 1.07 2.29 2.29 0 01-.84 1.88 3.54 3.54 0 01-2.31.69 5.94 5.94 0 01-1.53-.14 4.5 4.5 0 01-1.28-.51L9.58 18a5 5 0 002.23.53q1.41 0 1.41-.81a.57.57 0 00-.12-.37 1 1 0 00-.4-.28 6.43 6.43 0 00-.86-.29l-.49-.14a3.16 3.16 0 01-1.54-.84 2.11 2.11 0 01-.49-1.46A2.43 2.43 0 019.68 13a2.31 2.31 0 011-.85 4 4 0 011.57-.29 5.42 5.42 0 011.32.16 4.47 4.47 0 011.16.47l-.43 1.41a3.68 3.68 0 00-.92-.31 4.27 4.27 0 00-1-.12c-.84 0-1.25.26-1.25.77a.61.61 0 00.26.52 2.62 2.62 0 00.87.36l.49.14a5.58 5.58 0 011.33.52 1.88 1.88 0 01.75.72zm7.58-2.61a4.4 4.4 0 01.48 2.1 4.43 4.43 0 01-.5 2.15A3.32 3.32 0 0121 19.52a4.56 4.56 0 01-2.14.48h-2.92v-8h2.89a4.53 4.53 0 012.18.49 3.4 3.4 0 011.4 1.4zM21.05 16a2.59 2.59 0 00-.59-1.81 2.1 2.1 0 00-1.63-.64h-1.09v4.9h1.09a2.07 2.07 0 001.63-.64 2.59 2.59 0 00.59-1.81zM31 9v14a3 3 0 01-3 3H4a3 3 0 01-3-3V9a3 3 0 013-3h24a3 3 0 013 3zm-2 0a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h24a1 1 0 001-1z"/></svg>',
    hd = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M13.62 12h1.8v8h-1.8v-3.24h-3V20H8.8v-8h1.8v3.17h3zM23 13.89a4.4 4.4 0 01.48 2.1 4.43 4.43 0 01-.5 2.15 3.32 3.32 0 01-1.42 1.38 4.6 4.6 0 01-2.15.48h-2.87v-8h2.88a4.54 4.54 0 012.19.49 3.4 3.4 0 011.39 1.4zM21.65 16a2.59 2.59 0 00-.59-1.81 2.12 2.12 0 00-1.64-.64h-1.08v4.9h1.08a2.09 2.09 0 001.64-.64 2.59 2.59 0 00.59-1.81zM31 9v14a3 3 0 01-3 3H4a3 3 0 01-3-3V9a3 3 0 013-3h24a3 3 0 013 3zm-2 0a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h24a1 1 0 001-1z"/></svg>',
    share = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M24 19a5 5 0 00-3.91 1.93l-7.28-3.64A5 5 0 0013 16a5 5 0 00-.19-1.29l7.28-3.64A5 5 0 0024 13a5.09 5.09 0 10-4.81-3.71l-7.28 3.64A5 5 0 008 11a5 5 0 000 10 5 5 0 003.91-1.93l7.28 3.64A5 5 0 1024 19zm0-14a3 3 0 11-3 3 3 3 0 013-3zM8 19a3 3 0 113-3 3 3 0 01-3 3zm16 8a3 3 0 113-3 3 3 0 01-3 3z"/></svg>',
    message = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M17 11H8V9h9zm-9 6h5v-2H8zm7 0h9v-2h-9zm4-6h5V9h-5zm11-6v16a3 3 0 01-3 3H14.36L7 30.13V24H5a3 3 0 01-3-3V5a3 3 0 013-3h22a3 3 0 013 3zm-2 0a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1h4v3.87L13.64 22H27a1 1 0 001-1z"/></svg>',
    personstar = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M19.59 20.35a5.8 5.8 0 10-7.18 0A9 9 0 007 28.6V31h2v-2.4a7 7 0 0114 0V31h2v-2.4a9 9 0 00-5.41-8.25zM12.2 15.8a3.8 3.8 0 113.8 3.8 3.8 3.8 0 01-3.8-3.8zm1.71-10.51L12.28 3.7l2.25-.33A.59.59 0 0015 3l1-2 1 2a.59.59 0 00.46.33l2.25.33-1.62 1.63a.6.6 0 00-.18.54l.39 2.24L16.29 7a.66.66 0 00-.58 0l-2 1.06.39-2.24a.6.6 0 00-.19-.53zM9 11.93l-2-1.06a.66.66 0 00-.58 0l-2 1.06.38-2.24a.66.66 0 00-.18-.55L3 7.56l2.25-.33a.61.61 0 00.45-.33l1-2 1 2a.63.63 0 00.47.33l2.25.33L8.8 9.14a.63.63 0 00-.18.55zm18.2-2.24l.39 2.24-2-1.06a.66.66 0 00-.58 0l-2 1.06.39-2.24a.63.63 0 00-.18-.55l-1.65-1.58 2.25-.33a.63.63 0 00.47-.33l1-2 1 2a.61.61 0 00.46.33l2.25.33-1.62 1.58a.66.66 0 00-.18.55z"/></svg>',
    persongroup = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M26.35 11.46a5.2 5.2 0 10-6.7 0 7.33 7.33 0 00-1.06.59 5 5 0 00-5.18 0 7.33 7.33 0 00-1.06-.59 5.2 5.2 0 10-6.7 0A8 8 0 001 18.72V20h2v-1.28a6 6 0 016-6 5.93 5.93 0 012.84.72 5.12 5.12 0 00.81 7A8 8 0 008 27.73V29h2v-1.27a6 6 0 0112 0V29h2v-1.27a8 8 0 00-4.65-7.26 5.12 5.12 0 00.81-7 5.93 5.93 0 012.84-.75 6 6 0 016 6V20h2v-1.28a8 8 0 00-4.65-7.26zM5.8 7.52a3.2 3.2 0 113.2 3.2 3.21 3.21 0 01-3.2-3.2zm7 9a3.2 3.2 0 113.2 3.2 3.2 3.2 0 01-3.2-3.19zm7-9a3.2 3.2 0 113.2 3.2 3.21 3.21 0 01-3.2-3.2z"/></svg>',
    smartphone = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M22 31H10a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3v24a3 3 0 01-3 3zM10 3a1 1 0 00-1 1v24a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zm9 2h-6v2h6z"/></svg>',
    piggy = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M8 12h2v2H8zm23 3a11 11 0 01-6 9.79V30h-7v-4h-4v4H7v-7.56a1 1 0 00-.69-1L1 19.72V10h3.66l1.91-1.49L5.6 2h2.94a7.79 7.79 0 015.22 2H20a11 11 0 0111 11zm-2 0a9 9 0 00-9-9h-7l-.3-.29A5.78 5.78 0 008.54 4h-.62l.79 5.37L5.34 12H3v6.28l4 1.31a3 3 0 012 2.85V28h3v-4h8v4h3v-4.49l.6-.27A9 9 0 0029 15zm-9-1h-2a1 1 0 010-2h4v-2h-2V8h-2v2a3 3 0 000 6h2a1 1 0 010 2h-4v2h2v2h2v-2a3 3 0 000-6z"/></svg>',
    cloudup = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M31 16a8 8 0 01-8 8v-2a6 6 0 000-12h-1V9a6 6 0 00-12 0v1H9a6 6 0 000 12v2a8 8 0 01-.94-15.94 8 8 0 0115.88 0A8 8 0 0131 16zm-20.66 2.77l1.42 1.41L15 16.94V29h2V16.94l3.24 3.24 1.42-1.41L16 13.11z"/></svg>',
    images = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M23 9H5a3 3 0 00-3 3v13a3 3 0 003 3h18a3 3 0 003-3V12a3 3 0 00-3-3zM5 11h18a1 1 0 011 1v13l-6.94-8-4.87 5.65L9 19l-5 5.75V12a1 1 0 011-1zm7.4 15H5.57L9 22.05zm1.11-1.79l3.56-4.13L22.2 26h-7.15zM9 18a3 3 0 10-3-3 3 3 0 003 3zm0-4a1 1 0 11-1 1 1 1 0 011-1zm21-6v16h-2V8a1 1 0 00-1-1H6V5h21a3 3 0 013 3z"/></svg>',
    videos = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M23 28H5a3 3 0 01-3-3V12a3 3 0 013-3h18a3 3 0 013 3v13a3 3 0 01-3 3zM5 11a1 1 0 00-1 1v13a1 1 0 001 1h18a1 1 0 001-1V12a1 1 0 00-1-1zm25-3a3 3 0 00-3-3H6v2h21a1 1 0 011 1v16h2zm-19 5v11l7.33-5.49z"/></svg>',
    video = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M13 11l7.34 5.49L13 22zm15-1v13a3 3 0 01-3 3H7a3 3 0 01-3-3V10a3 3 0 013-3h18a3 3 0 013 3zm-2 0a1 1 0 00-1-1H7a1 1 0 00-1 1v13a1 1 0 001 1h18a1 1 0 001-1z"/></svg>',
    devices2 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M5 19h13v2H3v1c0 .54.32 1 .71 1H18v2H3.71C2.22 25 1 23.65 1 22v-3h2V6.71C3 5.22 4.22 4 5.71 4h20.57c.72 0 1.41.28 1.92.79s.8 1.19.8 1.92V9h-2V6.71c0-.19-.07-.37-.21-.5a.718.718 0 00-.51-.21H5.71c-.39 0-.71.32-.71.71V19zm26-5.85v12.69c0 1.19-.95 2.15-2.12 2.15h-6.75c-1.17 0-2.12-.97-2.12-2.15V13.15c0-1.19.95-2.15 2.12-2.15h6.75c1.17 0 2.12.97 2.12 2.15zm-2 0c0-.08-.06-.15-.12-.15h-6.75c-.07 0-.12.07-.12.15v12.69c0 .08.06.15.12.15h6.75c.07 0 .12-.07.12-.15V13.15zm-5 3.84h3v-2h-3v2z"/></svg>',
    website = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M27.26 3H4.74A2.77 2.77 0 002 5.76v19.48A2.77 2.77 0 004.74 28h22.52A2.77 2.77 0 0030 25.24V5.76A2.77 2.77 0 0027.26 3zM4.74 5h22.52a.76.76 0 01.76.76v.76H4v-.76A.76.76 0 014.74 5zm22.52 21H4.74a.76.76 0 01-.74-.76V8.52h24v16.72a.76.76 0 01-.74.76z"/></svg>',
    save = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M23.41 3H3v23a3 3 0 003 3h20a3 3 0 003-3V8.54zM11 5h10v3a1 1 0 01-1 1h-8a1 1 0 01-1-1zm0 22v-9h10v9zm16-1a1 1 0 01-1 1h-3V16H9v11H6a1 1 0 01-1-1V5h4v3a3 3 0 003 3h8a3 3 0 003-3V5.36l4 4z"/></svg>',
    home = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M30.73 16.32L18.19 2.88a3.1 3.1 0 00-4.38 0L1.27 16.32l1.46 1.36L5 15.25V27a3 3 0 003 3h6v-8h4v8h6a3 3 0 003-3V15.25l2.27 2.43zM25 27a1 1 0 01-1 1h-4v-8h-8v8H8a1 1 0 01-1-1V13.11l8.27-8.86a1 1 0 011.46 0L25 13.11z"/></svg>',
    meterHigh = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M15.998 2.669a13.335 13.335 0 1013.335 13.335A13.35 13.35 0 0015.998 2.669zm0 24.67a11.335 11.335 0 1111.335-11.335 11.348 11.348 0 01-11.335 11.335zm6.92-16.841l-1.415-1.414-4.327 4.327a2.825 2.825 0 00-1.178-.262 2.855 2.855 0 102.854 2.855 2.827 2.827 0 00-.262-1.179zm-6.92 6.648a1.142 1.142 0 111.141-1.142 1.143 1.143 0 01-1.141 1.142zm0-8.25a7.117 7.117 0 00-7.109 7.108H7.113a8.888 8.888 0 0112.983-7.885l-.82 1.576a7.03 7.03 0 00-3.278-.8zm8.884 7.108h-1.776a7.035 7.035 0 00-.802-3.283l1.575-.822a8.91 8.91 0 011.003 4.105z"/></svg>',
    meterMid = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="cls-1" d="M16 2.66c-7.35 0-13.33 5.98-13.33 13.33S8.65 29.32 16 29.32s13.33-5.98 13.33-13.33S23.35 2.66 16 2.66zm0 24.67C9.75 27.33 4.67 22.25 4.67 16S9.75 4.66 16 4.66s11.33 5.08 11.33 11.33S22.25 27.32 16 27.32zm.99-14.25V7.72h-2v5.38a3 3 0 00-1.17.7c-.59.58-.92 1.35-.92 2.18 0 .83.31 1.6.89 2.19.6.61 1.4.92 2.2.92s1.57-.3 2.17-.89c.59-.58.92-1.35.92-2.18 0-.83-.31-1.6-.89-2.19-.34-.35-.75-.59-1.2-.74zm-.23 3.69a1.09 1.09 0 01-1.53-1.55c.21-.2.48-.31.76-.31.29 0 .56.12.77.32.2.21.32.48.31.77 0 .29-.12.56-.32.77zm-3.17-7.12c-2.78.68-4.58 3.19-4.58 6.38h-2c0-4.08 2.45-7.43 6.11-8.32l.48 1.94zm11.43 6.38h-2c0-3.19-1.8-5.7-4.58-6.38l.48-1.94c3.65.9 6.11 4.24 6.11 8.32z"/></svg>',
    ai = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M14 5.98h-1.01c-.92 10.52-1.48 11.09-12 12v1.01c10.52.92 11.09 1.48 12 12H14c.92-10.52 1.48-11.09 12-12v-1.01c-10.52-.92-11.09-1.48-12-12zm10.96-4.95H24c-.46 5.32-.69 5.54-6.01 6.01V8c5.32.46 5.54.69 6.01 6.01h.96c.46-5.32.69-5.54 6.01-6.01v-.96c-5.32-.46-5.54-.69-6.01-6.01z"/><path class="svg-base" d="M24.96 1.03H24c-.46 5.32-.69 5.54-6.01 6.01V8c5.32.46 5.54.69 6.01 6.01h.96c.46-5.32.69-5.54 6.01-6.01v-.96c-5.32-.46-5.54-.69-6.01-6.01z"/></svg>',
    wifi = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M15 26h2v2h-2zm-3.86-4.71l1.42 1.42a4.84 4.84 0 016.87 0l1.42-1.42a6.87 6.87 0 00-9.71 0zM1 11.29l1.41 1.42a19.21 19.21 0 0127.15 0L31 11.29a21.22 21.22 0 00-30 0zm5.05 5l1.41 1.42a12.08 12.08 0 0117.06 0l1.41-1.42a14.07 14.07 0 00-19.87 0z"/></svg>',
    router = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M28 16H12v-5h-2v5H4a3 3 0 00-3 3v8a3 3 0 003 3h24a3 3 0 003-3v-8a3 3 0 00-3-3zm1 11a1 1 0 01-1 1H4a1 1 0 01-1-1v-8a1 1 0 011-1h24a1 1 0 011 1zM6 22h2v2H6zm4 0h2v2h-2zm4 0h2v2h-2zM4.64 7.64L3.22 6.22a11 11 0 0115.56 0l-1.42 1.42a9 9 0 00-12.72 0zM11 7a6.89 6.89 0 015 2.06l-1.42 1.4a5 5 0 00-7.06 0l-1.47-1.4A6.89 6.89 0 0111 7z"/></svg>',
    max2 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M6.41 5l6.3 6.29-1.42 1.42L5 6.41V11H3V3h8v2zM21 3v2h4.59l-6.3 6.29 1.42 1.42L27 6.41V11h2V3zm6 22.59l-6.29-6.3-1.42 1.42 6.3 6.29H21v2h8v-8h-2zm-15.71-6.3L5 25.59V21H3v8h8v-2H6.41l6.3-6.29z"/></svg>',
    trendUp = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M30 9v8h-2v-4.59l-9 9-7-7-9.29 9.3-1.42-1.42L12 11.59l7 7L26.59 11H22V9z"/></svg>',
    gameBundle = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M30.646 26.55l-.813-7.714a3.733 3.733 0 00-3.712-3.316h-9.242a3.735 3.735 0 00-3.713 3.324l-.813 7.716a2.504 2.504 0 001.847 2.69 2.425 2.425 0 002.446-.768l2.336-2.48h5.04l2.287 2.432a2.443 2.443 0 002.49.816 2.506 2.506 0 001.846-2.7zm-2.349.765a.477.477 0 01-.488-.202l-2.92-3.11H18.12l-2.972 3.158a.436.436 0 01-.445.154.518.518 0 01-.36-.555l.812-7.699a1.735 1.735 0 011.724-1.541h9.242a1.733 1.733 0 011.723 1.534l.812 7.697a.52.52 0 01-.359.564zm-22.81-7.313h6.078v2H3.346v1.001a1.001 1.001 0 001 1h6.903v2H4.346a3.003 3.003 0 01-3-3v-3h2.14V9.001a3.003 3.003 0 013-3H23a3.004 3.004 0 013 3l-.001 5.001-2-.001.001-5a1.001 1.001 0 00-1-1H6.487a1.001 1.001 0 00-1 1zm11.528-.032h2v2h-2zm6.985 0h2v2h-2z"/></svg>',
    tv = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M8 26h16v2H8zM31 7v14a3 3 0 01-3 3H4a3 3 0 01-3-3V7a3 3 0 013-3h24a3 3 0 013 3zm-2 0a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h24a1 1 0 001-1z"/></svg>',
    phoneCase = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M22 31H10a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3v24a3 3 0 01-3 3zM10 3a1 1 0 00-1 1v24a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zm3 3h-2v5h2z"/></svg>',
    gateway = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M23.89 29.54a8.08 8.08 0 01-.89-3.67V4a3 3 0 00-3-3h-8a3 3 0 00-3 3v21.87a8 8 0 01-.85 3.59L7.38 31h17.26zM11 4a1 1 0 011-1h8a1 1 0 011 1v20H11zm-.5 25a10.18 10.18 0 00.5-3h10a10.18 10.18 0 00.49 3zM15 14h2v2h-2zm0 5h2v2h-2zm0-14h2v2h-2z"/></svg>',
    laptop = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M29 20V8a3 3 0 00-3-3H6a3 3 0 00-3 3v12H1v4a3 3 0 003 3h24a3 3 0 003-3v-4zM5 8a1 1 0 011-1h20a1 1 0 011 1v12H5zm24 16a1 1 0 01-1 1H4a1 1 0 01-1-1v-2h11v1h4v-1h11z"/></svg>',
    tvSatellite = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M31 7v14a3 3 0 01-3 3H4a3 3 0 01-3-3V7a3 3 0 013-3h3v2H4a1 1 0 00-1 1v14a1 1 0 001 1h24a1 1 0 001-1V7a1 1 0 00-1-1h-3V4h3a3 3 0 013 3zm-15 5.39a12.8 12.8 0 009.07-3.75l-1.41-1.41a10.85 10.85 0 01-15.32 0L6.93 8.64A12.8 12.8 0 0016 12.39zm5.85-7L20.44 4a6.28 6.28 0 01-8.88 0l-1.41 1.43A8.25 8.25 0 0016 7.85a8.25 8.25 0 005.85-2.42zM8 28h16v-2H8z"/></svg>',
    moreWays = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M28 23h-9v-2h9a1 1 0 001-1V9H9V5a3 3 0 013-3h16a3 3 0 013 3v15a3 3 0 01-3 3zM11 7h18V5a1 1 0 00-1-1H12a1 1 0 00-1 1zm8 5v6l5-3zm-5 18H4a3 3 0 01-3-3V14a3 3 0 013-3h10a3 3 0 013 3v13a3 3 0 01-3 3zM4 13a1 1 0 00-1 1v13a1 1 0 001 1h10a1 1 0 001-1V14a1 1 0 00-1-1zm6 11H8v2h2z"/></svg>',
    totalHome = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M8.165 11.312H1.879V5.026h2v2.217a14.959 14.959 0 0124.311.007V5.026h2v6.286h-6.285v-2h3.248a12.959 12.959 0 00-22.24 0h3.252zm22.477 1.514l-1.956.42a12.972 12.972 0 11-25.654 2.73 13.035 13.035 0 01.292-2.748l-1.955-.422a14.97 14.97 0 1029.273.02zM16.498 24.013v-3.987h-.99v3.987h-3.492a1.999 1.999 0 01-1.997-1.996v-4.583l-.262.28-1.462-1.364 6.248-6.695a2.064 2.064 0 012.92.001l6.249 6.694-1.462 1.365-.263-.281v4.583a2 2 0 01-1.997 1.996zm2-5.987v3.987h1.492l-.003-6.722-3.986-4.27-3.981 4.268v6.728l1.488-.002v-3.989z"/></svg>'




const plans = {
    unlimited : [
        {
            lifestyle : 'images/lifestyle/plan-1.jpg',
            promo : '',
            promoIcon : '',
            eyebrow : '',
            plan : 'Unlimited Premium<sup>®</sup>',
            price : [95.99,85.99,70.99,60.99,55.99],
            priceDisc : '',
            shortlegal : '',
            longlegal : '<a href="">Read the legal stuff</a>',
            speed : 'Can\'t slow down based on how much you use.',
            icons : [car, gameController, video],
            desc : 'Ideal for people on the go, gaming, and video streaming.',
            bolton : true,
            features : [
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" fill-rule="evenodd" clip-rule="evenodd" d="M7.05 11.05c-.56.42-1.08.88-1.56 1.36A19.84 19.84 0 0 0 1.27 19 15.09 15.09 0 0 1 17.69 1.1c.29.2.59.43.88.72a18.25 18.25 0 0 1 4.37 6.9c.14.38.25.78.35 1.18a14.92 14.92 0 0 0-16.24 1.16Zm17.42-2.7a14.76 14.76 0 0 1 .77 4.61c.02 2.22-.43 4.53-1.46 6.71-1.15 2.42-3 4.69-5.64 6.28l.09.03.09.03a16.85 16.85 0 0 0 7.84.44c.4-.07.75-.18 1.07-.3A15.07 15.07 0 0 0 31 16.13C31 9.4 26.65 3.72 20.69 1.86a19.6 19.6 0 0 1 3.78 6.48Zm-1.58 19.72c-1.84 0-3.75-.25-5.48-.77a14.52 14.52 0 0 1-3.2-1.4A15 15 0 0 1 6.76 13l-.41.4a17.9 17.9 0 0 0-4.23 6.86c-.14.42-.22.8-.27 1.18A15.04 15.04 0 0 0 15.89 31c3.43 0 6.58-1.14 9.11-3.05-.68.08-1.4.12-2.11.12Z"/></svg>',
                    bullet : 'Advanced security',
                    tooltip : 'Download the free AT&T ActiveArmor mobile security app with a compatible smartphone to get advanced features like Public Wi-Fi Protection and Identity Monitoring. You\'ll automatically get 24/7 proactive network security.',
                    legal : 'Free app with Public Wi-Fi Protection, Identity Monitoring, and more.',
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M3 16a12.92 12.92 0 003.81 9.19l-1.42 1.42a15 15 0 010-21.22l1.42 1.42A12.92 12.92 0 003 16zm5.92-7.1a10 10 0 000 14.2l1.42-1.41a8 8 0 010-11.38zm17.65-3.53l-1.41 1.41a13 13 0 010 18.39l1.41 1.41a15 15 0 000-21.21zM23 8.87l-1.41 1.42a8 8 0 010 11.38L23 23.08a10 10 0 000-14.21zM21 16a5 5 0 11-5-5 5 5 0 015 5zm-2 0a3 3 0 10-3 3 3 3 0 003-3z"/></svg>',
                    bullet : '60GB mobile hotspot',
                    tooltip : 'After 60GB, mobile hotspot speed slowed to a maximum of 128Kbps.',
                    legal : 'Per line per month',
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M14.21 12.1h-1.5L8.85 17v1.36h3.77V20h1.59v-1.63h.94v-1.32h-.94zm-1.59 5h-2.19l2.19-2.77zM20 15.26L22.82 20h-2.11l-2-3.48-.9 1.1V20H16v-8h1.8v3.34L20.5 12h2.14zM28 6H4a3 3 0 00-3 3v14a3 3 0 003 3h24a3 3 0 003-3V9a3 3 0 00-3-3zm1 17a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1h24a1 1 0 011 1z"/></svg>',
                    bullet : '4K UHD streaming available',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 1a15 15 0 1015 15A15 15 0 0016 1zm0 28A13 13 0 013 16a12.79 12.79 0 01.78-4.39 2.13 2.13 0 00.61.34s3.23 1.22 2.85 2.68a5.14 5.14 0 00-.36 2.45c.17 1.93 2.52 2.11 3.3 3.22s.75 3.61.92 5 .93 1.13 1.56.94.69-1.66.69-3.06 2.17-1.17 2.17-2.84 1.11-.94 1.11-3.41-3-2.69-4.19-3.84-2-1.11-2.92-.62A1 1 0 018 11.79c0-.5-.41-1.69-1.15-1.24s-1.64-.2-1-1.6 2.39-.7 2.39-.7-.21 1.4.7 1.28.38-2.46 3.65-4.73a12.33 12.33 0 014.53-1.74 13 13 0 013.79.9c0 .46-.06.84-.35.81-.74-.06-1 .21-1 1S19.15 6.86 20 7s1 .1 1.3-.46a6.08 6.08 0 012.2-1.14A13.08 13.08 0 0126 7.65h-.4C24.18 7.53 23 9 22.14 9.81s-.89 1.72-.89 3a2.66 2.66 0 001.55 2.39c.76.46 2.12-.16 2.61-.16s.74.84.55 1.92.71 2.07 1 2.59a19.68 19.68 0 01.41 2.71A13 13 0 0116 29z"/></svg>',
                    bullet : 'Unlimited in <a href="javascript:void()">19 Latin American countries</a>',
                    tooltip : 'Coverage and data speeds vary. Int\'l usage should not exceed Domestic.',
                    legal : 'No extra cost',
                },
            ]
        },
        {
            lifestyle : 'images/lifestyle/plan-2.jpg',
            promo : '',
            promoIcon : '',
            eyebrow : '',
            plan : 'Unlimited Extra<sup>®</sup>',
            price : [85.99,75.99,60.99,50.99,45.99],
            priceDisc : '',
            shortlegal : '',
            longlegal : '<a href="">Read the legal stuff</a>',
            speed : 'After 75GB, AT&T may temporarily slow data speeds if the network is busy.',
            icons : [share, message, personstar],
            desc : 'Perfect for staying connected with friends and family.',
            bolton : false,
            features : [
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" fill-rule="evenodd" clip-rule="evenodd" d="M7.05 11.05c-.56.42-1.08.88-1.56 1.36A19.84 19.84 0 0 0 1.27 19 15.09 15.09 0 0 1 17.69 1.1c.29.2.59.43.88.72a18.25 18.25 0 0 1 4.37 6.9c.14.38.25.78.35 1.18a14.92 14.92 0 0 0-16.24 1.16Zm17.42-2.7a14.76 14.76 0 0 1 .77 4.61c.02 2.22-.43 4.53-1.46 6.71-1.15 2.42-3 4.69-5.64 6.28l.09.03.09.03a16.85 16.85 0 0 0 7.84.44c.4-.07.75-.18 1.07-.3A15.07 15.07 0 0 0 31 16.13C31 9.4 26.65 3.72 20.69 1.86a19.6 19.6 0 0 1 3.78 6.48Zm-1.58 19.72c-1.84 0-3.75-.25-5.48-.77a14.52 14.52 0 0 1-3.2-1.4A15 15 0 0 1 6.76 13l-.41.4a17.9 17.9 0 0 0-4.23 6.86c-.14.42-.22.8-.27 1.18A15.04 15.04 0 0 0 15.89 31c3.43 0 6.58-1.14 9.11-3.05-.68.08-1.4.12-2.11.12Z"/></svg>',
                    bullet : 'Advanced security',
                    tooltip : 'Download the free AT&T ActiveArmor mobile security app with a compatible smartphone to get advanced features like Public Wi-Fi Protection and Identity Monitoring. You\'ll automatically get 24/7 proactive network security.',
                    legal : 'Free app with Public Wi-Fi Protection, Identity Monitoring, and more.',
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M3 16a12.92 12.92 0 003.81 9.19l-1.42 1.42a15 15 0 010-21.22l1.42 1.42A12.92 12.92 0 003 16zm5.92-7.1a10 10 0 000 14.2l1.42-1.41a8 8 0 010-11.38zm17.65-3.53l-1.41 1.41a13 13 0 010 18.39l1.41 1.41a15 15 0 000-21.21zM23 8.87l-1.41 1.42a8 8 0 010 11.38L23 23.08a10 10 0 000-14.21zM21 16a5 5 0 11-5-5 5 5 0 015 5zm-2 0a3 3 0 10-3 3 3 3 0 003-3z"/></svg>',
                    bullet : '30GB mobile hotspot',
                    tooltip : 'After 30GB, mobile hotspot speed slowed to a maximum of 128Kbps.',
                    legal : 'Per line per month',
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M14.83 16.5a2.26 2.26 0 01.23 1.07 2.29 2.29 0 01-.84 1.88 3.54 3.54 0 01-2.31.69 5.94 5.94 0 01-1.53-.14 4.5 4.5 0 01-1.28-.51L9.58 18a5 5 0 002.23.53q1.41 0 1.41-.81a.57.57 0 00-.12-.37 1 1 0 00-.4-.28 6.43 6.43 0 00-.86-.29l-.49-.14a3.16 3.16 0 01-1.54-.84 2.11 2.11 0 01-.49-1.46A2.43 2.43 0 019.68 13a2.31 2.31 0 011-.85 4 4 0 011.57-.29 5.42 5.42 0 011.32.16 4.47 4.47 0 011.16.47l-.43 1.41a3.68 3.68 0 00-.92-.31 4.27 4.27 0 00-1-.12c-.84 0-1.25.26-1.25.77a.61.61 0 00.26.52 2.62 2.62 0 00.87.36l.49.14a5.58 5.58 0 011.33.52 1.88 1.88 0 01.75.72zm7.58-2.61a4.4 4.4 0 01.48 2.1 4.43 4.43 0 01-.5 2.15A3.32 3.32 0 0121 19.52a4.56 4.56 0 01-2.14.48h-2.92v-8h2.89a4.53 4.53 0 012.18.49 3.4 3.4 0 011.4 1.4zM21.05 16a2.59 2.59 0 00-.59-1.81 2.1 2.1 0 00-1.63-.64h-1.09v4.9h1.09a2.07 2.07 0 001.63-.64 2.59 2.59 0 00.59-1.81zM31 9v14a3 3 0 01-3 3H4a3 3 0 01-3-3V9a3 3 0 013-3h24a3 3 0 013 3zm-2 0a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h24a1 1 0 001-1z"/></svg>',
                    bullet : 'Standard definition streaming',
                    tooltip : false,
                    legal : false,
                },
            ]
        },
        {
            lifestyle : 'images/lifestyle/plan-3.jpg',
            promo : '',
            promoIcon : '',
            eyebrow : '',
            plan : 'Unlimited Starter<sup>®</sup>',
            price : [75.99,70.99,55.99,45.99,40.99],
            priceDisc : '',
            shortlegal : '',
            longlegal : '<a href="">Read the legal stuff</a>',
            speed : 'AT&T may temporarily slow data speeds if the network is busy.',
            icons : [persongroup, smartphone, piggy],
            desc : 'Great for the whole family or your first mobile device.',
            bolton : false,
            features : [
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" fill-rule="evenodd" clip-rule="evenodd" d="M7.05 11.05c-.56.42-1.08.88-1.56 1.36A19.84 19.84 0 0 0 1.27 19 15.09 15.09 0 0 1 17.69 1.1c.29.2.59.43.88.72a18.25 18.25 0 0 1 4.37 6.9c.14.38.25.78.35 1.18a14.92 14.92 0 0 0-16.24 1.16Zm17.42-2.7a14.76 14.76 0 0 1 .77 4.61c.02 2.22-.43 4.53-1.46 6.71-1.15 2.42-3 4.69-5.64 6.28l.09.03.09.03a16.85 16.85 0 0 0 7.84.44c.4-.07.75-.18 1.07-.3A15.07 15.07 0 0 0 31 16.13C31 9.4 26.65 3.72 20.69 1.86a19.6 19.6 0 0 1 3.78 6.48Zm-1.58 19.72c-1.84 0-3.75-.25-5.48-.77a14.52 14.52 0 0 1-3.2-1.4A15 15 0 0 1 6.76 13l-.41.4a17.9 17.9 0 0 0-4.23 6.86c-.14.42-.22.8-.27 1.18A15.04 15.04 0 0 0 15.89 31c3.43 0 6.58-1.14 9.11-3.05-.68.08-1.4.12-2.11.12Z"/></svg>',
                    bullet : 'Basic security',
                    tooltip : 'Download the free AT&T ActiveArmor mobile security app with a compatible smartphone to get advanced features like Public Wi-Fi Protection and Identity Monitoring. You\'ll automatically get 24/7 proactive network security.',
                    legal : 'Free app with Spam Call Blocking and more.',
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M3 16a12.92 12.92 0 003.81 9.19l-1.42 1.42a15 15 0 010-21.22l1.42 1.42A12.92 12.92 0 003 16zm5.92-7.1a10 10 0 000 14.2l1.42-1.41a8 8 0 010-11.38zm17.65-3.53l-1.41 1.41a13 13 0 010 18.39l1.41 1.41a15 15 0 000-21.21zM23 8.87l-1.41 1.42a8 8 0 010 11.38L23 23.08a10 10 0 000-14.21zM21 16a5 5 0 11-5-5 5 5 0 015 5zm-2 0a3 3 0 10-3 3 3 3 0 003-3z"/></svg>',
                    bullet : '5GB mobile hotspot',
                    tooltip : 'After 5GB, mobile hotspot speed slowed to a maximum of 128Kbps.',
                    legal : 'Per line per month',
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M14.83 16.5a2.26 2.26 0 01.23 1.07 2.29 2.29 0 01-.84 1.88 3.54 3.54 0 01-2.31.69 5.94 5.94 0 01-1.53-.14 4.5 4.5 0 01-1.28-.51L9.58 18a5 5 0 002.23.53q1.41 0 1.41-.81a.57.57 0 00-.12-.37 1 1 0 00-.4-.28 6.43 6.43 0 00-.86-.29l-.49-.14a3.16 3.16 0 01-1.54-.84 2.11 2.11 0 01-.49-1.46A2.43 2.43 0 019.68 13a2.31 2.31 0 011-.85 4 4 0 011.57-.29 5.42 5.42 0 011.32.16 4.47 4.47 0 011.16.47l-.43 1.41a3.68 3.68 0 00-.92-.31 4.27 4.27 0 00-1-.12c-.84 0-1.25.26-1.25.77a.61.61 0 00.26.52 2.62 2.62 0 00.87.36l.49.14a5.58 5.58 0 011.33.52 1.88 1.88 0 01.75.72zm7.58-2.61a4.4 4.4 0 01.48 2.1 4.43 4.43 0 01-.5 2.15A3.32 3.32 0 0121 19.52a4.56 4.56 0 01-2.14.48h-2.92v-8h2.89a4.53 4.53 0 012.18.49 3.4 3.4 0 011.4 1.4zM21.05 16a2.59 2.59 0 00-.59-1.81 2.1 2.1 0 00-1.63-.64h-1.09v4.9h1.09a2.07 2.07 0 001.63-.64 2.59 2.59 0 00.59-1.81zM31 9v14a3 3 0 01-3 3H4a3 3 0 01-3-3V9a3 3 0 013-3h24a3 3 0 013 3zm-2 0a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1h24a1 1 0 001-1z"/></svg>',
                    bullet : 'Standard definition streaming',
                    tooltip : false,
                    legal : false,
                },
            ]
        },
    ],
    other : [
        {
            lifestyle : 'images/lifestyle/plan-4.jpg',
            promo : '',
            promoIcon : '',
            eyebrow : '',
            plan : 'AT&T Value Plus<sup>℠</sup>',
            price : [60],
            priceDisc : '',
            shortlegal : '',
            longlegal : '<a href="">Read the legal stuff</a>',
            icons : [car, gameController, fourk],
            speed : '',
            desc : 'Budget friendly option just for you',
            bolton : false,
            features : [
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M22 31H10a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3v24a3 3 0 01-3 3zM10 3a1 1 0 00-1 1v24a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zm9 2h-6v2h6z"/></svg>',
                    bullet : 'Unlimited talk, text, and data',
                    tooltip : false,
                    legal : 'AT&T may temporarily slow data speeds if the network is busy.',
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M30.4 14.4h-5.2c-1.6 0-2.6 1-3.2 2.5h4l-1.3 2.7a6 6 0 0 1-2.8.8c-.7 0-1.6-.2-2.1-.8-.6-.7-.7-1.7-.5-2.7a7 7 0 0 1 1.2-2.5h-3.7l-1 2.5c-.5 2.2.1 4 1 4.8 1 1.1 2.6 1.8 4.7 1.8 3.3 0 5.6-1.7 5.6-1.7l3.4-7.3v-.1ZM31 9h-4.5c-3.7 0-6.2 1.2-7.8 2.8h8.2A4.7 4.7 0 0 0 31 9.1a.1.1 0 0 0-.1-.1Zm-13.6.1a4.7 4.7 0 0 1-4.2 2.7H8.8l-1.2 2.6h2.7c1.4 0 2.4.2 3.2.8a3 3 0 0 1 .9 2.6 6.3 6.3 0 0 1-4 5 12.9 12.9 0 0 1-9.4-.5l1.4-2.9 1.7.7 2.5.3c1 0 2-.2 2.7-.5.5-.3 1.3-.8 1.6-1.5.3-.8 0-1.5-1.3-1.5H3.2L6.8 9h10.4v.1Z"/></svg>',
                    bullet : '5G access included',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" fill-rule="evenodd" clip-rule="evenodd" d="M7.05 11.05c-.56.42-1.08.88-1.56 1.36A19.84 19.84 0 0 0 1.27 19 15.09 15.09 0 0 1 17.69 1.1c.29.2.59.43.88.72a18.25 18.25 0 0 1 4.37 6.9c.14.38.25.78.35 1.18a14.92 14.92 0 0 0-16.24 1.16Zm17.42-2.7a14.76 14.76 0 0 1 .77 4.61c.02 2.22-.43 4.53-1.46 6.71-1.15 2.42-3 4.69-5.64 6.28l.09.03.09.03a16.85 16.85 0 0 0 7.84.44c.4-.07.75-.18 1.07-.3A15.07 15.07 0 0 0 31 16.13C31 9.4 26.65 3.72 20.69 1.86a19.6 19.6 0 0 1 3.78 6.48Zm-1.58 19.72c-1.84 0-3.75-.25-5.48-.77a14.52 14.52 0 0 1-3.2-1.4A15 15 0 0 1 6.76 13l-.41.4a17.9 17.9 0 0 0-4.23 6.86c-.14.42-.22.8-.27 1.18A15.04 15.04 0 0 0 15.89 31c3.43 0 6.58-1.14 9.11-3.05-.68.08-1.4.12-2.11.12Z"/></svg>',
                    bullet : 'Advanced security',
                    tooltip : 'Download the free AT&T ActiveArmor mobile security app with a compatible smartphone to get advanced features like Public Wi-Fi Protection and Identity Monitoring. You\'ll automatically get 24/7 proactive network security.',
                    legal : 'Free app with Public Wi-Fi Protection, Identity Monitoring, and more.',
                },
            ],
            contextual : 'The plan is only eligible for one line.',
        },
        {
            lifestyle : 'images/lifestyle/plan-5.jpg',
            promo : '',
            promoIcon : '',
            eyebrow : '',
            plan : 'AT&T 4GB<sup>℠</sup>',
            price : [60],
            priceDisc : '',
            shortlegal : '',
            longlegal : '<a href="">Read the legal stuff</a>',
            speed : '',
            icons : [car, gameController, fourk],
            desc : 'Great option for business on the go',
            bolton : false,
            features : [
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M22 31H10a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3v24a3 3 0 01-3 3zM10 3a1 1 0 00-1 1v24a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zm9 2h-6v2h6z"/></svg>',
                    bullet : 'Unlimited talk, text and 4GB of data per line in the US, Canada, and Mexico',
                    tooltip : false,
                    legal : 'Roaming may be at 2G speeds.',
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M3 16a12.92 12.92 0 003.81 9.19l-1.42 1.42a15 15 0 010-21.22l1.42 1.42A12.92 12.92 0 003 16zm5.92-7.1a10 10 0 000 14.2l1.42-1.41a8 8 0 010-11.38zm17.65-3.53l-1.41 1.41a13 13 0 010 18.39l1.41 1.41a15 15 0 000-21.21zM23 8.87l-1.41 1.42a8 8 0 010 11.38L23 23.08a10 10 0 000-14.21zM21 16a5 5 0 11-5-5 5 5 0 015 5zm-2 0a3 3 0 10-3 3 3 3 0 003-3z"/></svg>',
                    bullet : 'Mobile Hotspot',
                    tooltip : false,
                    legal : false,
                },
                {
                    icon : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" fill-rule="evenodd" clip-rule="evenodd" d="M7.05 11.05c-.56.42-1.08.88-1.56 1.36A19.84 19.84 0 0 0 1.27 19 15.09 15.09 0 0 1 17.69 1.1c.29.2.59.43.88.72a18.25 18.25 0 0 1 4.37 6.9c.14.38.25.78.35 1.18a14.92 14.92 0 0 0-16.24 1.16Zm17.42-2.7a14.76 14.76 0 0 1 .77 4.61c.02 2.22-.43 4.53-1.46 6.71-1.15 2.42-3 4.69-5.64 6.28l.09.03.09.03a16.85 16.85 0 0 0 7.84.44c.4-.07.75-.18 1.07-.3A15.07 15.07 0 0 0 31 16.13C31 9.4 26.65 3.72 20.69 1.86a19.6 19.6 0 0 1 3.78 6.48Zm-1.58 19.72c-1.84 0-3.75-.25-5.48-.77a14.52 14.52 0 0 1-3.2-1.4A15 15 0 0 1 6.76 13l-.41.4a17.9 17.9 0 0 0-4.23 6.86c-.14.42-.22.8-.27 1.18A15.04 15.04 0 0 0 15.89 31c3.43 0 6.58-1.14 9.11-3.05-.68.08-1.4.12-2.11.12Z"/></svg>',
                    bullet : 'AT&T ActiveArmor℠ mobile security',
                    tooltip : 'Download the free AT&T ActiveArmor mobile security app with a compatible smartphone to get advanced features like Public Wi-Fi Protection and Identity Monitoring. You\'ll automatically get 24/7 proactive network security.',
                    legal : 'Free app with Spam Call Blocking and more.',
                },
            ],
            contextual : 'If you choose this plan, it will also apply to any other devices you add to your order.',
        },
    ],
    firstnet : [],
    wireline : [
        {
            lifestyle : 'images/lifestyle/plan-3.jpg',
            promo : '',
            promoIcon : '',
            eyebrow : '300Mbps speeds',
            plan : 'Fiber - Internet 300',
            price : [60],
            priceDisc : 'Price excludes taxes & fees.',
            shortlegal : '',
            longlegal : '',
            speed : '',
            icons : [gameController, hd, video],
            desc : 'Fast online speeds for the whole home',
            features : [
                {
                    icon : meterMid,
                    bullet : '300 MB lorem ipsum dolor sit amet',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : gateway,
                    bullet : 'Standard Gateway 6',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : activeArmor,
                    bullet : 'Basic security',
                    tooltip : '',
                    legal : '',
                },
            ]
        },
        {
            lifestyle : 'images/lifestyle/plan-3.jpg',
            promo : '',
            promoIcon : '',
            eyebrow : '500Mbps speeds',
            plan : 'Fiber - Internet 500',
            price : [70],
            priceDisc : 'Price excludes taxes & fees.',
            shortlegal : '',
            longlegal : '',
            speed : '',
            icons : [gameBundle, tv, phoneCase],
            desc : 'Power even more devices at once with more bandwidth',
            features : [
                {
                    icon : meterMid,
                    bullet : '500 MB lorem ipsum dolor sit amet',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : gateway,
                    bullet : 'Standard Gateway 6',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : activeArmor,
                    bullet : 'Basic security',
                    tooltip : '',
                    legal : '',
                },
            ]
        },
        {
            lifestyle : 'images/lifestyle/plan-3.jpg',
            promo : '',
            promoIcon : '',
            eyebrow : '1000Mbps speeds',
            plan : 'Fiber - Internet 1000',
            price : [85],
            priceDisc : 'Price excludes taxes & fees.',
            shortlegal : '',
            longlegal : '',
            speed : '',
            icons : [home, laptop, fourk],
            desc : 'Superfast gigabit speeds for the connected home',
            features : [
                {
                    icon : meterMid,
                    bullet : 'Up to 1 GB lorem ipsum dolor sit amet',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : gateway,
                    bullet : 'Standard Gateway 6',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : activeArmor,
                    bullet : 'Basic security',
                    tooltip : '',
                    legal : '',
                },
            ]
        },
        {
            lifestyle : 'images/lifestyle/plan-3.jpg',
            promo : 'All-Fi Pro included',
            promoIcon : star,
            eyebrow : '2000Mbps speeds',
            plan : 'Fiber - Internet 2000',
            price : [155],
            priceDisc : 'Price excludes taxes & fees.',
            shortlegal : '',
            longlegal : '',
            speed : '',
            icons : [router, tvSatellite, persongroup],
            desc : 'For the powerfully interconnected home, work, family, and life',
            features : [
                {
                    icon : meterHigh,
                    bullet : 'Up to 2 GB lorem ipsum dolor sit amet',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : gateway,
                    bullet : '<span class="badge mar-xs-r">PRO</span><span style="color:var(--green-600);">NEW!</span> AT&T Gateway 7',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : activeArmor,
                    bullet : '<span class="badge mar-xs-r">PRO</span>Advanced security',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : wifi,
                    bullet : '<span class="badge mar-xs-r">PRO</span>Extended Wi-Fi Coverage Service',
                    tooltip : '',
                    legal : '',
                },
            ]
        },
        {
            lifestyle : 'images/lifestyle/plan-3.jpg',
            promo : 'All-Fi Pro included',
            promoIcon : star,
            eyebrow : '5000Mbps speeds',
            plan : 'Fiber - Internet 5000',
            price : [255],
            priceDisc : 'Price excludes taxes & fees.',
            shortlegal : '',
            longlegal : '',
            speed : '',
            icons : [totalHome, devices2, moreWays],
            desc : 'Ultimate power to control your connected life with confidence',
            features : [
                {
                    icon : meterHigh,
                    bullet : 'Up to 5 GB lorem ipsum dolor sit amet',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : gateway,
                    bullet : '<span class="badge mar-xs-r">PRO</span><span style="color:var(--green-600);">NEW!</span> AT&T Gateway 7',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : activeArmor,
                    bullet : '<span class="badge mar-xs-r">PRO</span>Advanced security',
                    tooltip : '',
                    legal : '',
                },
                {
                    icon : wifi,
                    bullet : '<span class="badge mar-xs-r">PRO</span>Extended Wi-Fi Coverage Service',
                    tooltip : '',
                    legal : '',
                },
            ]
        },
    ]
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



const nutrition = `
<div id="nl" class="accordion matching open">
    <div class="control tab-adjust">
        <div class="label">Broadband facts</div>
        <div class="carat">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M8 11.05L2.65 5.7l.7-.7L8 9.63 12.65 5l.7.71z"/></svg>
        </div>
    </div>
    <div class="content" style="transition:1000ms;">
        <div class="wrapper">
            <div class="nutrition-label">
                <h4>Broadband Facts</h4>
                <hr style="height:2px;">
                <p>AT&T</p>
                <h5 class="plan-title"></h5>
                <p>Mobile Broadband Consumer Disclosure</p>

                <hr style="height:8px;">
            
                <div class="col price single">
                    <h4>Monthly Price</h4>
                    <h4 class="price-point"></h4>
                </div>
            
                <hr style="height:4px;">

                <p>This Monthly Price is not an introductory rate.</p>
                <p style="margin-top:4px;">This Monthly Price does require a 36 month contract. <a href="">att.com/36MonthContractTerms</a></p>
                <p style="margin-top:4px;">*Price does not include discounts.</p>
            
                <hr style="height:2px;">
                <div>
                    <h5>Additional Charges & Terms</h5>
                    <div>

                        <h5>Provider Monthly Fees</h5>
                        <div class="col">
                            <p>Administrative Fee</p>
                            <p>Up to $1.99</p>
                        </div>
                        <div class="col">
                            <p>Regulatory Cost Recovery Fee</p>
                            <p>Up to $1.50</p>
                        </div>
                        <div class="col">
                            <p>Federal Universal Service Fee</p>
                            <p>Varies by location</p>
                        </div>
                        <div class="col">
                            <p>State Universal Service Fee</p>
                            <p>Up to $1.75</p>
                        </div>
                        <div class="col">
                            <p>Property Tax Allotment Fee</p>
                            <p>$0.26</p>
                        </div>
                        <div class="col">
                            <p>State & Local Cost Recovery Fees</p>
                            <p>Up to $4.00</p>
                        </div>

                        <h5>One-time Fees at the Time of Purchase</h5>
                        <div class="col">
                            <p>Activation Fee</p>
                            <p>$35.00</p>
                        </div>

                        
                        <div class="col" style="padding:0;">
                            <h5>Early Termination Fee</h5>
                            <p>$58 - $325</p>
                        </div>

                        <div class="col" style="padding:0;">
                            <h5>Government Taxes</h5>
                            <p>Vary by location</p>
                        </div>

                    </div>
                </div>

                <hr style="height:2px;">
                
                <div>
                    <h5>Discounts & Bundles</h5>
    
                    <div>

                        <p style="margin-bottom:4px;"><a href="">att.com/bundles</a> for available billing discounts and pricing options for broadband service bundled with other services like video, phone, and wireless service, and use of your own equipment like modems and routers.</p>

                        <div class="col">
                            <p>Device Offers & Promotions</p>
                            <p><a href="">att.com/Devices</a></p>
                        </div>

                        <div class="col">
                            <p>AutoPay & Paperless Billing</p>
                            <p><a href="">att.com/appb</a></p>
                        </div>

                        <div class="col">
                            <p>Signature</p>
                            <p><a href="">att.com/Signature</a></p>
                        </div>

                    </div>
                </div>

                <hr style="height:2px;">

                <div>
                    <h5>Affordable Connectivity Program (ACP)</h5>
    
                    <div>

                        <p style="margin-bottom:4px;">The ACP is a government program to help lower the monthly cost of internet service. To learn more abou tthe ACP, including to find out whether you qualify, visit <a href="">affordableconnectivity.gov</a></p>

                        <div class="col">
                            <p>Participates in the ACP</p>
                            <p>Yes</p>
                        </div>

                    </div>
                </div>

                <hr style="height:2px;">

                <div>
                    <h5>Speeds Provided with Plan</h5>
    

                        <div class="col">
                            <p>Typical Download Speed</p>
                            <p>13.4 - 68.4 Mbps (4G LTE)<br>
                                32.3 - 118.5 Mbps (5G)</p>
                        </div>

                        <div class="col">
                            <p>Typical Upload Speed</p>
                            <p>1.8 - 12.0 Mbps (4G LTE)<br>
                                3.6 - 18.9 Mbps (5G)</p>
                        </div>

                        <div class="col">
                            <p>Typical Latency</p>
                            <p>28 - 44 milliseconds (4G LTE)<br>
                                26 - 43 milliseconds (5G)</p>
                        </div>
                </div>

                <hr style="height:2px;">

                <div class="col">
                    <h5>Data Included with Monthly Price</h5>
                    <h5>Unlimited</h5>
                </div>

                <div>
                    <div class="col">
                        <p>Charges for Additional Data Usage</p>
                        <p>n/a</p>
                    </div>

                </div>

                <hr style="height:2px;">

                <div class="col">
                    <h5>Network Management</h5>
                    <p><a href="">att.com/networkmgmt</a></p>
                </div>

                <div class="col">
                    <h5>Privacy</h5>
                    <p><a href="">att.com/privacy</a></p>
                </div>


                <hr style="height:8px;">

                <div>
                    <h5>Customer Support</h5>
                    <div>
                        <p>Contact Us: <a href="">att.com/support</a> | <a href="">((800) 331-0500)</a></p>
                    </div>
                </div>

                <hr style="height:2px;">

                <p style="margin-bottom:4px;">Learn more about the terms used on this label by visiting the Federal Communications Commission's Consumer Resource Center.</p>
                <p style="margin-bottom:4px;"><a href="">fcc.com/consumer</a></p>
                <p>unique Plan Identifier Ex. F00674638ASDF736484</p>
            
            </div>
        </div>
    </div>
</div>
`



/* <div class="reveal">
    <div class="tooltip popover left top">
        <div class="link hitarea">
            <a href="" class="link">
                <div>See plan discounts</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M24.62 9.58a12.24 12.24 0 00-17.24 0L1 16l6.36 6.43a12.19 12.19 0 0017.3 0L31 16zM23.23 21a10.19 10.19 0 01-14.46 0l-5-5 5-5a10.21 10.21 0 0114.4 0l5 5zM16 10a6 6 0 106 6 6 6 0 00-6-6zm0 10a4 4 0 114-4 4 4 0 01-4 4z"/></svg>
            </a>
        </div>
        <div class="block">
            <div>
                <div class="tip"><div></div></div>
                <div class="text">
                    <div class="close icon px32">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M17.41 16l4.25 4.24-1.42 1.42L16 17.41l-4.24 4.25-1.42-1.42L14.59 16l-4.25-4.24 1.42-1.42L16 14.59l4.24-4.25 1.42 1.42z"/></svg>
                    </div>
                    <div class="flex col sm">
                        <h5>Plan discounts</h5>
                        <div class="standard flex spaced sm middle">
                            <h6>Standard Plan Price</h6>
                            <div class="price xs">
                                <div class="price-point">${Math.ceil(plans[planKey][p].price[lines - 1]).toFixed(2)}</div>
                            </div>
                        </div>
                        <div class="flex spaced sm green top">
                            <div class="flex xxs">
                                <div class="icon px16">
                                    <svg class="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M15 6.79a2.91 2.91 0 01-.6-.74 2.94 2.94 0 01-.11-1 2.55 2.55 0 00-.52-1.84A2.55 2.55 0 0012 2.7a2.94 2.94 0 01-1-.11 3.12 3.12 0 01-.75-.6 2.56 2.56 0 00-1.7-1A2.59 2.59 0 006.8 2a3.09 3.09 0 01-.74.6 3.29 3.29 0 01-1 .11 2.58 2.58 0 00-1.84.52 2.58 2.58 0 00-.51 1.83 3 3 0 01-.12 1 2.65 2.65 0 01-.59.73A2.61 2.61 0 001 8.5a2.61 2.61 0 001 1.71 2.65 2.65 0 01.59.74 2.92 2.92 0 01.12 1 2.59 2.59 0 00.51 1.84 2.58 2.58 0 001.84.52 3 3 0 011 .11 3.09 3.09 0 01.74.6 2.59 2.59 0 001.71 1 2.56 2.56 0 001.7-1 3.12 3.12 0 01.75-.6 3.18 3.18 0 011-.11 2.55 2.55 0 001.84-.52 2.55 2.55 0 00.52-1.84 2.94 2.94 0 01.11-1 2.91 2.91 0 01.6-.74A2.61 2.61 0 0016 8.5a2.61 2.61 0 00-1-1.71zm-.7 2.72a3.57 3.57 0 00-.8 1.06 3.81 3.81 0 00-.19 1.35c0 .47 0 1-.22 1.16s-.69.21-1.16.22a3.81 3.81 0 00-1.35.19 3.57 3.57 0 00-1.06.8c-.35.34-.7.68-1 .68s-.67-.34-1-.68a3.71 3.71 0 00-1.06-.8 3.83 3.83 0 00-1.36-.19c-.46 0-1 0-1.15-.22s-.21-.69-.22-1.16a3.81 3.81 0 00-.19-1.35 3.57 3.57 0 00-.8-1.06c-.34-.34-.68-.7-.68-1s.34-.67.68-1a3.57 3.57 0 00.8-1.06 3.81 3.81 0 00.19-1.35c0-.47 0-1 .22-1.16s.69-.21 1.15-.22a3.83 3.83 0 001.36-.19 3.71 3.71 0 001.06-.8c.34-.34.7-.68 1-.68s.66.34 1 .68a3.57 3.57 0 001.06.8 3.81 3.81 0 001.35.19c.47 0 1 0 1.16.22s.21.69.22 1.16a3.81 3.81 0 00.19 1.35 3.57 3.57 0 00.8 1.06c.34.34.68.7.68 1s-.34.66-.68 1zm-3.83 0A1.5 1.5 0 019 11v1H8v-1H7v-1h2a.5.5 0 00.5-.5A.5.5 0 009 9H8a1.5 1.5 0 010-3V5h1v1h1v1H8a.51.51 0 00-.5.5.5.5 0 00.5.5h1a1.5 1.5 0 011.47 1.49z"/></svg>
                                </div>
                                <p class="xs">AutoPay and paperless billing discount (within 2 bills).</p>
                            </div>
                            <div class="price xxs">
                                <div class="price-point light discount">10.00</div>
                            </div>
                        </div>
                        <hr>
                        <div class="total flex spaced sm middle">
                            <h6>Your monthly total</h6>
                            <div class="price xs">
                                <div class="price-point">${Math.ceil(plans[planKey][p].price[lines - 1] - 10 - sigDiscount).toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */