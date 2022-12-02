import {lang, localization} from "./constants.js?load=1300"

'use strict'

export function openModal(modal) {
    modal.css('opacity', '1');
    modal.css('visibility', 'visible');
    modal.css('z-index', '1031');
}

export function closeModal(modal) {
    modal.css('opacity', '0');
    modal.css('visibility', 'hidden');
    modal.css('z-index', '-1031');
}

export function packLoader(pack) {
    let parent = $(document.createElement('div')).attr({class: "row drop-item-content m-lr-a"})
    let $imgdrop = $(document.createElement('div')).attr({class: "col-8 col-lg-8"})
    let $imgbox = $(document.createElement('div')).attr({class: "detailed-img"})
    let img = new Image()
    img.src = `/src/${pack.box_image_path}`
    img.alt = "none"
    // if(pack.box_count === 0){
    //     $('<img src="../img/icons/soldout.jpg">').appendTo($imgbox);
    // }
    $('<img class="soldout" src="../img/icons/soldoutRusLife.png">').appendTo($imgbox)
    $(img).appendTo($imgbox)
    $imgbox.appendTo($imgdrop)
    $imgdrop.appendTo(parent)
    let $controlDrop = $(document.createElement('div')).attr({class: "col-4 col-lg-4"})
    let $sidebarArea = $(document.createElement('div')).attr({class: "sidebar-area dd-bg"})
    let $dropItemInfo = $(document.createElement('div')).attr({class: "dropitem-info"})
    let $whoWeContant = $(document.createElement('div')).attr({class: "who-we-contant mb-15"})
    let $dropName = $(document.createElement('h4')).attr({
        class: "fadeInUp",
        "data-wow-delay": "0.3s"
    }).text(pack.box_name)
    let $total = $(document.createElement('div')).attr({class: "mb-15 text-white "}).text(`${pack.box_count} ${localization.total}`)
    let $price = $(document.createElement('span')).attr({class: "dropitem-price mr-30"}).text(`${localization.currency}${pack.box_price}`)
    let $includes = $(document.createElement('div')).attr({class: "mb-15 text-white"})
    $price.appendTo($includes)
    $includes.append(`<span>${localization.include} ${pack.box_size} ${localization.moments}</span>`)
    let $dropBtn = $(document.createElement('div')).attr(
        "id", "buyDropBtn"
    ).attr(
        "class", function (i, val) {
            // !== here
            if (pack.box_size === 0) {
                return "btn drop-btn "
            } else {
                return "btn drop-btn drop-btn-end"
            }
        }
    ).text(
        () => {
            if (pack.box_size === 0) {
                return localization.buyDrop
            } else {
                return localization.dropEnd
            }
        }
    )
    $dropName.appendTo($whoWeContant)
    $whoWeContant.appendTo($dropItemInfo)
    $total.appendTo($dropItemInfo)
    $includes.appendTo($dropItemInfo)
    $dropBtn.appendTo($dropItemInfo)
    $dropItemInfo.appendTo($sidebarArea)
    $sidebarArea.appendTo($controlDrop)
    $controlDrop.appendTo(parent)
    let $describeBox = $(document.createElement('div')).attr({class: "col-8 col-lg-8 mt-30 mb-50"})
    let $describeArea = $(document.createElement('div')).attr({class: "describe-area dd-bg"})
    let $authorItem = $(document.createElement('div')).attr({class: "author-item"})
    let $authorImg = $(document.createElement('div')).attr({class: "author-img ml-0"})
    img = new Image()
    img.src = `/src/${pack.streamers[0].user_awatar_link}`
    img.alt = "none"
    img.width = "70"
    $(img).appendTo($authorImg)
    let $authorInfo = $(document.createElement('div')).attr({class: "author-info"})
    let $link = $(document.createElement('a')).attr({href: `/profile/${pack.box_streamers_ids}`})
    let $authorName = $(document.createElement('h5')).attr({class: "author-name"}).text(pack.streamers[0].user_name)
    let $role = $(document.createElement('p')).attr({class: "author-earn mb-0"}).text(localization.streamer)
    let $describeBr = $(document.createElement('div')).attr({class: "describe-br mb-30"})
    let $describe = $(document.createElement('p')).attr({class: "text-white"}).text(pack.box_description)
    $authorImg.appendTo($authorItem)
    $authorName.appendTo($link)
    $link.appendTo($authorInfo)
    $role.appendTo($authorInfo)
    $authorInfo.appendTo($authorItem)
    $authorItem.appendTo($describeArea)
    $describeBr.appendTo($describeArea)
    $describe.appendTo($describeArea)
    $describeArea.appendTo($describeBox)
    $describeBox.appendTo(parent)
    return parent
}

export function productLoader(value) {

    let parent = $(document.createElement('div')).attr({class: `col-12 col-md-3 col-lg-3 single_gallery_item ${value.category}`})
    let $marketItem = $(document.createElement('div')).attr({class: 'pricing-item market-item'})
    let $wraper = $(document.createElement('div')).attr({class: 'wraper'})
    let $momentLink = $(document.createElement('a')).attr({href: `/item-details/${value.productId}`})
    let img = new Image()
    img.src = value.imageUrl
    img.alt = 'none'
    $(img).appendTo($momentLink)

    let $momentLink2 = $(document.createElement('a')).attr({href: `/item-details/${value.productId}`})
    $(document.createElement('h4')).attr({class: 'pricing-item_name'}).text(value.title.slice(0, 1).toUpperCase() + value.title.slice(1)).appendTo($momentLink2)
    let $cost = $(document.createElement('span'))
    $cost.append(` ${value.price}`)
    $(document.createElement('span')).attr({class: "g-text ml-15"}).text(`${value.momentMint}/${value.mint}`).appendTo($cost)
    let $pricing = $(document.createElement('div')).attr({class: "pricing"}).text(`${localization.lowestPrice}: `)
    $(document.createElement('span')).text(value.lowestPrice).appendTo($pricing)
    let $admire = $(document.createElement('div')).attr({class: "admire"})
    let $par = $(document.createElement('a')).attr({href: `/profile/${value.authorId}`, class: 'adm'})
    $(document.createElement('i')).attr({class: "fa fa-user"}).appendTo($par)
    $par.append($(document.createElement('span')).text(value.authorName))
    $par.appendTo($admire)
    $momentLink.appendTo($wraper)
    $momentLink2.appendTo($wraper)
    $cost.appendTo($wraper)
    $pricing.appendTo($wraper)
    $admire.appendTo($wraper)
    $wraper.appendTo($marketItem)
    $marketItem.appendTo(parent)
    return parent
}

export function cancelSale(item) {
    return $(' <div id="putOnSaleContent" class="modal-buy">\n' +
        `            <div id="cancelSaleForm" class="row" nftId="${item.nft_minted_num}" productId="${item.nft_product_id}">\n` +
        '                <div class="closeModal"><i class="fas fa-times"></i></div>\n' +
        `                <h4 class="col-12">${localization.wannaWithdrawMoment}</h4>\n` +
        ' <div id="withdrawMomentLoader" class="spinloader" style="display: none"></div>' +
        `                <button id="withdrawMoment" class="btn btn-buy">${localization.withdrawMoment}</button>\n` +
        ' <p class="message" style="display:none;"></p>' +
        '            </div>\n' +
        '\n' +
        '        </div>\n')
}

export function packElementLoader(value) {
    let parent = $(document.createElement('div')).attr({class: 'top-packs-item'})
    let $collectionItem = $(document.createElement('div')).attr({
        class: 'collection-item wow fadeInUp',
        'data-wow-delay': '0.2s'
    })
    let $collectionIcon = $(document.createElement('a')).attr({
        class: 'collection_icon',
        href: `/drop-item/${value.box_id}`
    })
    if (value.box_count === 0) {
        $(`<img class="soldout" src="/img/icons/${localization.soldOutImage}"/>`).appendTo($collectionIcon);
    }
    let img = new Image()
    img.src = `/src/${value.box_image_path}`
    img.alt = "none"
    $(img).appendTo($collectionIcon)
    let $collectionInfo = $(document.createElement('div')).attr({class: 'collection_info row'})

    let $packName = $(document.createElement('h5')).attr({class: 'col-12 col-lg-12 pricing-item_name'})

    if (lang === "ru") {
        $packName.text(value.box_name_ru.slice(0, 1).toUpperCase() + value.box_name_ru.slice(1))
    } else if (lang === "en") {
        $packName.text(value.box_name_en.slice(0, 1).toUpperCase() + value.box_name_en.slice(1))
    }

    let $packInfo = $(document.createElement('div')).attr({class: 'col-12 col-lg-6'})
    let $price = $(document.createElement('p')).attr({class: "gradient-text"}).text(`${localization.currency}${value.box_price}`)
    let $total = $(document.createElement('p')).attr({class: "bold text-white"}).text(`${value.box_count} ${localization.total}`)
    $price.appendTo($packInfo)
    $total.appendTo($packInfo)
    let $dropBtn = $(document.createElement('div')).attr({class: "col-12 col-lg-6 flex"})
    let $aDrop = $(document.createElement('a')).attr({
        class: "more-btn viewdrop-btn",
        href: `/drop-item/${value.box_id}`
    })
    let $sDrop = $(document.createElement('span')).text(localization.viewDrop)
    $sDrop.appendTo($aDrop)
    $aDrop.appendTo($dropBtn)
    $packName.appendTo($collectionInfo)
    $packInfo.appendTo($collectionInfo)
    $dropBtn.appendTo($collectionInfo)
    $collectionIcon.appendTo($collectionItem)
    $collectionInfo.appendTo($collectionItem)
    $collectionItem.appendTo(parent)
    return parent
}

export function popularElementLoader(value) {
    let parent = $(document.createElement('div')).attr({class: 'popular-item'})
    let $pricingItem = $(document.createElement('div')).attr({class: 'pricing-item'})
    let $wraper = $(document.createElement('div')).attr({class: 'wraper'})
    let $momentLink = $(document.createElement('a')).attr({href: `/item-details/${value.product_id}`})
    let img = new Image()
    img.src = `/src/${value.product_preview_link}`
    img.alt = 'none'
    $(img).appendTo($momentLink)

    let $momentLink2 = $(document.createElement('a')).attr({href: `/item-details/${value.product_id}`})
    $(document.createElement('h4')).attr({class: 'pricing-item_name'}).text(value.product_name.slice(0, 1).toUpperCase() + value.product_name.slice(1)).appendTo($momentLink2)
    let $cost = $(document.createElement('span'))
    let $pricing = $(document.createElement('div')).attr({class: "pricing"}).text(`${localization.lowestPrice}: `)
    if (value.minimum_price !== null) {

        $(document.createElement('span')).text(`${localization.currency}${value.minimum_price}`).appendTo($pricing)
    }
    let $admire = $(document.createElement('div')).attr({class: "admire"})
    let $par = $(document.createElement('a')).attr({href: `/profile/${value.product_streamer_id}`, class: 'adm'})
    $(document.createElement('i')).attr({class: "fa fa-user"}).appendTo($par)
    $par.append($(document.createElement('span')).text(value.streamer_name))
    $par.appendTo($admire)
    $momentLink.appendTo($wraper)
    $momentLink2.appendTo($wraper)
    $(document.createElement('span')).attr({class: "g-text"}).text(`${localization.momentMint} ${value.mint}`).appendTo($wraper)
    if (value.minimum_price !== null) {
        $pricing.appendTo($wraper)
    }
    $admire.appendTo($wraper)
    $wraper.appendTo($pricingItem)
    $pricingItem.appendTo(parent)
    return parent
}

export function buyNftLoader(item) {
    let parent = $('<div id="modalBuyContent"  class="modal-buy row">\n' +
        '                <div class="closeModal"><i class="fas fa-times"></i></div>\n' +
        '                <div class="col-7 col-md-7">\n' +
        '                    <img class="detailed-img" alt="none"/>\n' +
        '                </div>\n' +
        '                <div class="col-5 col-md-5 ">\n' +
        '                    <div class="flex space-between dd-bg pd-p">\n' +
        `                        <p class="text-white">${localization.momentMint}</p>\n` +
        '                        <p id="mintNumber" class="text-white"></p>\n' +
        '                    </div>\n' +
        '                    <div class="author-item">\n' +
        '                        <div class="author-img ml-0"><img id="authorImg" alt=""></div>\n' +
        '                        <div class="author-info ">\n' +
        '                            <a id="authorProfile" ><h5 class="author-name"></h5></a>\n' +
        `                            <p class="author-earn mb-0">${localization.streamer}</p>\n` +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <h5 id="momentTitle"></h5>\n' +
        '                </div>\n' +
        '                <div style="display: none" class="deposit-container">\n' +
        `                    <p>${localization.depositText}</p>\n` +
        `                    <a href="/my-profile/my-balance"><div class="btn btn-deposit">${localization.deposit}</div></a>\n` +
        '                </div>\n' +
        '<div id="buyNFTBtnLoader" class="spinloader" style="display: none"> </div>' +
        '                <button id="buyNFTBtn" class="btn btn-buy"></button>\n' +
        '            </div>')
    $(parent[0]).find('img.detailed-img').attr({src: `/src/${item.product_preview_link}`})
    $(parent[0]).find('#mintNumber').text(`#${item.nft_minted_num}/${item.mint}`)
    $(parent[0]).find('#authorImg').attr({src: `/src/${item.streamer_avatar}`})
    $(parent[0]).find('#authorProfile').attr({href: `/profile/${item.nft_streamer_id}`})
    $(parent[0]).find('h5.author-name').text(item.streamer_name)
    $(parent[0]).find('#momentTitle').text(item.product_name)
    $(parent[0]).find('button.btn-buy').text(`${localization.buyFor} ${localization.currency}${item.price}`)
    return parent
}

export function itemDetailLoader(item) {
    let parent = $('<div class="row item-details-box">\n' +
        '                <div class="col-8 col-lg-8">\n' +
        ' <div class="customjs-select" style="width:200px;">\n' +
        '                        <select>\n' +
        `                            <option value="0">${localization.selectSource}</option>\n` +
        `                            <option value="1">${localization.Twitch}</option>\n` +
        `                            <option value="2">${localization.GGBox}</option>\n` +
        `                            <option value="3">${localization.Youtube}</option>\n` +
        '                        </select>\n' +
        '                    </div>' +
        '                    <div class="detailed-img">\n' +
        '  <div id="videoWindow">\n' +
        '            <div id="twitch">\n' +
        '                <iframe height="400px" width="100%"></iframe>\n' +
        '            </div>\n' +
        '            <div id="youtube">\n' +
        '                <div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div id="innerPlayer">\n' +
        '<video id="my-video-js" class="video-js"></video>' +
        '            </div>\n' +
        '        </div>' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <div class="col-4 col-lg-4">\n' +
        '                    <div class="sidebar-area">\n' +
        '                        <div class="donnot-miss-widget">\n' +
        '                            <div class="who-we-contant">\n' +
        '                                <div class="filers-list">\n' +
        '                                    <a id="marketRef" class="filter-item">\n' +
        '                                       <i class="fas fa-align-justify"></i>\n' +
        '                                    </a>\n' +
        '                                </div>\n' +
        '                                <h4 class="fadeInUp" data-wow-delay="0.3s">\n' +
        '                                </h4>\n' +
        '                            </div>\n' +
        `                            <div id="mintCount" class="flex mb-15 gray-text"><span class="w-text mr-15">${localization.currentPrice}: <span class="gradient-text"> ${localization.currency}${item.initial_price}</span></span><span>${localization.momentMint} ${item.mint}</span>  \n` +
        '                            </div>\n' +
        '                            <div class="details-list">\n' +
        '                                <p id="createdDate"></p>\n' +
        '                            </div>\n' +
        '                            <div class="author-item mb-30">\n' +
        '                                <div class="author-img ml-0"><img id="authorImg" width="70" alt=""></div>\n' +
        '                                <div class="author-info">\n' +
        '                                    <a id="authorName"><h5 class="author-name"></h5></a>\n' +
        `                                    <p class="author-earn mb-0">${localization.streamer}</p>\n` +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>')
    $(parent[0]).find('#marketRef').attr({href: `/marketplace/${item.product_categories_ids}`}).append(localizationCategory[item.product_categories_ids])
    $(parent[0]).find('h4').text(item.product_name)
    $(parent[0]).find('#createdDate').text(`${localization.created} ${new Date(Date.parse(item.product_date_created)).toLocaleString('default', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })}`)
    $(parent[0]).find('#authorImg').attr({src: `/src/${item.streamer_avatar}`})
    $(parent[0]).find('h5.author-name').text(item.streamer_name)
    $(parent[0]).find('#authorName').attr({href: `/profile/${item.product_streamer_id}`})
    return parent
}

export function momentOwnerLoader(value, mint) {
    let parent = $(document.createElement('div')).attr({class: "row"})
    let $mint = $(document.createElement('p')).attr({class: "col-4 col-md-2"}).text(`#${value.nft_minted_num}/${mint}`)
    let $link = $(document.createElement('div')).attr({class: "col-md-4 none"})
    $(`<a href="/profile/${value.lot_seller_user_id}">${value.owner_name}</a>`).appendTo($link)
    let $hash = $(document.createElement('div')).attr({class: "col-md-6 none"})
    if (value.nft_token_url !== null) {
        $(`<a href="${value.nft_token_url}" class="nftHash">${value.nft_address}</a>`).appendTo($hash)
    } else {
        $(`<p>-</p>`).appendTo($hash)
    }
    $mint.appendTo(parent)
    $link.appendTo(parent)
    $hash.appendTo(parent)
    return parent
}

export function salesListLoader(value, mint) {
    let parent = $(document.createElement('div')).attr({class: "row"})
    let $mint = $(document.createElement('p')).attr({class: "col-4 col-md-1"}).text(`#${value.nft_minted_num}/${mint}`)
    let $price = $(document.createElement('p')).attr({class: "col-4 col-md-2"}).text(`${localization.currency}${value.price}`)
    let $link = $(document.createElement('div')).attr({class: "col-md-3 none"})
    $(`<a href="/profile/${value.lot_seller_user_id}">${value.seller_name}</a>`).appendTo($link)
    let $hash = $(document.createElement('div')).attr({class: "col-md-4 none"})
    if (value.nft_token_url !== null) {
        $(`<a href="${value.nft_token_url}"  class="nftHash">${value.nft_address}</a>`).appendTo($hash)
    } else {
        $(`<p>-</p>`).appendTo($hash)
    }
    let $buyBnt = $(document.createElement('div')).attr({class: "col-4 col-md-2 flex "})
    let $btn = $(document.createElement('div')).attr({
        class: "more-btn marketlist-btn",
        lotId: value.nft_id
    }).text(localization.buy)
    $btn.appendTo($buyBnt)
    $mint.appendTo(parent)
    $price.appendTo(parent)
    $link.appendTo(parent)
    $hash.appendTo(parent)
    $buyBnt.appendTo(parent)
    return parent
}


export function openBoxLoader(value) {

    let openedBox = 0;
    const totalBox = value.length;
    let boxList = [];
    let parent = $(`<div class="modal-buy row">` +
        `<div id="listOpenBox" class="col-12"></div>` +
        `<button class="btn btn-buy btn-next">${localization.nextBox}</button></div>`);
    [].forEach.call(value, (item) => {
        let element = $(`<div class="col-12 col-md-4 col-lg-4 popAnimation"><div class="pricing-item"><div class="wraper"><a href="/item-details/${item.nft_product_id}"><img src="/src/${item.product_preview.result}" alt="none"></a><a href="/item-details/${item.nft_product_id}"><h4 class="pricing-item_name">${item.product_name.result}</h4></a><span class="g-text">${item.nft_minted_num}/${item.mint.result}</span><div class="pricing ">${localization.lowestPrice}: <span>${localization.currency}${item.nft_initial_price}</span></div></div></div></div>`)
        boxList.push(element);
    })

    $(parent).find('.btn-next')[0].addEventListener('click', () => {
        boxList[openedBox].appendTo($(parent).find('#listOpenBox'))
        openedBox += 1;
        if (openedBox === totalBox) {
            $(parent).find('.btn-next')[0].innerText = localization.openMore;
            $(parent).find('.btn-next')[0].onclick = () => {
                window.location.reload()
            }
        }

    })
    return parent

}

export function onLoadMore(newItems) {
    let $parents = []
    $.each(newItems, function (index, value) {
        let parent = document.createElement('div')
        parent.className = `col-12 col-md-4 col-lg-4 single_gallery_item ${value.product_game_id}`
        var $subparent = $('<div class="pricing-item market-item"></div>')
        var $wrapper = $('<div class="wraper"></div>')
        var $momentLink = $('<a></a>').attr({href: `/item-details/${value.product_id}`})
        var img = new Image()
        img.src = `/src/${value.product_preview_link}`
        img.alt = 'none'
        $(img).appendTo($momentLink)
        var $momentLink2 = $('<a></a>').attr({href: `/item-details/${value.product_id}`})
        $('<h4>').attr({class: 'pricing-item_name'}).text(value.product_name.slice(0, 1).toUpperCase() + value.product_name.slice(1)).appendTo($momentLink2)
        var $pricing = $(`<div class="pricing ">${localization.lowestPrice}:\u0020 </div>`)
        $('<span></span>').text(localization.currency + value.minimum_price ).appendTo($pricing)
        var $admire = $('<div class="admire"></div>')
        let $par = $('<a></a>').attr({href: `/profile/${value.product_streamer_id}`, class: 'adm'})
        $('<i class="fa fa-user"></i>').appendTo($par)
        $par.append($('<span ></span>').text(value.streamer_name))
        $par.appendTo($admire)
        $momentLink.appendTo($wrapper)
        $momentLink2.appendTo($wrapper)
        $(document.createElement('span')).attr({class: "g-text"}).text(`${localization.momentMint} ${value.mint}`).appendTo($wrapper)
        $pricing.appendTo($wrapper)
        $admire.appendTo($wrapper)
        $wrapper.appendTo($subparent)
        $subparent.appendTo(parent)
        value.product_categories_ids
        $parents.push({parent, gameId: value.product_game_id})


    })

    return $parents


}

export function buyDropLoader(drop) {
    let parent = $('<div id="modalBuyDropContent"  class="modal-buy row">' +
        '            <div class="closeModal"><i class="fas fa-times"></i></div>' +
        '            <div class="col-7 col-md-7">' +
        '                <img class="detailed-img" alt="none"/>' +
        '            </div>' +
        '            <div class="col-5 col-md-5 ">' +
        '                <div class="flex space-between dd-bg pd-p">' +
        '                    <div class="dropitem-info">' +
        '                        <div class="who-we-contant mb-15">' +
        '                            <h4 class="fadeInUp" data-wow-delay="0.3s"></h4>' +
        '                        </div>' +
        `                        <div class="flex mb-15"><span class="dropitem-price gradient-text mr-10p">${localization.currency}${drop.box_price}</span><span class="text-white">${drop.box_count} ${localization.total}</span>` +
        '                        </div>' +
        `                        <span class="text-white">${localization.include} ${drop.box_size} ${localization.moments}</span>` +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '            <div style="display: none" class="deposit-container">' +
        `                <p>${localization.depositText}</p>` +
        `                <a href="/my-profile/my-balance"><div class="btn btn-deposit">${localization.deposit}</div></a>` +
        '            </div>' +
        '            <button id="buyDropBTN" class="btn btn-buy"></button>' +
        '            <div id="buyDropBtnLoader" class="spinloader" style="display: none"></div>' +
        '        </div>')
    $(parent[0]).find('img.detailed-img').attr({src: `/src/${drop.box_image_path}`})
    if (lang === "ru") {
        $(parent[0]).find('h4.fadeInUp').text(drop.box_name_ru)
    } else if (lang === "en") {
        $(parent[0]).find('h4.fadeInUp').text(drop.box_name_en)
    }

    $(parent[0]).find('button.btn-buy').text(`${localization.buyFor} ${localization.currency}${drop.box_price}`)
    return parent
}

export function putOnSale(item) {
    return $(' <div id="putOnSaleContent" class="modal-buy">\n' +
        `            <form id="putOnSaleForm" class="row" nftId="${item.nft_minted_num}" productId="${item.nft_product_id}">\n` +
        '                <div class="closeModal"><i class="fas fa-times"></i></div>\n' +
        `                <h4 class="col-12">${localization.setPrice}</h4>\n` +
        '                <div class="col-6">\n' +
        `                    <h6>${localization.totalSellPrice}</h6>\n` +
        '                    <label class="flex">\n' +
        '                        <span class="w-text">$</span>\n' +
        `                        <input id="totalSellPrice" name="totalSellPrice" class="priceDisabled" type="number" placeholder="0" maxlength="24" value="0.10" disabled>\n` +
        '                    </label>\n' +
        '                </div>\n' +
        '                <div class="col-6">\n' +
        `                    <h6>${localization.lowestPrice}</h6>\n` +
        '                    <label class="flex">\n' +
        '                        <span class="w-text">$</span>\n' +
        `                        <input class="priceDisabled" type="number" placeholder="0" maxlength="24" value="2" disabled>\n` +
        '                    </label>\n' +
        '                </div>\n' +
        '\n' +
        '\n' +
        '                <label class="col-12 row">\n' +
        `                    <span class="col-1 currency">${localization.currency}</span>\n` +
        '                    <input id="sellPrice" type="text" name="sellPrice" class="col-11 currency-input" value="2" placeholder="10.00"/>\n' +
        '                </label>\n' +
        ' <div id="sellLoader" class="spinloader" style="display: none"></div>' +
        ' <p class="message error col-12"></p>' +
        `                <button id="sellNft" class="btn btn-buy" type="submit">${localization.sellFor} ${localization.currency}1.90</button>\n` +

        '            </form>\n' +
        '\n' +
        '        </div>\n')
}

export function onLoadMoreMyProfile(newItems) {
    let $parents = []
    $.each(newItems, function (index, value) {
        let parent = document.createElement('div')
        if (value.nft_onsale === 0) {
            parent.className = `col-12 col-md-4 col-lg-4 single_gallery_item collectable`
        } else if (value.nft_onsale === 1) {
            parent.className = `col-12 col-md-4 col-lg-4 single_gallery_item onsale`
        }
        let $subparent = $('<div class="pricing-item market-item onsale"></div>')
        var $wrapper = $('<div class="wraper"></div>')
        var $momentLink = $('<a></a>').attr({href: `/item-details/${value.nft_product_id}`})
        var img = new Image()
        img.src = `/src/${value.preview_link}`
        img.alt = 'none'
        $(img).appendTo($momentLink)
        var $momentLink2 = $('<a></a>').attr({href: `/item-details/${value.nft_product_id}`})
        $('<h4>').attr({class: 'pricing-item_name'}).text(value.product_name.slice(0, 1).toUpperCase() + value.product_name.slice(1)).appendTo($momentLink2)
        var $pricing = $(`<div class="pricing ">${localization.lowestPrice}:\u0020 </div>`)
        if (value.minimum_price !== null) {
            $('<span></span>').text(localization.currency + value.minimum_price).appendTo($pricing)
        } else {
            $('<span></span>').text("-").appendTo($pricing)
        }

        var $admire = $('  <div class="admire ">' +
            '                                            <div class="row">' +
            '                                                <div class="col-6 flex">' +
            `                                                    <a href="/profile/${value.nft_streamer_id}" class="adm"><i class="fa fa-user"></i>${value.user_name}</a>` +
            '                                                </div>' +
            '                                                <div class="col-6 flex">' +
            `                                                    <div class="btn putSale-btn">${localization.putOnSaleBtn}</div>` +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>')
        if (value.nft_onsale === 0) {
            $($admire).find('.putSale-btn')[0].innerText = localization.putOnSaleBtn
            $($admire).find('.putSale-btn')[0].classList = "btn putSale-btn"
            $($admire).find('.putSale-btn')[0].setAttribute('nftId', value.nft_id)
        } else if (value.nft_onsale === 1) {
            $($admire).find('.putSale-btn')[0].innerText = localization.cancelSale
            $($admire).find('.putSale-btn')[0].classList = "btn putSale-btn cancelSaleBtn"
            $($admire).find('.putSale-btn')[0].setAttribute('nftId', value.nft_id)
        }
        $momentLink.appendTo($wrapper)
        $momentLink2.appendTo($wrapper)
        $('<span class="g-text"></span>').text(`${value.nft_minted_num}/${value.mint}`).appendTo($wrapper)
        $pricing.appendTo($wrapper)
        $admire.appendTo($wrapper)
        $wrapper.appendTo($subparent)
        $subparent.appendTo(parent)
        value.product_categories_ids
        $parents.push({parent, gameId: value.nft_onsale})
    })
    if ($parents.length !== 0) {
        [].forEach.call($parents, function (elem) {
            let el = $(elem.parent).find('.putSale-btn');
            el[0].addEventListener('click', function (event) {
                el[0].getAttribute("nftId")
                $('#modalBuyContent').find('.priceDisabled')
                openModal($('#putOnSale'))
                if ($(`#putOnSaleContent`)) {
                    $('#putOnSaleContent').click(function (event) {
                        event.stopPropagation()
                    })
                }
                if ($('.closeModal')) {
                    $('.closeModal').click(function (event) {
                        closeModal($('.modal-bg'))
                    })
                }
            })
        })
    }
    return $parents
}

export function daysNumToStr(n,inFuture) {
    const tens = Math.abs(n) % 100
    const units = tens % 10
    if (tens === 0) {
        if (inFuture){
           return `${localization.today} ${localization.in}`
        }else {
            return `${localization.today}`
        }

    }
    if (tens > 10 && tens <= 20) {
        if (inFuture){
            return `${localization.in} ${n} ${localization.manyDaysSoon}`
        }else {
            return `${n} ${localization.manyDaysAgo}`
        }
    }
    if (units > 1 && units < 5) {
        if (inFuture){
            return `${localization.in} ${n} ${localization.someDaysSoon}`
        }else {
            return `${n} ${localization.someDaysAgo}`
        }
    }
    if (units === 1) {
        if (inFuture){
            return `${localization.in} ${n} ${localization.daySoon}`
        }else {
            return `${n} ${localization.dayAgo}`
        }
    }
    if (inFuture){
        return `${localization.in} ${n} ${localization.manyDaysSoon}`
    }else {
        return `${n} ${localization.manyDaysAgo}`
    }
}


export function dayParser(date) {
    let dateCreated = new Date(date.replace(/-/g, "/"));
    let dateNow = Date.now();
    let timeDiff = dateNow - dateCreated.getTime();
    let dateDiff = timeDiff / (1000 * 3600 * 24)
    return Math.trunc(dateDiff)
}
