$(document).ready(function(){
    loadProgressIndicator();
});

$(window).load(function(){
    fillTabs();
    activateTabs();
    setProgressIndicator();
    stickProgressIndicator();
    displayProgress();
});

$(window).on('resize',function(){

});

$(window).on('scroll',function(){
    stickProgressIndicator();
});


var flowKey = $('html').attr('data-flow');
var pageKey = $('html').attr('data-page');
var flowPages = ['plp','pdp','plans','add-ons','cart'];

var indTop;

function loadProgressIndicator(){
    $('main').prepend(progressTemplate);
    if(pageKey != 'plp' || pageKey != 'cart'){
        $('main').append(stickyTemplate);
    }
}

function fillTabs(){

    for(t = 0; t < labels.length; t++){
        const tabTemplate = `
        <div><div onClick="window.location.href = '${urls[flowKey][t]}'">${t + 1}. ${labels[t]}</div></div>
        `
        $('#progress-indicator').find('.tab-container').append(tabTemplate);
    }
    
}


function activateTabs(){
    let tab = $('#progress-indicator').find('.tab-container').children();
    for(p = 0; p < flowPages.length; p++){
        if(pageKey === flowPages[p]){
            tab.eq(p).children().addClass('active');
            break;
        } else {
            tab.eq(p).children().addClass('completed');
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


const progressTemplate = `
<div id="progress-indicator">
    <div id="progress-indicator-block" class="max-width-background base">
        <div id="progress-indicator-container" class="container">
            <div class="header">
                <div class="title">
                    <div class="eyebrow sm"></div>
                    <h4>Choose your plan</h4>
                </div>
                <div class="step-count">
                    <span>Step 3 of 5</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M11.13 6.94l.7.71L8.48 11 5.13 7.65l.7-.71 2.65 2.64zM16 8.5A7.5 7.5 0 118.5 1 7.5 7.5 0 0116 8.5zm-1 0A6.5 6.5 0 108.5 15 6.51 6.51 0 0015 8.5z"/></svg>
                </div>
            </div>
            <div class="breadcrumbs">
                <div class="content">
                    <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path class="svg-base" d="M22 31H10a3 3 0 01-3-3V4a3 3 0 013-3h12a3 3 0 013 3v24a3 3 0 01-3 3zM10 3a1 1 0 00-1 1v24a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zm9 2h-6v2h6z"/></svg>
                    </div>
                    <div class="tab-container">
                        
                    </div>
                    <div class="checkout">Checkout</div>
                </div>
            </div>
            <div class="progress-bar"><div></div></div>
        </div>
    </div>
</div>
`

const labels = ['Pick your device','Customize your device','Choose your plan','Get add-ons','Review your cart']
const urls = {
    v1 : ['plp.html','pdp.html','plans.html','add-ons.html','cart.html'],
    v2 : [],
}

const stickyTemplate = `
<div id="sticky-footer">
    <div id="sticky-footer-container">
        <div class="content">
            <div id="footer-pricing">
                <div id="price-monthly" class="pricing-details">
                    <div class="price sm">
                        <div class="price-point plan adjustable-price">0.00</div>
                    </div>
                </div>
                <div id="price-today" class="pricing-details">
                    <div class="price sm">
                        <div class="price-point retail adjustable-price">0.00</div>
                    </div>
                </div>
            </div>
            <div id="footer-cta">
                <div id="continue" class="button"><span>Continue</span></div>
            </div>
            <div id="footer-legal" class="legal">Prices are estimated. Fees and taxes are not included.</div>
        </div>
    </div>
</div>
`