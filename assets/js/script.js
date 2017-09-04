/**
 * Theme Front end main js
 *
 */

(function($) {

    $(document).ready(function() {

        var $body = $("body");

        /**
         * upsells
         */
        var $rtl = ( $body.hasClass("rtl-body") ) ? true : false;

        $(".single-slider-wrapper").livequery(function(){

            $(this).slick({
                //mobileFirst         : true ,
                arrows              : true,
                slidesToShow        : 1,
                slidesToScroll      : 1,
                dots                : false,
                //centerMode          : false,
                rtl                 : $rtl,
                //swipe               : true ,
                touchMove           : true ,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                prevArrow : '<span class="slide-nav-bt slide-prev"><i class="fa fa-angle-left"></i></span>',
                nextArrow : '<span class="slide-nav-bt slide-next"><i class="fa fa-angle-right"></i></span>',
            });

        });


        /**
         * Rocket Animation
         */

        if( $body.hasClass("home") && $body.hasClass("page") ) {

            var layer1 = document.getElementById("layer1");
            var layer2 = document.getElementById("layer2");
            var layer3 = document.getElementById("layer3");
            var rocket = document.getElementById("r");
            var rocketParagraph = document.getElementById("rocketP");
            var rocketctn = document.getElementById("rocket");
            var planet = document.getElementById("planet");
            var satellite = document.getElementById("satellite");
            var games = document.getElementById("games");
            var services = document.getElementById("online-reservation-services");
            //var solar = document.getElementById("solar");
            //var hiring = document.getElementById("hiring");
            var sat = document.getElementById("sat"); //console.log(sat);
            var height = $(window).height();
            $("#rocket").height((height - $("#main-header").height()) * 2);
            var ctnheight = rocketctn.offsetHeight;
            var rheight = rocket.offsetHeight;
            var rotationS = 0;
            var offset1 = 0;
            var offset2 = 0;
            var offset3 = 0;
            var offsetR = 0;
            var rocketbg = false;
            var scrollVal = window.pageYOffset;
            var gamesOffsetTop = $(games).offset().top;
            var servicesOffsetTop = $(services).offset().top;
            var satOffsetTop = $(satellite).offset().top;//console.log(satOffsetTop);

            $(window).resize(function () {
                height = $(window).height();
                gamesOffsetTop = $(games).offset().top;
                servicesOffsetTop = $(services).offset().top;
                satOffsetTop = $(satellite).offset().top;
                $("#rocket").height(($(window).height() - $("#main-header").height()) * 2);
                ctnheight = rocketctn.offsetHeight;
                rheight = rocket.offsetHeight;
            });

            var animRocket = function () {

                console.log("SCROLLING ROCKET");

                opacity = Math.round((1 - Math.max(Math.min(1, scrollVal / (height)), 0)) * 100) / 100;
                rocketParagraph.style.opacity = opacity;

                offset1 = Math.round(Math.min(Math.max(-height, (ctnheight) - scrollVal - height), 0) * 1);
                offset2 = Math.round(Math.min(Math.max(-height, (ctnheight) - scrollVal - height), 0) * .8);
                offset3 = Math.round(Math.min(Math.max(-height, (ctnheight) - scrollVal - height), 0) * .7);
                offsetR = Math.round(Math.min(Math.max(-height - 100, rheight - scrollVal), rheight));

                if (layer1.style.display != "block") {
                    layer1.style.display = "block";
                    layer2.style.display = "block";
                    layer3.style.display = "block";
                    rocket.style.display = "block";
                    rocketParagraph.style.display = "block";
                }

                layer1.style.webkitTransform = "translate3d(0, " + offset1 + "px, 0)";
                layer1.style.MozTransform = "translate3d(0, " + offset1 + "px, 0)";
                layer1.style.msTransform = "translateY(" + offset1 + "px)";
                layer1.style.OTransform = "translate3d(0, " + offset1 + "px, 0)";
                layer1.style.transform = "translate3d(0, " + offset1 + "px, 0)";

                layer2.style.webkitTransform = "translate3d(0, " + offset2 + "px, 0)";
                layer2.style.MozTransform = "translate3d(0, " + offset2 + "px, 0)";
                layer2.style.msTransform = "translateY(" + offset2 + "px)";
                layer2.style.OTransform = "translate3d(0, " + offset2 + "px, 0)";
                layer2.style.transform = "translate3d(0, " + offset2 + "px, 0)";

                layer3.style.webkitTransform = "translate3d(0, " + offset3 + "px, 0)";
                layer3.style.MozTransform = "translate3d(0, " + offset3 + "px, 0)";
                layer3.style.msTransform = "translateY(" + offset3 + "px)";
                layer3.style.OTransform = "translate3d(0, " + offset3 + "px, 0)";
                layer3.style.transform = "translate3d(0, " + offset3 + "px, 0)";

                rocket.style.webkitTransform = "translate3d(0, " + offsetR + "px, 0)";
                rocket.style.MozTransform = "translate3d(0, " + offsetR + "px, 0)";
                rocket.style.msTransform = "translateY(" + offsetR + "px)";
                rocket.style.OTransform = "translate3d(0, " + offsetR + "px, 0)";
                rocket.style.transform = "translate3d(0, " + offsetR + "px, 0)";

            };

            var animSat = function () {

                 console.log("SCROLLING SAT");

                 rotationS = Math.round(Math.max(0,Math.min(((scrollVal-satOffsetTop+(planet.offsetHeight/2))/(planet.offsetHeight/2)*180),180)))-90;
                 //if(!$("#satellite .s").hasClass("on")) $("#satellite .s").addClass("on");

                 sat.style.webkitTransform = "rotate("+ -rotationS +"deg)";
                 sat.style.MozTransform = "rotate("+ -rotationS +"deg)";
                 sat.style.msTransform = "rotate("+ -rotationS +"deg)";
                 sat.style.OTransform = "rotate("+ -rotationS +"deg)";
                 sat.style.transform = "rotate("+ -rotationS +"deg)";

             };

            function anim() {

                scrollVal = window.pageYOffset;

                if (scrollVal < gamesOffsetTop) {

                    animRocket();

                } else {

                    if (layer1.style.display != "none") {
                        layer1.style.display = "none";
                        layer2.style.display = "none";
                        layer3.style.display = "none";
                        rocket.style.display = "none";
                        rocketParagraph.style.display = "none";
                    }

                    if(scrollVal < servicesOffsetTop && scrollVal > satOffsetTop-height) {
                        animSat();
                    }


                }

            }


            //window.onload = function () { 

                $("html, body").animate({scrollTop: 0}, 3900);

            //};

            //gamesOffsetTop = $(games).offset().top;
            //servicesOffsetTop = $(services).offset().top;
            //satOffsetTop = $(satellite).offset().top;
            $("#rocket .l").height(height);
            $.srSmoothscroll();

            anim();

            $(window).on('scroll', function () {
                window.requestAnimationFrame(anim);
            });

        }

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
