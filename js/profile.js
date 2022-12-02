import {localization} from "./constants.js"
import {onLoadMore, packElementLoader} from "./additionalFunctions.js"
import {getProfileItems, getBoxesByStreamer} from "./apiReqest.js?load=14"
export default function ($){
    'use strict'
    let loadPageMoment=0;
    let loadBoxes=0;
    $(document).ready(function (){
        $('#profileLoadMore').click(() => {
            let newItems = []
            let categ = $(".active")[0].getAttribute('data-filter')
            let url = window.location.pathname.split('/')
            $('#loadMoreBtnLoader')[0].style.display = 'inline-block';
            $('#profileLoadMore')[0].style.display = 'none';
            if (categ === ".moments") {

                getProfileItems(loadPageMoment, 0, url[2]).then((response) => {
                    if (response.error!==null){
                        console.log(response.error)
                    } else{
                        newItems = response.result
                        let items = onLoadMore(newItems);
                        if (items.length < 6){
                            $('#profileLoadMore')[0].style.visibility= 'hidden'
                        }
                        if (items.length === 0 && loadPageMoment === 0 ){
                            $('.message')[0].style.display = 'block';
                            $('.message')[0].innerText = localization.noItems;
                        }
                        [].forEach.call(items, async function (value) {
                            value.parent.className = "col-12 col-md-4 col-lg-4 single_gallery_item moments"
                            $( value.parent).find('.pricing').remove();
                            $(value.parent).find('span.g-text')[0].innerText =`${localization.momentMint} ${$(value.parent).find('span.g-text')[0].innerText.split("/")[1]} `;
                            await $(value.parent).imagesLoaded(function () {
                                $('#profileList').append(value.parent)
                                    .isotope('appended', value.parent)
                                    .isotope('layout');
                            })
                            loadPageMoment+=1;
                        })
                        $('#loadMoreBtnLoader')[0].style.display = 'none';
                        $('#profileLoadMore')[0].style.display = 'inline-block';
                    }
                }).catch(er => {
                    console.log(er)
                })
            } else if (categ===".box") {
                getBoxesByStreamer(loadBoxes,url[2]).then(response =>{
                    if (response.error!==null){
                        console.log(response.error)
                    } else{
                        if (response.result.length < 6){
                            $('#profileLoadMore')[0].style.visibility= 'hidden'
                        }
                        if (response.result.length === 0 &&  loadBoxes === 0 ){
                            $('.message')[0].style.display = 'block';
                            $('.message')[0].innerText = localization.noBoxes;
                        }
                        $.each( response.result, async function (index, value){
                            let item = await packElementLoader(value);
                            let newitem = $('<div class="col-12 col-md-4 col-lg-4 single_gallery_item box"></div>')
                            $(item).appendTo(newitem)
                            $(item).imagesLoaded( function () {
                                $('#profileList').append(newitem)
                                    .isotope('appended', newitem)
                                    .isotope('layout');
                            })
                            loadBoxes+=1;
                        })
                        $('#loadMoreBtnLoader')[0].style.display = 'none';
                        $('#profileLoadMore')[0].style.display = 'inline-block';
                    }
                }).catch( err =>{
                    console.log(err)
                })
            }


        })
        $('#profileLoadMore').trigger('click');
    })
}