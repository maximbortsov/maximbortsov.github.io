import {
    getMyProfileItemsByTypes,
    changePassword,
    getLot,
    sellNft, withdrawMoment, connectCryptoWallet
} from "./apiReqest.js?load=200"
import {onLoadMoreMyProfile, closeModal, openModal, putOnSale, cancelSale} from "./additionalFunctions.js?load=2200"
import {localization} from "./constants.js?load=600"

export default function ($) {
    'use strict'
    $(document).ready(function () {
            let loadCollectableItem = 0;
            let loadSaleItem = 0;
            $('#openEditProfile').click(() => {
                openModal($('#editUser'))
            })
            $('#editUser').click(() => {
                closeModal($('#editUser'))
            })
            $('#editUserContent').click(function (event) {
                event.stopPropagation()
            })
            $('#openCryptoWalletConnect').click(() => {
                openModal($('#connectWallet'))
            })
            $('#connectWallet').click(() => {
                closeModal($('#connectWallet'))
            })
            $('#connectWalletContent').click(function (event) {
                event.stopPropagation()
            })
            $('.closeModal').click(function (event) {
                closeModal($('.modal-bg'))
            })
            $('#putOnSaleContent').click(function (event) {
                event.stopPropagation()
            })
            $('#putOnSale').click(function (event) {
                closeModal($('#putOnSale'))
            })
        // $('#walletNumberDiv').click(function (event) {
        //     navigator.clipboard.writeText($('#walletNumberSpan').innerHTML)
        //     alert('log')
        // })
            $('#loadMoreMyProfile').click(() => {
                let categ = $(".active")[0].getAttribute('data-filter')
                $('#loadMoreMyProfileLoader')[0].style.display = 'block';
                $('#loadMoreMyProfile')[0].style.display = 'none';
                if (categ === ".collectable") {
                    getMyProfileItemsByTypes(loadCollectableItem, categ).then(response => {
                        if (response.error !== null) {
                            console.log(response.error)
                        } else {
                            let items = onLoadMoreMyProfile(response.result);
                            if (items.length < 8) {
                                $('#loadMoreMyProfile')[0].style.visibility = 'hidden'
                            }
                            if (items.length === 0 && loadCollectableItem === 0) {
                                $('.message')[0].style.display = 'block';
                                $('.message')[0].innerText = localization.noItems;
                            }


                            [].forEach.call(items, async function (value) {
                                await $(value.parent).imagesLoaded(function () {
                                    $('#myProfileList').append(value.parent)
                                        .isotope('appended', value.parent)
                                        .isotope('layout');

                                })
                                loadCollectableItem += 1;
                                if ($('.putSale-btn')) {
                                    [].forEach.call($('.putSale-btn'), function (el) {
                                        el.addEventListener('click', function (event) {
                                            getLot(el.getAttribute("nftid")).then((response) => {
                                                $('#putOnSaleContent').replaceWith(putOnSale(response.result))
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
                                                $('#putOnSaleForm').validate({
                                                    rules: {
                                                        sellPrice: {
                                                            required: true,
                                                            amount: 2,
                                                            maxAmount: 100000000
                                                        }
                                                    },
                                                    messages: {
                                                        sellPrice: {
                                                            required: localization.selectAmount,
                                                            amount: localization.minAmount +localization.currency + " 2" ,
                                                            maxAmount: localization.maxAmount
                                                        }
                                                    }

                                                })
                                                let hasDot = false
                                                $('#sellPrice')[0].oninput = () => {
                                                    $('#sellPrice')[0].value = $('#sellPrice')[0].value.replace(/[A-Za-zА-Яа-яЁё/#$%^@!&*(){}\\_=\-`~]/, '')
                                                    if (hasDot) {

                                                        let pos = $('#sellPrice')[0].value.indexOf('.')
                                                        let firstPart = $('#sellPrice')[0].value.slice(0, pos + 1)
                                                        let secondPart = $('#sellPrice')[0].value.slice(pos + 1)
                                                        secondPart = secondPart.replace(/[,.]/, '')
                                                        $('#sellPrice')[0].value = firstPart + secondPart

                                                    } else {
                                                        $('#sellPrice')[0].value = $('#sellPrice')[0].value.replace(/[,]/, '.')
                                                    }
                                                    if ($('#sellPrice')[0].value.indexOf('.') !== -1) {
                                                        hasDot = true
                                                    } else {
                                                        hasDot = false
                                                    }
                                                    let sellPrice = $('#sellPrice')[0].value
                                                    if (!sellPrice) {
                                                        $('#totalSellPrice')[0].value =localization.currency  + '0.00'
                                                    } else {
                                                        $('#totalSellPrice')[0].value = `${(Number.parseFloat(sellPrice) * 0.05).toFixed(2)}`
                                                    }
                                                    $('#sellNft')[0].innerText = `${localization.sellFor} ${localization.currency}${(Number.parseFloat(sellPrice) - (Number.parseFloat(sellPrice) * 0.05)).toFixed(2)}`

                                                }
                                                $('#putOnSaleForm').on('submit', (event) => {
                                                    if ($('#putOnSaleForm').valid()) {
                                                        event.preventDefault();
                                                        $('#sellLoader')[0].style.display = 'block'
                                                        $('#sellNft')[0].style.display = 'none'
                                                        sellNft($('#sellPrice')[0].value, $('#putOnSaleForm')[0].getAttribute('nftId'), $('#putOnSaleForm')[0].getAttribute('productId')).then(response => {
                                                            if (response.error !== null) {
                                                                $('#sellLoader')[0].style.display = 'none'
                                                                $('#sellNft')[0].style.display = 'block'
                                                                $('#putOnSaleForm .message')[0].innerText = `${response.error}`
                                                                $('#putOnSaleForm .message')[0].style.display = "block"
                                                            } else {
                                                                if (response.result !== undefined) {
                                                                    $('#putOnSaleForm').replaceWith($(`<p class="text-white">${localization.lotCreated}</p>`))
                                                                    setTimeout(()=>{document.location.reload()}, 1000)
                                                                } else {
                                                                    $('#sellLoader')[0].style.display = 'none'
                                                                    $('#sellNft')[0].style.display = 'block'
                                                                    $('#putOnSaleForm .message')[0].innerText = `${localization.payoutError}`
                                                                    $('#putOnSaleForm .message')[0].style.display = "block"
                                                                }
                                                            }
                                                        }).catch(err => {
                                                            $('#sellLoader')[0].style.display = 'none'
                                                            $('#sellNft')[0].style.display = 'block'
                                                            $('.message')[0].innerText = `${localization.payoutError}`
                                                            console.log(err)
                                                        })
                                                    }

                                                })
                                            }).catch((er) => {
                                                console.log(er)

                                            })
                                        })
                                    })
                                }
                            })
                            $('#loadMoreMyProfileLoader')[0].style.display = 'none';
                            $('#loadMoreMyProfile')[0].style.display = 'inline-block'
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else if (categ === ".onsale") {
                    getMyProfileItemsByTypes(loadSaleItem, categ).then(response => {
                        if (response.error !== null) {
                            console.log(response.error)
                        } else {
                            let items = onLoadMoreMyProfile(response.result);
                            if (items.length < 8) {
                                $('#loadMoreMyProfile')[0].style.visibility = 'hidden'
                            }
                            if (items.length === 0 && loadSaleItem === 0) {
                                $('.message')[0].innerText = localization.noItems;
                                $('.message')[0].style.display = 'block';
                            }


                            [].forEach.call(items, async function (value) {
                                await $(value.parent).imagesLoaded(function () {
                                    value.parent.className = "col-12 col-md-4 col-lg-4 single_gallery_item onsale"
                                    $('#myProfileList').append(value.parent)
                                        .isotope('appended', value.parent)
                                        .isotope('layout');
                                })
                                if ($('.putSale-btn')) {
                                    [].forEach.call($('.putSale-btn'), function (el) {
                                            el.addEventListener('click', function (event) {
                                                getLot(el.getAttribute("nftid")).then((response) => {
                                                    $('#putOnSaleContent').replaceWith(cancelSale(response.result))
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
                                                    $('#withdrawMoment').on('click', (event) => {
                                                        event.preventDefault();
                                                        $('#withdrawMomentLoader')[0].style.display = 'block'
                                                        $('#withdrawMoment')[0].style.display = 'none'
                                                        withdrawMoment($('#cancelSaleForm')[0].getAttribute('nftId'), $('#cancelSaleForm')[0].getAttribute('productId')).then(response => {
                                                            if (response.error !== null) {
                                                                console.log(response.error)
                                                            } else {
                                                                if (response.result !== undefined) {
                                                                    document.location.reload();
                                                                } else {
                                                                    $('#withdrawMomentLoader')[0].style.display = 'none'
                                                                    $('#withdrawMoment')[0].style.display = 'block'
                                                                    $('.message')[0].innerText = `${localization.payoutError}`
                                                                }
                                                            }
                                                        }).catch(err => {
                                                            $('#withdrawMomentLoader')[0].style.display = 'none'
                                                            $('#withdrawMoment')[0].style.display = 'block'
                                                            $('.message')[0].innerText = `${localization.payoutError}`
                                                            console.log(err)
                                                        })


                                                    })
                                                }).catch((er) => {
                                                    console.log(er)

                                                })
                                            })
                                        }
                                    )
                                }
                                loadSaleItem += 1;
                            })
                            $('#loadMoreMyProfileLoader')[0].style.display = 'none';
                            $('#loadMoreMyProfile')[0].style.display = 'inline-block';
                        }

                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
            $('#loadMoreMyProfile').trigger('click');
            $('#changePasswordFormProfile').submit((event) => {
                if ( $('#changePasswordFormProfile').valid()){
                    let hasError = false;
                    event.preventDefault();
                    [].forEach.call($('#changePasswordFormProfile').find('input'), (value) => {
                        for (let [key, vals] of Object.entries(value.classList)) {
                            if (vals === 'error') {
                                hasError = true
                            }
                        }
                    })
                    if (!hasError) {
                        changePassword().then((response) => {
                            if (response.result === null) {
                                $('.message')[0].innerText = response.error;
                            } else {
                                window.location.reload()
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }

                }

            })
            $('#connectWalletForm').submit((event)=>{
                event.preventDefault();
                if ($('#connectWalletForm').valid()){
                    connectCryptoWallet($('#connectWalletForm').find('input')[0].value).then(
                        (response)=>{
                            if (response.error!==undefined){
                                window.location.reload()
                            }else{
                                $('#connectWalletForm .message')[0].innerText = response.message
                            }
                        }
                    )
                }
            })
            $('#changePasswordFormProfile').validate({
                rules: {
                    old_password: {
                        required: true,
                    },
                    new_password: {
                        required: true,
                        minlength: 6,
                        maxlength: 24,
                        regex: "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{6,24}"
                    },
                    new_password_confirm: {
                        minlength: 6,
                        maxlength: 24,
                        equalTo: "#new_password"
                    }
                },
                messages: {
                    old_password: {
                        required: localization.fieldRequired,
                    },
                    new_password: {
                        required: localization.fieldRequired,
                        minlength: `${localization.minSign} 6`,
                        maxlength: `${localization.maxSign} 24`,
                        regex: localization.passwordRegExp
                    },
                    new_password_confirm: {
                        required: localization.fieldRequired,
                        equalTo: localization.passwordNotEqual
                    },
                }
            })
        $('#connectWalletForm').validate({
            rules: {
                cryptoWallet:{
                    required: true,
                    minlength: 42,
                    maxlength: 42
                }
            },
            messages: {
                cryptoWallet: {
                    required: localization.fieldRequired,
                    minlength: `${localization.minSign} 42`,
                    maxlength: `${localization.maxSign} 42`,
                }
            }
        })

        }
    )
}
