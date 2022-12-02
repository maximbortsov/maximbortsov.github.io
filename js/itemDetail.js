import {getSalesList, getLot, buyNFTRequest, getAllNftByProduct} from "./apiReqest.js?load=200"
import {
    salesListLoader,
    buyNftLoader,
    closeModal,
    openModal,
    momentOwnerLoader
} from "./additionalFunctions.js?load=1900"
import {localization} from "./constants.js?load=500"
export default function ($){
    'use strict'
    $(document).ready(function (){
        getSalesList().then((response) => {
            if (response.error !== null) {
                console.log(response.error)
            } else {
                let mint = response.result.mint
                delete response.result.mint
                $.each(response.result, (index, value) => {
                    salesListLoader(value, mint).appendTo($('#salesList'))
                })
                if (response.result[0] === undefined) {
                    $('#salesList').append('<div class="row pt-3">\n' +
                        `                    <h5 class="ml-15">${localization.noActiveLots}</h5>\n` +
                        '                </div>')
                    $('#salesCounter').replaceWith("0")
                }
                const countSale = $('#salesList').find("div.row").length - 1
                $('#salesCounter').replaceWith(countSale.toString())
            }
        }).catch((er) => {
            console.log(er)
        }).finally(()=>{
            if ($('.market-listing')) {
                [].forEach.call($('.marketlist-btn'), function (el) {
                    el.addEventListener('click', function (event) {
                        getLot(el.getAttribute("lotId")).then((response) => {
                            $('#modalBuyContent').replaceWith(buyNftLoader(response.result))
                            openModal($('#modalBuy'))
                            if ($(`#modalBuyContent`)) {
                                $('#modalBuyContent').click(function (event) {
                                    event.stopPropagation()
                                })
                            }
                            if ($('.closeModal')) {
                                $('.closeModal').click(function (event) {
                                    closeModal($('.modal-bg'))
                                })
                            }
                            $('#buyNFTBtn').click(()=>{
                                $('#buyNFTBtnLoader')[0].style.display = 'inline-block'
                                $('#buyNFTBtn')[0].style.display='none';
                                buyNFTRequest(response.result).then((response)=>{
                                    if (response.error!== null){
                                        if (response.error === 'Не достаточно средств'){
                                            $('.btn-deposit')[0].style.display ='flex';
                                            $('.deposit-container p')[0].innerText = localization.depositText;
                                            $('.deposit-container')[0].style.display ='flex';

                                        } else if (response.error === 'Не авторизован'){
                                            window.location.href = '/signup';
                                        }
                                        else if (response.error === 'Не возможно купить у самого себя'){
                                            $('.deposit-container')[0].style.display ='flex';
                                            $('.btn-deposit')[0].style.display ='none';
                                            $('.deposit-container p')[0].innerText = localization.cannotBuyFromYourself;
                                        }else{
                                            console.log(response.error)
                                        }
                                    } else {
                                        $('.closeModal').trigger('click')

                                    }
                                    $('#buyNFTBtnLoader')[0].style.display = 'none'
                                    $('#buyNFTBtn')[0].style.display='block';
                                })
                                    .catch(err=>{
                                        console.log(err)
                                    })
                            })
                        }).catch((er) => {
                            console.log(er)

                        })
                    })
                })
            }
        })
        getAllNftByProduct().then(response =>{
            if (response.error!==null){
                console.log(response.error)
            }else{
                let mint = response.result.mint
                delete response.result.mint
                $.each(response.result, (index, value) => {
                    momentOwnerLoader(value, mint).appendTo($('#momentsOwnersList'))
                })
            }
        })
        $('#modalBuy').click(function (event) {
            closeModal($('#modalBuy'))
        })
        function playVideo() {

            if ($('#videoWindow')) {
                let select = document.getElementById('selectSource')
                switch (select.innerText) {
                    case "Twitch":
                        openVideo("twitch")
                        break
                    case "Youtube":
                        openVideo("youtube")
                        break
                    case "GGNFTBox":
                        openVideo("innerPlayer")
                        break
                    default:
                        openVideo("innerPlayer")
                        break
                }
            }
        }

        function openVideo(type) {
            $('#videoWindow > div').css("display", "none")
            $(`#${type}`).css("display", "block")
        }

    })
}