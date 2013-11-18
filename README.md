nslide
======

Tiny javascript slide library without other libraries.

### Demo and how to use
 http://nakayalog.net/nslide/index.html

### How to use
##### Load script and css files.
`<script type="text/javascript" src="{PATH_TO_JAVASCRIPT}/nslide.js"></script>`
`<link rel="stylesheet" href="{PATH_TO_CSS}/nslide.css" type="text/css">`

##### Place the div tag.
`<div id="slide1"></div>`


##### Write some codes.

    <script type='text/javascript'>
    (function()
    {
        // data object of slide
        var banners = [
            // path is image path, link is the url whenever slide image is clicked
            {path : 'http://nakayalog.net/nslide/img/banner01.jpg', link : 'http://www.yahoo.co.jp/'},
            {path : 'http://nakayalog.net/nslide/img/banner02.jpg', link : 'http://www.yahoo.co.jp/'},
            {path : 'http://nakayalog.net/nslide/img/banner03.jpg', link : 'http://www.yahoo.co.jp/'},
            {path : 'http://nakayalog.net/nslide/img/banner04.jpg', link : 'http://www.yahoo.co.jp/'},
            {path : 'http://nakayalog.net/nslide/img/banner05.jpg', link : 'http://www.yahoo.co.jp/'},
        ];
        // options (optional)
        var options = {
            slideWidth : 1024,               // slide width (px)
            slideHeight : 500,               // slide height (px)
            direction : 'horizontal',       // slide direction "horizontal" or "vertical"
            duration : 1000,                  // slide animation duration(msec)
            interval : 3500,                    // sliding interval (msec)
        };
        // 1st and 2nd arguments are necessity.
        // 1st one is id of div tag that you want to display the slide. 
        var slide = new NSlide('slide1', banners, options);
        // call #slide().
        slide.slide();
    })(); 
    </script>
    
