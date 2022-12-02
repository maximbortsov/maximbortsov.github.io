import {localization} from "./constants.js"
import {openModal, closeModal} from "./additionalFunctions.js?load=1900";
import {sendPayment} from "./apiReqest.js?load=1000";
export default function ($) {
    'use strict'

    let hasDot = false
    $(document).ready(function (){

        $('#paymentForm').validate({
            rules:{
                amount:{
                    required: true,
                    amount: 1
                }
            },
            messages:{
                amount:{
                    required: localization.selectAmount,
                    amount: `${localization.minAmount} ${localization.currency}1`,
                }
            }

        })
        $('#depositAmount')[0].oninput = () => {
            $('#depositAmount')[0].value = $('#depositAmount')[0].value.replace(/[A-Za-zА-Яа-яЁё/#$%^@!&*(){}\\_=\-`~]/, '')
            if (hasDot) {

                let pos = $('#depositAmount')[0].value.indexOf('.')
                let firstPart = $('#depositAmount')[0].value.slice(0, pos + 1)
                let secondPart = $('#depositAmount')[0].value.slice(pos + 1)
                secondPart = secondPart.replace(/[,.]/, '')
                $('#depositAmount')[0].value = firstPart + secondPart

            } else {
                $('#depositAmount')[0].value = $('#depositAmount')[0].value.replace(/[,]/, '.')
            }
            if ($('#depositAmount')[0].value.indexOf('.') !== -1) {
                hasDot = true
            } else {
                hasDot = false
            }
            let amount = $('#depositAmount')[0].value
            if (!amount) {
                $('#totalDeposit')[0].value = localization.currency +  '0.00'
            } else {
                $('#totalDeposit')[0].value = `${localization.currency}${(Number.parseFloat(amount)).toFixed(2)}`
            }
        }
        [].forEach.call($('.depositFixedAmount'), function (el) {
            $(el).on('click', () => {
                let newAmount = el.textContent.replace(localization.currency, '')
                $('#depositAmount')[0].value = newAmount
                $('#depositAmount').trigger('input')
            })
        })
        $("#cardNumber").mask("9999 9999 9999 9999")
        $('#cvcNumber').mask("999")
        $('#depositBTN').on("click", () => {

            openModal($('#modalDeposit'))
        })

        $('#modalDeposit').on("click", () => {
            closeModal($('#modalDeposit'))
        })
        $('#modalDepositContent').on('click', (e) => {
            e.stopPropagation()
        })
        $('.closeModal').click(function (event) {
            closeModal($('.modal-bg'))
        })
        $('#paymentForm').on('submit', (event)=>{
            if( $('#paymentForm').valid()){
                event.preventDefault();
                $('#goPayoutLoader')[0].style.display = 'block'
                $('.deposit-btn')[0].style.display = 'none'
                sendPayment($('#totalDeposit')[0].value).then(response =>{
                    if (response.error !== null) {
                        console.log(response.error)
                    } else {
                        if(response.result!==undefined){
                            document.location.href = response.result;
                        } else {
                            $('#goPayoutLoader')[0].style.display = 'none'
                            $('.deposit-btn')[0].style.display = 'block'
                            $('.message')[0].innerText = `${localization.payoutError}`
                        }
                    }
                }).catch(err =>{
                    $('#goPayoutLoader')[0].style.display = 'none'
                    $('.deposit-btn')[0].style.display = 'block'
                    $('.message')[0].innerText = `${localization.payoutError}`
                    console.log(err)
                })
            }

        })
    })

}