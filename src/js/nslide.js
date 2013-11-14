/**
 * バナーをスライド表示するモジュール
 *
 * @constructor
 * @this {Slide}
 * @param slideId スライド表示する要素のID
 * @param banners バナーデータのオブジェクト { imgpath, url }
 * @param options option
*/
var NSlide = function (slideId, banners, options) {
    this.banners = banners; // バナーデータ
    this.slideId = slideId; // スライドを表示する要素のID
    this.current = 1;   // バナー番号
    this.bannerNum = this.banners.length;   // バナーの数
    this.slideWidth = 1024;  // スライドの幅
    this.slideHeight = 500;  // スライドの幅
    this.swipeStartX = 0;
    this.swipeEndX = 0;
    this.duration = 500;
    this.interval = 3500;
    if (options != null) {
        if (options.move) {
            this.slideWidth = options.slideWidth;
        }
        if (options.duration) {
            this.duration = options.duration;
        }
        if (options.interval) {
            this.interval = options.interval;
        }
    }
    this.baseCss = 'transition-duration: ' + this.duration + 'ms; -moz-transition-duration: ' 
                        + this.duration + 'ms; -webkit-transition-duration : ' + this.duration + 'ms;';
};
// 初期化
NSlide.prototype = {
    slide : function()
    {
        // パラメータから動的にバナーとメニューを用意する
        var bannerHtml = '';
        var menuHtml = '';
        for (var i = 0; i < this.bannerNum; i++) {
            bannerHtml += '<li class="img_list"><a href="' + this.banners[i].link + '"><img src="' + this.banners[i].path + '"></a></li>';
            if (i == 0) {
                menuHtml += '<li data-num="' + (i+1) + '" class="active">' + (i+1) + '</li>';
            } else {
                menuHtml += '<li data-num="' + (i+1) + '">' + (i+1) + '</li>';
            }
        }
        var btLeftId = 'bt_left_' + this.slideId;
        var btRightId = 'bt_right_' + this.slideId;
        var menuId = 'menu_list_' + this.slideId;
        var slideWrapper = 'slide_wrapper_' + this.slideId;
        var slideBody = 'slide_' + this.slideId;
        var slideHtml = //'<div id="' + btLeftId + '" class="bt_base bt_base_left"><div class="bt_left"></div></div>'
                                    '<div id="' + slideWrapper + '" class="slide_wrapper">'
                                    + '<ul id="' + slideBody + '" class="slide">' + bannerHtml + '</ul>'
                                    + '</div>'
                                    + '<nav class="slide_nav"><ul id="' + menuId + '">' + menuHtml + '</ul></nav>';
                                    //+ '<div class="right_to"></div>'
                                    //+ '<div id="' + btRightId + '"  class="bt_base bt_base_right"><div class="bt_right"></div></div>'

        document.getElementById(this.slideId).innerHTML = slideHtml;
        document.getElementById(slideBody).style.width = (this.slideWidth * this.bannerNum + 0) + 'px';
        this.baseCss = this.baseCss + ' width:' + this.slideWidth * this.bannerNum + 'px;';

        // 要素にeventをバインドする
        var thisSlide = this;
        //document.getElementById(btLeftId).addEventListener('click', function(){thisSlide.prev();}, false);
        //document.getElementById(btRightId).addEventListener('click', function(){thisSlide.next();}, false);
        document.getElementById(slideWrapper).addEventListener("touchstart", function(){thisSlide.touchStart(event);}, false);
        document.getElementById(slideWrapper).addEventListener("touchmove", function(){thisSlide.touchMove(event);}, false);
        document.getElementById(slideWrapper).addEventListener("touchend", function(){thisSlide.touchEnd(event);}, false);
        var ul = document.getElementById(menuId);
        var menuItems = ul.childNodes;
        for (n in menuItems) {
            if (menuItems[n] instanceof Element) {
                menuItems[n].addEventListener('click', function(){thisSlide.jump(this.getAttribute('data-num'));}, false);
            }
        }
        // 一定時間でバナー切り替え
        setInterval(function(){thisSlide.next();}, (this.interval + this.duration));
    },
    // 移動
    move : function() 
    {
        // CSSで移動
        var slidex = -(this.slideWidth * (this.current - 1));
        var css = this.baseCss + 'transform : translate(' + slidex + 'px, 0); -webkit-transform : translateX(' + slidex + 'px); -moz-transform: translateX('  + slidex +  'px); ';
        document.getElementById('slide_' + this.slideId).setAttribute("style", css);

        // 表示するスライドの番号のメニューCSSを変更する
        var ul = document.getElementById('menu_list_' + this.slideId);
        var menuItems = ul.childNodes;
        for (n in menuItems) {
            var el = menuItems[n];
            if (el instanceof Element) {
                if (parseInt(el.getAttribute('data-num')) == this.current ) {
                    el.className = 'active';
                } else {
                    el.className = "";
                }
            }
        }

    },
    // 進む
    next : function()
    {
        this.current++;
        if (this.current > this.bannerNum) {
            this.current = 1;
        }
        this.move();
    },
    //　戻る
    prev : function()
    {
        this.current--;
        if (this.current == 0) {
            this.current = this.bannerNum;
        }
        this.move();
    },
    // 指定された番号へ進む
    jump : function(num) 
    {
        if (num > this.bannerNum) {
            this.current = 1;
        } else {
            this.current = num;
        }
        this.move();
    },
    // スワイプ
    touchStart : function(e)
    {
        //e.preventDefault();
        this.swipeStartX = e.touches[0].pageX;
    },
    touchMove : function(e)
    {
        e.preventDefault();
        this.swipeEndX = e.touches[0].pageX;
    },
    touchEnd : function(e)
    {
        e.preventDefault();
        if (this.swipeEndX > this.swipeStartX) {
            this.prev();
        } else {            
            this.next();
        }
    },
};
