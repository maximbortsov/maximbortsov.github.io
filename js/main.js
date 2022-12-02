import {getPopularItems, getTopPacks} from "./apiReqest.js?load=1100"
import {popularElementLoader, packElementLoader, daysNumToStr} from "./additionalFunctions.js?load=2400"
import {localization} from "./constants.js?load=4000";
export default function ($){
    'use strict'
    let timer = null
    if ($('#boxTime')[0]!==undefined){
        const relizeStreamer = $('#boxTime')[0].getAttribute('data-releasestreamer')
        const relizeStreamerHref = $('#boxTime')[0].getAttribute('data-releasestreamerhref')
        const relizeTime = new Date($('#boxTime')[0].getAttribute('data-releasetime'))
        const relizeBoxHref = $('#boxTime')[0].getAttribute('data-releaseboxhref')
        let nowTime = Date.now()
        const timers = ()=>{
            if (relizeTime > nowTime){
                const leftTime = relizeTime - nowTime
                const time = new Date(leftTime)
                const days = time.getDate()
                let hours = time.getHours()
                if (hours.toString().length ===1){
                    hours= `0${hours.toString()}`
                }
                let minutes = time.getMinutes()
                if (minutes.toString().length ===1){
                    minutes= `0${minutes.toString()}`
                }
                let sec = time.getSeconds()
                if (sec.toString().length ===1){
                    sec= `0${sec.toString()}`
                }
                $(`#boxTime`).replaceWith($(`<p id="boxTime" class="w-text">NFT BOX® от <a href="https://${relizeStreamerHref}" target="_blank">${relizeStreamer}</a> ${localization.willBeAvailable} <span class="w-text">${daysNumToStr(days, true)} ${hours}:${minutes}:${sec}</span></p>`));
                nowTime += 1000
            } else {
                $(`#boxTime`).replaceWith($(`<p id="boxTime" class="w-text">NFT BOX® от <a href="https://${relizeStreamerHref}" target="_blank">${relizeStreamer}</a> ${localization.released}</p>`))
                $(`#relizeBox`).href = relizeBoxHref
                if(timer){
                    clearInterval(timer)
                }
            }
        }
        if ($(`#boxTime`)[0]!==undefined){
            timers()
        }
        timer = setInterval(timers,1000)
    }
    $(document).ready(function (){
        getPopularItems().then(response => {
            if (response.error !== null) {
                console.log(response.error)
            } else {
            $.each(response.result, (index, value) => {
                $('#popular-owl-carousel').trigger('add.owl.carousel', popularElementLoader(value))
            })
            $('#popular-owl-carousel').trigger('refresh.owl.carousel')
            }
        }).catch(er => {
            console.log(er)
        })
        getTopPacks(0).then(response => {
            if (response.error!==null){
                console.log(response.error)
            } else{
                $.each(response.result, (index, value) => {
                    $('#top-packs-carousel').trigger('add.owl.carousel', packElementLoader(value))
                })
                $('#top-packs-carousel').trigger('refresh.owl.carousel')
            }
        }).catch(er => {
            console.log(er)
        })

    })
    $('#top-packs-carousel').owlCarousel({
        loop: true,

        nav: true,
        navText: ["<div class='popular-nav-chevron popular-nav-chevron_left'><i class='fa fa-chevron-left'></i></div>", "<div class='popular-nav-chevron popular-nav-chevron_right'><i class='fa fa-chevron-right'></i></div>"],
        responsive: {
            0: {

                items: 1
            },
            580: {
                items: 2
            },
            1024: {
                items: 3,
                margin: 30
            },
            1440: {
                items: 3,
                margin: 50
            }

        }
    })
    $('#popular-owl-carousel').owlCarousel({
        loop: true,

        nav: true,

        navText: ["<div class='popular-nav-chevron popular-nav-chevron_left'><i class='fa fa-chevron-left'></i></div>", "<div class='popular-nav-chevron popular-nav-chevron_right'><i class='fa fa-chevron-right'></i></div>"],
        responsive: {
            0: {

                items: 1
            },
            580: {

                items: 2
            },
            1024: {
                items: 3
            },
            1440: {
                items: 3
            }

        }
    })
    var $page = $('html, body');
    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 300);
        return false;
    });

}