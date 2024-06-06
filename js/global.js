$(document).ready(function(){
    loadElements();
});

$(window).on('load', function(){

});

$(window).on('resize', function(){
    
});

$(window).on('scroll', function(){
    
});

function loadElements(){
    $('body').prepend('<header></header>');
    $('header').append(navTemplate);
    $('body').append(footerTemplate);
}

function windowEvents(){

}

const navTemplate = `
<nav id="main-nav">
    <div>
        <div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div>
            <div></div>
            <div></div>
        </div>
    </div>
</nav>
<nav id="sub-nav">
    <div>
        <div class="logo">
            <img src="images/logo/att_globe_symbol_limited_use_rgb_pos.png" />
        </div>
        <div class="nav-icons">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="search">
            <div></div>
        </div>
        <div class="lang">
            <div></div>
            <div></div>
        </div>
    </div>
</nav>
`

const footerTemplate = `
<footer>
    <div>
        <div class="link-farm">
            <div class="lists">
                <div class="link-list">
                    <h6>Connect with Us</h6>
                    <ul>
                        <li><a href="">Contact us</a></li>
                        <li><a href="">Feedback</a></li>
                        <li><a href="">Community forum</a></li>
                        <li><a href="">Tech Buzz blog</a></li>
                    </ul>
                </div>
                <div class="link-list">
                    <h6>AT&T</h6>
                    <ul>
                        <li><a href="">About AT&T</a></li>
                        <li><a href="">Store locations</a></li>
                        <li><a href="">Careers</a></li>
                        <li><a href="">5G technology</a></li>
                        <li><a href="">Coverage maps</a></li>
                    </ul>
                </div>
                <div class="link-list">
                    <h6>Shop</h6>
                    <ul>
                        <li><a href="">Devices</a></li>
                        <li><a href="">Plans</a></li>
                        <li><a href="">TV</a></li>
                        <li><a href="">Bundles</a></li>
                        <li><a href="">Deals</a></li>
                    </ul>
                </div>
            </div>
            <div class="soc">
                <div class="social">
                    <ul>
                        <li><svg><path d="M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15c-.1-8.3-6.8-15-15-15zm0 29C7.3 29 1 22.7 1 15S7.3 1 15 1s14 6.3 14 14-6.3 14-14 14z M22.3 9.8c-.6.4-1.2.6-1.9.7-1.1-1.1-2.7-1.2-4.1-.3-.7.5-1.2 1.4-1.2 2.3 0 .2 0 .4.1.6-2.3-.1-4.6-1.3-6.1-3.1-.3.5-.4 1-.4 1.6 0 1 .5 1.9 1.3 2.4-.5 0-.9-.2-1.3-.4 0 1.4 1 2.6 2.3 2.9-.3 0-.5.1-.8.1-.2 0-.4 0-.5-.1.4 1.2 1.5 2 2.8 2-1 .8-2.3 1.3-3.8 1.3h-.4c1.3.8 2.9 1.3 4.6 1.3 4.7 0 8.4-3.8 8.4-8.3v-.5c.6-.4 1.1-.9 1.4-1.5-.5.2-1.1.4-1.7.4.7-.1 1.1-.7 1.3-1.4z"></path></svg></li>
                        <li><svg><path d="M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15c-.1-8.3-6.8-15-15-15zm0 29C7.3 29 1 22.7 1 15S7.3 1 15 1s14 6.3 14 14-6.3 14-14 14z M15.9 10.9c0-.6.3-.7.6-.7h1.6V7.8h-2.2c-1.6-.1-2.9 1.1-3 2.7v2h-1.5V15h1.5v7.2h3V15h2l.2-2.5h-2.2v-1.6z"></path></svg></li>
                        <li><svg><path d="M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15c-.1-8.3-6.8-15-15-15zm0 29C7.3 29 1 22.7 1 15S7.2.9 15 .9s14 6.3 14 14C29 22.7 22.7 29 15 29zm0-19.8h2.8c.4 0 .9.1 1.3.2.6.2 1.1.7 1.3 1.3.2.4.2.9.2 1.3v5.6c0 .4-.1.9-.2 1.3-.2.6-.7 1.1-1.3 1.3-.4.2-.9.2-1.3.2h-5.6c-.4 0-.9-.1-1.3-.2-.6-.2-1.1-.7-1.3-1.3-.2-.4-.2-.9-.2-1.3v-2.8V12c0-.4.1-.9.2-1.3.2-.6.7-1.1 1.3-1.3.4-.2.9-.2 1.3-.2H15m0-1.3h-2.9c-.6 0-1.2.1-1.7.3-.9.4-1.7 1.1-2.1 2.1-.1.6-.3 1.2-.3 1.8v5.8c0 .6.1 1.2.3 1.7.4.9 1.1 1.7 2.1 2.1.5.2 1.1.3 1.7.3h5.8c.6 0 1.2-.1 1.7-.3.9-.4 1.7-1.1 2.1-2.1.2-.5.3-1.1.3-1.7V15v-2.9c0-.6-.1-1.2-.3-1.7-.4-.9-1.1-1.7-2.1-2.1-.4-.2-1.1-.3-1.7-.3-.7-.1-1-.1-2.9-.1zm0 3.5c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6c0-1.9-1.6-3.6-3.6-3.6zm0 6c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3c.1 1.2-1 2.3-2.3 2.3zm4.7-6.2c0 .5-.4.8-.8.8-.5 0-.8-.4-.8-.8 0-.5.4-.8.8-.8s.8.3.8.8z"></path></svg></li>
                        <li><svg><path d="M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15c-.1-8.3-6.8-15-15-15zm0 29C7.3 29 1 22.7 1 15S7.2.9 15 .9s14 6.3 14 14C29 22.7 22.7 29 15 29z M9 11.8h3v8.8H9v-8.8zm1.4-4.3c-.8-.1-1.5.5-1.5 1.3V9c-.1.8.6 1.5 1.4 1.6h.2c.8.1 1.5-.6 1.6-1.4V9c.1-.8-.5-1.5-1.3-1.6-.2.1-.3.1-.4.1zm8.6 4.1c-1.1 0-2.1.5-2.6 1.4v-1.2h-2.9v8.8h2.9v-4.9c0-.2 0-.4.1-.7.2-.7.9-1.1 1.6-1.1 1 0 1.4.7 1.4 2v4.8h2.8v-5.1c.1-2.8-1.3-4-3.3-4z"></path></svg></li>
                    </ul>
                </div>
                <div class="myatt">
                    <div><img src="images/logo/myatt_logo_rgb_blu_pos_R.png" /></div>
                    <div>Manage Your AT&T<sup>®</sup> Account Whenever & Wherever You Want.</div>
                    <a href="" class="link">
                        <div>Learn about the myAT&T app</div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="svg-base" d="M6.64 13.35l-.71-.7L10.58 8 5.93 3.35l.71-.7L12 8z"/></svg>
                    </a>
                </div>
            </div>
        </div>
        <div class="link-help">
            <ul>
                <li><a href="">Legal policy center</a></li>
                <li><a href="">Advertising choices</a></li>
                <li><a href="">Accessibility</a></li>
                <li><a href="">Sitemap</a></li>
                <li><a href="">Privacy details</a></li>
                <li><a href="">Broadband details</a></li>
                <li><a href="">Terms of use</a></li>
                <li><a href="">Do not sell my personal information</a></li>
            </ul>
        </div>
        <div class="copy">
            <div>&copy;2021 AT&T Intellectual Property. All rights reserved.</div>
            <div>This site is protected by reCAPTCHA. <a href="">Privacy</a><a href="">Terms</a></div>
        </div>
    </div>
</footer>
`
