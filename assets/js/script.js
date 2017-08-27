/**
 * Theme Front end main js
 *
 */

(function($) {

    $(document).ready(function() {

        var $rtl = ( $("body").hasClass("rtl-body") ) ? true : false;

        $(".sed-mafiran-slider").livequery(function(){

            var $sliderNav = $(this).data('sliderNav'),
                options = {
                    //mobileFirst         : true ,
                    arrows              : false,
                    slidesToShow        : 1,
                    slidesToScroll      : 1,
                    dots                : false,
                    //centerMode          : false,
                    rtl                 : $rtl,
                    //swipe               : true ,
                    touchMove           : true ,
                    infinite            : true,
                    autoplay            : true,
                    autoplaySpeed       : 4500 ,
                    easing              : "easeOutQuad",
                    speed               : 700
                    //prevArrow : '<span class="slide-nav-bt slide-prev custom-btn custom-btn-secondary"><i class="fa fa-angle-left"></i></span>',
                    //nextArrow : '<span class="slide-nav-bt slide-next custom-btn custom-btn-secondary"><i class="fa fa-angle-right"></i></span>',
                },
                $pause = $(this).data('pause');

            if( $sliderNav ){
                options.asNavFor = $sliderNav;
            }

            if( $pause && $pause == "no" ) {
                options.pauseOnFocus = false;
                options.pauseOnHover = false;

            }

            $(this).slick( options );

        });


        $(".mafiran-next-prev-controler").livequery(function(){

            $(this).find(".next").on("click" , function(){

                $(".slide-first.sed-mafiran-slider").slick("slickNext");
                $(".slide-third.sed-mafiran-slider").slick("slickNext");

            });

            $(this).find(".previous").on("click" , function(){

                $(".slide-first.sed-mafiran-slider").slick("slickPrev");
                $(".slide-third.sed-mafiran-slider").slick("slickPrev");

            });

        });

        $(".about-company-slider").livequery(function(){

            var len = $(this).find(">.slid-item").length,
                barWidth = 100;

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
                infinite            : true, 
                autoplay            : true,
                easing              : "easeOutQuad"
                //prevArrow : '<span class="slide-nav-bt slide-prev custom-btn custom-btn-secondary"><i class="fa fa-angle-left"></i></span>',
                //nextArrow : '<span class="slide-nav-bt slide-next custom-btn custom-btn-secondary"><i class="fa fa-angle-right"></i></span>',
            });

            var $bar = $(".mafiran-slick-nav > .mafiran-slick-bar");

            $bar.width( barWidth / len );

            var lenS = len < 10 ? "0" + len : len;

            $(".mafiran-slider-nav-number").text( "01/" + lenS );

            $(this).on('beforeChange', function(event, slick, currentSlide, nextSlide){

                //var $currentSlide = currentSlide + 1;

                var barL = barWidth / len;

                barL = barL * nextSlide;

                $bar.animate({
                    //opacity: 0.25,
                    left: barL,
                    //height: "toggle"
                }, 500, function() {

                    var curS = nextSlide + 1;

                    curS = curS < 10 ? "0" + curS : curS;

                    $(".mafiran-slider-nav-number").text( curS + "/" + lenS );

                });

            });

        });

        $(".mafiran-slider-nav .slide-next").on("click" , function(){

            $(".about-company-slider").slick("slickNext");

        });

        $(".mafiran-slider-nav .slide-prev").on("click" , function(){

            $(".about-company-slider").slick("slickPrev");

        });

        /*$('.archive-service-post-type article.post .read-more').click(function( e ) {

            var elm_post           = $(this).parents('.post:first'),
                elm_post_thumbnail = $(elm_post).children('.post-thumbnail'),
                elm_post_entry     = $(elm_post).children('.entry-content');

            if ($( this ).hasClass('open') ) {

                $(elm_post).animate({
                    height: 190
                }, 500, function() {

                });

            } else {

                $(elm_post).animate({
                    height: $(elm_post_thumbnail).height() + $(elm_post_entry).height() + 20
                }, 500, function() {

                });

            }

            $(this).toggleClass('open');

        });*/

        $( ".archive-service-post-type .mafiran-services-inner" ).accordion({
            heightStyle : "content" ,
            collapsible : true ,
            active      : false
        });

        if( !$("body").hasClass("siteeditor-app") ) {

            $(".archive-service-tabs").tabs();

        }

        $(".archive-service-post-type .mafiran-services-inner .read-more-back").on("click" , function(){

            $( ".archive-service-post-type .mafiran-services-inner" ).accordion( "option" , "active" , false );

        });

        if( typeof window.masterslider_instances != 'undefined' ) {

            var mGallery = window.masterslider_instances[0];

            $(".next-gallery-slide").on("click", function () {

                mGallery.api.next();

            });

            var _addTumbCount = function (cIndex) {

                // dispatches when the slider's current slide change ends.
                var numS = mGallery.api.count(),
                    index = cIndex;

                cIndex += 1;

                cIndex = cIndex < 10 ? "0" + cIndex : cIndex;

                numS = numS < 10 ? "0" + numS : numS;

                //console.log( mGallery.api.view.currentSlide );

                $(".ms-thumbs-cont .ms-thumb-frame .ms-thumb-ol").eq(index).html("<span class='mafiran-thumb-num-count'>" + cIndex + "/" + numS + "</span><span class='fa fa-angle-left'></span>");
            };

            /*mGallery.api.addEventListener( MSSliderEvent.CHANGE_START , function(){

             var cIndex = mGallery.api.index() + 1;

             _addTumbCount( cIndex );

             });*/

            mGallery.api.addEventListener(MSSliderEvent.INIT, function () {

                var numS = mGallery.api.count();

                for (i = 0; i < numS; i++) {
                    _addTumbCount(i);
                }

            });

        }

    });


    var ActiveLanguage = function() {
        $('.active-language').on( "click", function(){
            $("body").addClass("remove-intro");
        });
    };

    ActiveLanguage();    

/***************************************************************************************************************************************/


    /**
     * Vertical Menu Accordion
     */

    var _SedVMenu = $('#sed_vertical_header_vertical_menu');

    _SedVMenu.find('li.menu-item.menu-item-has-children > a').click(function(e){

        e.preventDefault();

        var $this = $(this);

        if ($this.next().hasClass('active')) {
            $this.next().removeClass('active');
            $this.next().slideUp(350);
            $this.removeClass('active');
        } else {
            $this.parent().parent().find('li .sub-menu').removeClass('active');
            $this.parent().parent().find('li .sub-menu').slideUp(350);
            $this.next().addClass('active');
            $this.next().slideDown(350);
            $this.parent().parent().find('li > a').removeClass('active');
            $this.addClass('active');
        }

    });

    /**
     * Vertical Menu Accordion
     */

    var scrollbarContainer =  $(".sed-shop-faq-wrapper"),
        scrollbarHeight =  $( window ).height() - 200;  

    scrollbarContainer.css({
        height : scrollbarHeight + 'px', 
    });
    

    scrollbarContainer.mCustomScrollbar({
        autoHideScrollbar:true ,
        advanced:{
            updateOnBrowserResize:true, /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
            updateOnContentResize:true,
        },
        scrollButtons:{
            enable:false
        },
    });

    var scrollbarContainer_2 =  $(".sed-shop-faq-single"),
        scrollbarHeight_2 =  $( window ).height() - 200;  

    scrollbarContainer_2.css({
        height : scrollbarHeight_2 + 'px', 
    });
    

    scrollbarContainer_2.mCustomScrollbar({
        autoHideScrollbar:true ,
        advanced:{
            updateOnBrowserResize:true, /*update scrollbars on browser resize (for layouts based on percentages): boolean*/
            updateOnContentResize:true,
        },
        scrollButtons:{
            enable:false
        },
    });


    /**
     * FAQ Accordion
     */

    var _faqAccordionEl = $(".sed-shop-faq-wrapper-inner");

    _faqAccordionEl.accordion({
        heightStyle     : "content",
        active          : 0,
        collapsible     : true,
        icons           :false 
    });

    console.log(_faqAccordionEl);

    /**
     * Single Products
     */
    $(".single_open_add_to_cart_dialog").on("click" , function(){

        var $dialog = $("#sed-add-to-cart-dialog");

        $dialog.addClass( 'active' );

        var $conetntForm = $(".add-to-cart-dialog-form-conetnt");

        if( $conetntForm.length > 0 ) {

            var fields = $(".product-options .product-option-value").serializeArray(),
                $labels = $(".product-options .product-option-label"),
                $html = '';

            console.log(fields);

            $.each(fields, function (index, val) {

                $html += '<div class="tanin-form-item-content"><span class="input-label">' + $labels.eq( index ).text() + ': </span><span class="input-val">' + val.value + '</span></div>';

            });

            $conetntForm.html( $html );

            var quantity = $("#tanin_product_quantity").find(".product-option-value").val();

            $("form.tanin-main-form-cart").find(".quantity > input.qty").val( quantity );

        }

    });

    $(".add-to-cart-dialog-close").on("click" , function(){
        $("#sed-add-to-cart-dialog").removeClass( 'active' );  
    });    

    $("#sed-add-to-cart-dialog").on('click', function (e) {

        if ( !$(e.target).hasClass("add-to-cart-dialog-inner") && $(e.target).parents(".add-to-cart-dialog-inner:first").length == 0 ) {
            
            $(this).removeClass( 'active' );                      
        }

    });   


    /*$('.item-column').livequery(function(){
        var ItemId            = $(this).attr("id"),
            Item              = $( "#" + ItemId ),
            popupContainerid  = Item.find(".sed_popup").attr("id"),
            iconselectorid    = Item.find(".project-view-icon").attr("id"),
            popupContainer    = $( "#" + popupContainerid ),
            iconselector      = $( "#" + iconselectorid ),
            iconClose         = Item.find(".sed_popup_container .close");

        iconselector.click(function(event) {
            
            event.preventDefault();
            
            if(!popupContainer.hasClass('in') && !popupContainer.hasClass('show')){
                popupContainer.addClass('in');  
                popupContainer.addClass('show');
            }

        });

        iconClose.click(function(event) {
            
            if(popupContainer.hasClass('in') && popupContainer.hasClass('show')){
                popupContainer.removeClass('in');   
                popupContainer.removeClass('show');
            }

        });

        popupContainer.on('click', function (e) {

            if ( !$(e.target).hasClass("sed_popup_container") && $(e.target).parents(".sed_popup_container:first").length == 0 ) {
                
                if($(this).hasClass('in') && $(this).hasClass('show')){
                    $(this).removeClass('in');   
                    $(this).removeClass('show');
                }                       
            }
        });    

    });

    */

    /**
     * Loading 
     */

    var removePreloader = function() {
        setTimeout(function() {
            jQuery('.preloader').hide();
        }, 1500);
    };

    removePreloader();  


})(jQuery);
