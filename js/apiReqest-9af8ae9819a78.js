import {controller, localization} from "./constants.js?load=100";

'use strict'


export async function getProfileItems(count, categoryId, streamerId) {
    let response = await fetch(`/api/json/product_json.php?func=getProductsByStreamerIdAndCategoryId`, {
        method: "POST",
        body: JSON.stringify({
            "streamerId": streamerId,
            "count": count,
            "categoryId": categoryId
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return ("Ошибка HTTP: " + response.status)
    }
}

export async function changePassword(){
    let response = await fetch('/api/json/user_json.php?func=updatePassword', {
        method: "POST",
        body: JSON.stringify({
            "newPassword": $('#changePasswordFormProfile')[0][1].value,
            "repeatPassword": $('#changePasswordFormProfile')[0][2].value,
            "oldPassword": $('#changePasswordFormProfile')[0][0].value
        })
    })
    if (response.ok) {
        return response.json()
    } else {
        return `Ошибка HTTP: ${response.status}`
    }
}

export async function getPackItem() {
    let url = window.location.pathname.split('/')
    let response = await fetch('/api/json/box_json.php?func=getBoxById', {
        method: "POST",
        body: JSON.stringify({
            "boxId": url[2]
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса ${response.status}`
    }
}

export async function getMyProfileItemsByTypes(count, type) {
    let response = await fetch(`/api/json/nft_json.php?func=getNFTbyType`, {
        method: "POST",
        body: JSON.stringify({
            "count": count,
            "type": type.slice(1),
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка HTTP : ${response.status}`
    }
}

export async function getBoxesByStreamer(count, streamerId) {
    let response = await fetch(`/api/json/box_json.php?func=getBoxesByStreamerId`, {
        method: "POST",
        body: JSON.stringify({
            count: count,
            streamerId: streamerId
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `HTTP error - ${response.status}`
    }
}

export async function sendPayment(amount) {
    let total = amount.slice(1, amount.length);
    let response = await fetch('/api/json/payment_json.php?func=topUpToUser', {
        method: "POST",
        body: JSON.stringify({
            "amount": parseFloat(total),
            "currency": "USD"
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}

export async function getProductDetail() {
    let url = window.location.pathname.split('/')

    let response = await fetch('/api/json/product_json.php?func=getProductById', {
        method: "POST",
        body: JSON.stringify({
            "productId": url[2]
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}

export async function buyBoxRequest() {
    let boxId = window.location.pathname.split('/')

    let response = await fetch('/api/json/box_json.php?func=buyBox', {
        method: "POST",
        body: JSON.stringify({
            "boxId": boxId[2]
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}


export async function buyNFTRequest(nftdata) {
    let response = await fetch('/api/json/nft_json.php?func=buyNft', {
        method: "POST",
        body: JSON.stringify({
            "productId": nftdata.nft_product_id,
            "mintedNum": nftdata.nft_minted_num,
            "userId": nftdata.nft_user_id
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}
export async function getProfileList() {
    let url = window.location.pathname.split('/')
    let response = await fetch('/api/json/nft_json.php?func=getNftByUserId', {
        method: "POST",
        body: JSON.stringify({
            "id": url[2],
            "startId": 1,
            "count": 2
        })
    })
    if (response.ok) {
        return response.json()
    } else {
        return `Request error - ${response.status}`
    }
}


export async function getMarketplaceList(count, gameId) {
    let response = await fetch('/api/json/product_json.php?func=getProductsByGameId', {
        method: "POST",
        body: JSON.stringify({
            count: count,
            gameId: gameId,
        })
    })
    if (response.ok) {
        return response.json()
    } else {
        return `Request error - ${response.status}`
    }

}

export async function getPopularItems() {
    let response = await fetch('/api/json/product_json.php?func=getPopularProducts', {
        method: "POST",
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}

export async function getSalesList() {
    let url = window.location.pathname.split('/')
    let response = await fetch('/api/json/nft_json.php?func=getNftsByProductId', {
        method: "POST",
        body: JSON.stringify({
            "productId": url[2]
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}

export async function withdrawMoment(mintedNum, productId) {
    let response = await fetch('/api/json/nft_json.php?func=sendForCollection',{
        method: "POST",
        body: JSON.stringify({
            mintedNum: mintedNum,
            productId: productId
        })
    })
    if (response.ok){
        return response.json()
    } else{
        return `Ошибка запроса - ${response.status}`
    }
}

export async function sellNft(price, mintedNum, productId) {

    let response =await fetch('/api/json/nft_json.php?func=sendForSale', {
        method: "POST",
        body: JSON.stringify({
            "productId": productId,
            "mintedNum": mintedNum,
            "price":price
        })
    })
    if (response.ok) {
        return await response.json()
    } else{
        return `Ошибка запроса - ${response.status}`
    }
}

export async function getLot(nftId) {
    let response = await fetch('/api/json/nft_json.php?func=getNftById', {
        method: "POST",
        body: JSON.stringify({
            "nftId": nftId
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}

export async function connectCryptoWallet(walletAddress) {
    let response = await fetch('/api/json/user_json.php?func=updateWalletAddress',{
        method: "POST",
        body: JSON.stringify({
            "walletAddress": walletAddress
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}

export async function getSearchItems(count) {
    let searchName = $('#search')[0].value;

    await getSearchResult(count, searchName).then(function (response) {
        if (response.error !== null) {
            console.log(response.error)
        } else {
            let newItems = onLoadMore(response.result);
            if (response.length < 6) {
                $('#loadMoreBtn')[0].style.display = 'none';
            }
            [].forEach.call(newItems, async function (value) {
                await $(value.parent).imagesLoaded(function () {
                    $('#marketplaceList').append(value.parent)
                        .isotope('appended', value.parent)
                        .isotope('layout');
                })

            })
            count += response.length

        }

    }).catch(err => {
        console.log(err)
    })
    return await Promise.resolve(count)
}

export async function addSearchList(searchinput) {
    let results = [];
    await getSearchResult(0, searchinput[0].value).then(function (response) {
        if (response.error !== null) {
            console.log(response.error)
        } else {
            if (response.result.length > 0) {
                [].forEach.call(response.result, function (value, index) {
                    results.push($(`<li><a href="/item-details/${value.product_id}"><p>${value.product_name}</p> <p>${localization.by} ${value.streamer_name}</p><a/></li>`))
                })
            } else {
                results.push($(`<li><a><p>No search result</p><a/></li>`))
                $('#searchBtn')[0].setAttribute('disabled', true)
            }
        }
    }).catch(err => {
        console.log(err)
    })
    return await Promise.resolve(results)
}

export async function getAllNftByProduct() {
    try {
        let url = window.location.pathname.split('/')
        let response = await fetch('/api/json/nft_json.php?func=getAllNftByProductId',{
            method: "POST",
            body: JSON.stringify({
                "productId": url[2]
            })
        })
        if (response.ok) {
            return await response.json()
        }else{
            return `Error : ${response.status}`
        }

    }
    catch (e){
        console.log(e)
    }
}

export async function getSearchResult(count, searchName) {
    try {
        let response = await fetch('/api/json/product_json.php?func=findProductsByProductName', {
            method: "POST",
            body: JSON.stringify({
                count: count,
                productName: searchName
            }),
            signal: controller.signal
        })
        if (response.ok) {
            return await response.json()
        } else {
            return `error - ${response.status}`
        }
    } catch (err) {
        if (err.name == 'AbortError') {
            console.log("Prervano")
        } else {
            throw err
        }
    }
}

export async function getTopPacks(count) {
    let response = await fetch('/api/json/box_json.php?func=getSomeBoxes', {
        method: "POST",
        body: JSON.stringify({
            "count": count
        })
    })
    if (response.ok) {
        return await response.json()
    } else {
        return `Ошибка запроса - ${response.status}`
    }
}
