$(document).ready(function(){
    loadProgressIndicator();
});

$(window).load(function(){
    fillTabs();
    activateTabs();
    setProgressIndicator();
    stickProgressIndicator();
    displayProgress();
    fillLabel();
    loadStepsTotal();
});

$(window).on('resize',function(){

});

$(window).on('scroll',function(){
    stickProgressIndicator();
});


var flowKey = $('html').attr('data-flow');
var pageKey = $('html').attr('data-page');
var pageID;
//var flowPages = ['plp','pdp','plans','add-ons','cart'];

var indTop;

function loadProgressIndicator(){
    $('main').prepend(progressTemplate);
    if(pageKey != 'plp' || pageKey != 'cart'){
        $('main').append(stickyTemplate);
    }
}

function fillTabs(){

    for(t = 0; t < labels[flowKey].length; t++){
        const tabTemplate = `
        <div><div onClick="window.location.href = '${urls[flowKey][t]}'"><div class="icon-button sm">${icons[flowKey][t]}</div></div></div>
        `
        // <span>${t + 1}. ${labels[flowKey][t]}</span>  ---  Add above for labels
        $('#progress-indicator').find('.tab-container').append(tabTemplate);
    }
    
}


function activateTabs(){
    let tab = $('#progress-indicator').find('.tab-container').children();
    
    for(p = 0; p < keys[flowKey].length; p++){
        if(pageKey === keys[flowKey][p]){
            tab.eq(p).addClass('active');
            pageID = p;
            break;
        } else {
            tab.eq(p).addClass('completed');
        }
    }
}


function setProgressIndicator(){
    indTop = $('#progress-indicator').offset().top;
}

function stickProgressIndicator(){
    if($(window).scrollTop() >= indTop){
        $('#progress-indicator').addClass('sticky');
    } else {
        $('#progress-indicator').removeClass('sticky');
    }
}

function displayProgress(){
    $('.step-count').on('click', function(){
        if(!$(this).hasClass('open')){
            $(this).addClass('open');
            $('.breadcrumbs').addClass('open');
        } else {
            $(this).removeClass('open');
            $('.breadcrumbs').removeClass('open');
        }
    });
}

function fillLabel(){
    // $('#progress-indicator').find('tab-container').find('.active')
    $('#progress-indicator').find('.title').find('h5').html(labels[flowKey][pageID]);
}

function loadStepsTotal(){
    $('#progress-indicator').find('.step-count').children('span').html('Step '+ (pageID + 1) +' of '+labels[flowKey].length);
    $('#progress-indicator').find('.progress-bar').children().css('width',Math.floor(((pageID + 1) / labels[flowKey].length) * 100) + '%')
}


const keys = {
    wls : ['plp','pdp','plans','add-ons','cart'],
    wln : ['plans','add-ons','cart']
}
const labels = {
    wls : ['Pick your device','Customize your device','Choose your plan','Make upgrades','Review your cart'],
    wln : ['Pick your plan','Make upgrades','Review your cart']
}
const urls = {
    wls : ['plp.html','pdp.html','plans-wls.html','add-ons-wls.html','cart.html'],
    wln : ['plans-wln.html','add-ons-wln.html','cart.html']
}

const mobile = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M22 31H10a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3v24a3 3 0 01-3 3zM10 3a1 1 0 00-1 1v24a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zm9 2h-6v2h6z"/></svg>',
    config = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M17.5 31h-3a2.5 2.5 0 01-2.5-2.5V28a2.85 2.85 0 00-1.42-2.46 3.09 3.09 0 00-3.11 0l-.28.16a2.51 2.51 0 01-3.42-.91l-1.5-2.6a2.5 2.5 0 01.91-3.41l.32-.19a3 3 0 000-5.24l-.31-.18a2.51 2.51 0 01-.91-3.42l1.5-2.6a2.51 2.51 0 013.42-.91l.28.16a3.09 3.09 0 003.11 0A2.85 2.85 0 0012 4v-.5A2.5 2.5 0 0114.5 1h3A2.5 2.5 0 0120 3.5v.39a3 3 0 004.47 2.58l.34-.2a2.51 2.51 0 013.42.91l1.5 2.6a2.5 2.5 0 01-.91 3.41l-.32.19A3 3 0 0027 16a3 3 0 001.51 2.62l.31.18a2.51 2.51 0 01.91 3.42l-1.5 2.6a2.51 2.51 0 01-3.42.91l-.28-.16a3.09 3.09 0 00-3.11 0A2.85 2.85 0 0020 28v.47A2.5 2.5 0 0117.5 31zM9 23.15a5.07 5.07 0 012.56.69A4.86 4.86 0 0114 28v.47a.5.5 0 00.5.5h3a.5.5 0 00.5-.5V28a4.86 4.86 0 012.42-4.19 5.09 5.09 0 015.12 0l.27.16a.51.51 0 00.69-.19l1.5-2.56a.49.49 0 00-.18-.68l-.32-.19a5 5 0 010-8.7l.32-.19a.49.49 0 00.18-.68l-1.5-2.6a.51.51 0 00-.69-.18l-.34.2A5 5 0 0118 3.89V3.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V4a4.86 4.86 0 01-2.42 4.19 5.09 5.09 0 01-5.12 0L6.19 8a.51.51 0 00-.69.19L4 10.78a.49.49 0 00.18.68l.32.19a5 5 0 010 8.7l-.32.19a.49.49 0 00-.18.68l1.5 2.6a.52.52 0 00.69.18l.27-.16A5.1 5.1 0 019 23.15zM16 22a6 6 0 116-6 6 6 0 01-6 6zm0-10a4 4 0 104 4 4 4 0 00-4-4z"/></svg>',
    plansWls = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M19.01 9H13V7h6.01v2zM12 21.99h2v-3h-2v3zm3-6v6h2v-6h-2zm3 6h2v-9h-2v9zM24 6v20c0 1.65-1.35 3-3 3H11c-1.65 0-3-1.35-3-3V6c0-1.65 1.35-3 3-3h10c1.65 0 3 1.35 3 3zm-2 0c0-.55-.45-1-1-1H11c-.55 0-1 .45-1 1v20c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V6zm8.54 2.27c-.43-.68-1.1-1.14-1.88-1.32l-3.44-.76-.43 1.95 3.44.76a.993.993 0 01.76 1.19L25.84 24.3c-.09.4-.45.69-.85.69v2c1.34 0 2.52-.95 2.81-2.26l3.15-14.21c.17-.78.03-1.59-.4-2.26zm-26.77.64l3.44-.76-.43-1.95-3.44.76c-.78.17-1.45.64-1.88 1.32s-.57 1.48-.4 2.26l3.15 14.21c.29 1.3 1.47 2.25 2.8 2.26v-2c-.4 0-.76-.29-.85-.69L3.01 10.11a.985.985 0 01.13-.75c.14-.23.37-.38.63-.44z"/></svg>',
    plansWln = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M15.998 2.669a13.335 13.335 0 1013.335 13.335A13.35 13.35 0 0015.998 2.669zm0 24.67a11.335 11.335 0 1111.335-11.335 11.348 11.348 0 01-11.335 11.335zm6.92-16.841l-1.415-1.414-4.327 4.327a2.825 2.825 0 00-1.178-.262 2.855 2.855 0 102.854 2.855 2.827 2.827 0 00-.262-1.179zm-6.92 6.648a1.142 1.142 0 111.141-1.142 1.143 1.143 0 01-1.141 1.142zm0-8.25a7.117 7.117 0 00-7.109 7.108H7.113a8.888 8.888 0 0112.983-7.885l-.82 1.576a7.03 7.03 0 00-3.278-.8zm8.884 7.108h-1.776a7.035 7.035 0 00-.802-3.283l1.575-.822a8.91 8.91 0 011.003 4.105z"/></svg>',
    addons = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M16 1a15 15 0 1015 15A15 15 0 0016 1zm0 28a13 13 0 1113-13 13 13 0 01-13 13zm1-14h6v2h-6v6h-2v-6H9v-2h6V9h2z"/></svg>',
    cart = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M7.08 8L6 4H1v2h3.49l4.15 15.76a3 3 0 002.9 2.24h12a3 3 0 002.89-2.18L30.33 8zm17.37 13.27a1 1 0 01-1 .73H11.54a1 1 0 01-1-.75L7.61 10h20.06zM12 27.5a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5zm14 0a1.5 1.5 0 11-1.5-1.5 1.5 1.5 0 011.5 1.5z"/></svg>'


const icons = {
    wls : [mobile,config,plansWls,addons,cart],
    wln : [plansWln,addons,cart]
}

const progressTemplate = `
<div id="progress-indicator">
    <div id="progress-indicator-block" class="max-width-background base">
        <div id="progress-indicator-container" class="container">
            <div class="header">
                <div class="title">
                    <div class="eyebrow sm"></div>
                    <h5></h5>
                </div>
                <div class="step-count">
                    <span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M11.13 6.94l.7.71L8.48 11 5.13 7.65l.7-.71 2.65 2.64zM16 8.5A7.5 7.5 0 118.5 1 7.5 7.5 0 0116 8.5zm-1 0A6.5 6.5 0 108.5 15 6.51 6.51 0 0015 8.5z"/></svg>
                </div>
            </div>
            <div class="breadcrumbs">
                <div class="content">
                    <div class="tab-container">
                        
                    </div>
                </div>
            </div>
            <div class="progress-bar"><div></div></div>
        </div>
    </div>
</div>
`

const stickyTemplate = `
<div id="sticky-footer">
    <div id="sticky-footer-container">
        <div class="content">
            <div id="footer-pricing">
                <div id="price-today" class="pricing-details">
                    <div class="price lg">
                        <div class="price-point retail adjustable-price">0.00</div>
                    </div>
                </div>
                <div id="price-monthly" class="pricing-details">
                    <div class="price lg">
                        <div class="price-point plan adjustable-price">0.00</div>
                    </div>
                </div>
            </div>
            <div id="footer-cta">
                <div id="continue" class="button"><span>Continue</span></div>
            </div>
            <div id="footer-legal" class="legal">Includes taxes and fees.</div>
        </div>
    </div>
</div>
`