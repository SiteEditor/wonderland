/**
 * Theme Front end main js
 *
 */

(function($) {

    $(document).ready(function() {


        /**
         * upsells
         */        

        var $rtl = ( $("body").hasClass("rtl-body") ) ? true : false;

        $(".single-slider-wrapper").livequery(function(){

            $(this).slick({
                //mobileFirst         : true ,
                arrows              : true,
                slidesToShow        : 1,
                slidesToScroll      : 1,
                dots                : true,
                //centerMode          : false,
                rtl                 : $rtl,
                //swipe               : true ,
                touchMove           : true ,
                infinite            : false, 
                prevArrow : '<span class="slide-nav-bt slide-prev"><i class="fa fa-caret-left"></i></span>',
                nextArrow : '<span class="slide-nav-bt slide-next"><i class="fa fa-caret-right"></i></span>',
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,  
                        }
                    },
                    {
                        breakpoint: 860,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });

        });


        /**
         * Resize
         */


        setTimeout(function(){$(window).trigger(window.tg_debounce_resize);}, 2000);

        /**
         * Loading
         */

        var removePreloader = function() {
            setTimeout(function() {
                jQuery('.preloader').hide();
            }, 1500);
        };

        removePreloader();

    });


})(jQuery);
