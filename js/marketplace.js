import {gameCode, localization,localizationCategory} from "./constants.js?load=2"
import {getMarketplaceList, getSearchItems,addSearchList} from "./apiReqest.js"
import {onLoadMore} from "./additionalFunctions.js?load=2100"
export default function ($){
    'use strict'
    let loadPage = 0
    let loadPageAll = 0
    let loadPageDota2 = 0
    let loadPageLol = 0
    let loadPageCsgo = 0
    let loadPageCod = 0
    let loadPageOther = 0
    let currentPageDota2 = 0
    let currentPageLol = 0
    let currentPageCsgo = 0
    let currentPageCod = 0
    let currentPageOther = 0
    let count = 0
    let typingTimer
    const doneTypingInterval = 500
    const searchinput = $('#search')
    function doneTyping(){

        if (searchinput[0].value.length <4){
            $('#listSearchResult li').remove();
            $('#listSearchResult')[0].style.visibility = 'hidden'
            $('#searchBtn')[0].setAttribute('disabled', true)
        }else{
            $('#listSearchResult')[0].style.visibility = 'visible'
            $('#searchBtn')[0].removeAttribute('disabled')
            $('#listSearchResult li').remove();
            $('#searchLoader')[0].style.display = 'block'
            addSearchList(searchinput).then(function (results){
                [].forEach.call(results, function (value,index){
                    $('#listSearchResult').append(value)
                })
                $('#searchLoader')[0].style.display = 'none'
            })
        }

    }
    $(document).ready(function (){
        const urlSearchParams = new URLSearchParams(window.location.search);
        const categ = [...gameCode.entries()]
            .filter(({1: v}) => v === localizationCategory.get(urlSearchParams.get('category')))
            .map(([k])=> k);
        if($(`.portfolio-menu button[data-filter="${categ[0]}"]`)[0]!== undefined){
            $(`.portfolio-menu button[data-filter="${categ[0]}"]`).addClass('active')
            $(`.portfolio-menu button[data-filter="${categ[0]}"]`).focus()
        } else{
            $(`.portfolio-menu button[data-filter="*"]`).addClass('active')
            $(`.portfolio-menu button[data-filter="*"]`)[0].focus()
        }
        $('#loadMoreBtn').click(() => {
            let gameId = gameCode.get($(".active")[0].getAttribute('data-filter'))
            switch (gameId) {
                case 0:
                    loadPage = loadPageAll
                    break
                case 1:
                    loadPage = loadPageDota2
                    break
                case 3:
                    loadPage = loadPageLol
                    break
                case 4:
                    loadPage = loadPageCsgo
                    break
                case 5:
                    loadPage = loadPageCod
                    break
                case 6:
                    loadPage = loadPageOther
                    break
            }
            $('#loadMoreBtnLoader')[0].style.display = 'inline-block';
            $('#loadMoreBtn')[0].style.display = 'none';

            getMarketplaceList(loadPage, gameId).then(function (response) {
                if (response.error!==null){
                    console.log(response.error)
                } else {
                    let items = onLoadMore(response.result)
                    if (items.length < 6) {
                        $('#loadMoreBtn')[0].style.visibility = 'hidden'
                    }
                    if (items.length === 0 && loadPage === 0 ){
                        $('.message')[0].style.display = 'block';
                        $('.message')[0].innerText = localization.noItems;
                    }
                    [].forEach.call(items, async function (value) {
                        if (gameId === 0) {
                            switch (value.gameId) {
                                case 1:
                                    if (currentPageDota2 > 0) {
                                        currentPageDota2 -= 1
                                        return
                                    }
                                    loadPageDota2  += 1
                                    break
                                case 3:
                                    if (currentPageLol > 0) {
                                        currentPageLol -= 1
                                        return
                                    }
                                    loadPageLol += 1
                                    break
                                case 4:
                                    if (currentPageCsgo > 0) {
                                        currentPageCsgo -= 1
                                        return
                                    }
                                    loadPageCsgo += 1

                                    break
                                case 5:
                                    if (currentPageCod > 0) {
                                        currentPageCod -= 1
                                        return
                                    }
                                    loadPageCod += 1
                                    break
                                case 6:
                                    if (currentPageOther > 0){
                                        currentPageOther -=1
                                        return
                                    }
                                    loadPageOther += 1
                                    break;
                            }
                        } else if (gameId === 1) {
                            currentPageDota2 += 1
                            loadPageDota2 += 1
                        } else if (gameId === 3) {
                            currentPageLol += 1
                            loadPageLol += 1
                        } else if (gameId === 4) {
                            currentPageCsgo += 1
                            loadPageCsgo += 1
                        } else if (gameId === 5) {
                            currentPageCod += 1
                            loadPageCod += 1
                        } else if (gameId === 6) {
                            currentPageOther += 1
                            loadPageOther += 1
                        }
                        await $(value.parent).imagesLoaded(function () {
                            $('#marketplaceList').append(value.parent)
                                .isotope('appended', value.parent)
                                .isotope('layout');
                        })

                    })
                    $('#loadMoreBtnLoader')[0].style.display = 'none';
                    $('#loadMoreBtn')[0].style.display = 'inline-block';
                }

            }).catch(err=>{
                console.log(err)
            })

            loadPageAll += 8

        })
        $('#loadMoreBtn').trigger('click')
        $('#searchBtn').click( function (event){
            $('#marketplaceList').isotope('remove',$('#marketplaceList').isotope('getItemElements'));
            getSearchItems(count).then((response)=>{
                if (response.error!==null){
                    console.log(response.error)
                } else {
                    count = response.result
                }

            }).catch(err=>{
                console.log(err)
            })
            $('#loadMoreBtn').off('click')
            $('#loadMoreBtn').click((event)=>{
                getSearchItems(count).then((response) => {
                    if (response.error !== null) {
                        console.log(response.error)
                    } else {
                        count = response.result
                    }

                }).catch(err=>{
                    console.log(err)
                })
            })
        })

        $('#search').on('keyup', function (){
            clearTimeout(typingTimer)
            typingTimer = setTimeout(doneTyping, doneTypingInterval)
        })
        $('#search').on('keydown',function (){
            clearTimeout(typingTimer)
        })

        $('#search').on('blur', function (event){
            if ($('#listSearchResult').find(event.relatedTarget)[0] === undefined) {
                $('#listSearchResult')[0].style.visibility = 'hidden'
            }

        })


    })


}