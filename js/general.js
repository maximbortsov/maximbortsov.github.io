import {localization, $window} from "./constants.js?load=400"
export default function ($){
    'use strict'



    $(document).ready(function (){
        $(window).on('load', function () {
            $('#preloader').fadeOut(1000, function () {
                $(this).remove()
            })
        })
        $.validator.addMethod(
                "regex",
                function (value, element, regexp) {
                    let re = new RegExp(regexp)
                    return this.optional(element) || re.test(value)
                },
                "Please check your input."
            )

        $.validator.addMethod(
            "amount",
            function (value, element, count){
                let newValue = value
                if(value[0] === "$"){
                    newValue = value.slice(1)
                }
                return parseFloat(newValue) >= count;
            },
            localization.selectAmount
        );
        $.validator.addMethod(
            "maxAmount",
            function (value, element, count){
                return parseFloat(value) <= count;
            },
            localization.selectAmount
        );
        [].forEach.call($('#language_select_list li'), function (item) {
            $(item).on('click', function (event) {
                const l = item.innerText
                $('#language')[0].value = l
                $('#language_select_list')[0].style.visibility = 'hidden'
                $('#language_select_list')[0].style.opacity = '0'

                $.ajax({
                    url: "../vendor/set_lang.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        lang: l.toString().toLowerCase()
                    },
                    success(data) {
                        location.reload()
                    },
                    error: function (exception) {
                        console.log(exception)
                    }
                })
            })
        })
        $('#language').click((event) => {
            if ($('#language_select_list')[0].style.visibility === 'hidden') {
                $('#language_select_list')[0].style.visibility = 'visible'
                $('#language_select_list')[0].style.opacity = '1'
            } else {
                $('#language_select_list')[0].style.visibility = 'hidden'
                $('#language_select_list')[0].style.opacity = '0'
            }
        })
        $('#language ~i').click((event) => {
            $('#language').click()
            $('#language').focus()
        })
        $('#language').blur((event) => {

            if (event.relatedTarget !== $('#language_select_list')[0]) {
                $('#language_select_list')[0].style.visibility = 'hidden'
                $('#language_select_list')[0].style.opacity = '0'
            }
        })
    })
    if ($.fn.magnificPopup) {
        $('#videobtn').magnificPopup({
            type: 'iframe'
        })
        $('.open-popup-link').magnificPopup({
            type: 'inline',
            midClick: true
        })
        $('.open-signup-link').magnificPopup({
            type: 'inline',
            midClick: true
        })
        $('.gallery_img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            preloader: true
        })
    }

    // :: Preloader Active Code


    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 500,
            scrollText: localization.scrollTop
        })
    }

    // :: onePageNav Active Code
    if ($.fn.onePageNav) {
        $('#nav').onePageNav({
            currentClass: 'active',
            scrollSpeed: 500,
            easing: 'easeOutQuad'
        })
    }

    // :: CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        })
    }

    // :: Masonary Gallery Active Code
    if ($.fn.imagesLoaded) {
        $('.dream-portfolio').imagesLoaded(function () {
            // filter items on button click
            $('.portfolio-menu').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter')
                $grid.isotope({
                    filter: filterValue
                })
                if($('#loadMoreBtn')[0]!==undefined){

                    $('#loadMoreBtn')[0].style.visibility= 'visible'
                    $('.message')[0].style.display = 'none';
                    $('#loadMoreBtn').trigger('click')
                }
                if( $('#profileLoadMore')[0]!==undefined){
                    $('#profileLoadMore')[0].style.visibility= 'visible'
                    $('.message')[0].style.display = 'none';
                    $('#profileLoadMore').trigger('click')
                }
                if($('#loadMoreMyProfile')[0]!==undefined){
                    $('#loadMoreMyProfile')[0].style.visibility= 'visible'
                    $('.message')[0].style.display = 'none';
                    $('#loadMoreMyProfile').trigger('click')
                }

            })
            // init Isotope
            var $grid = $('.dream-portfolio').isotope({
                itemSelector: '.single_gallery_item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.single_gallery_item'
                }
            })
        })
    }

    // :: Gallery Menu Style Active Code
    $('.portfolio-menu button.btn').on('click', function () {
        $('.portfolio-menu button.btn').removeClass('active')
        $(this).addClass('active')
    })

    // :: Wow Active Code
    if ($window.width() > 767) {
        new WOW().init()
    }

    // :: Accordian Active Code
    (function () {
        var dd = $('dd')
        dd.filter(':nth-child(n+3)').hide()
        $('dl').on('click', 'dt', function () {
            $(this).next().slideDown(500).siblings('dd').slideUp(500)
        })
    })()

    // :: niceScroll Active Code
    if ($.fn.niceScroll) {
        $(".timelineBody").niceScroll()
    }
}