import {getPackItem, buyBoxRequest} from "./apiReqest.js?load=77"
import {buyDropLoader, openModal, closeModal, openBoxLoader} from "./additionalFunctions.js?load=1900"

export default function ($){
    'use strict'
    $(document).ready(function (){
            $('#modalBuyDrop').click(function (event) {
                closeModal($('#modalBuyDrop'))
            })
            $('#modalBuyDropContent').click(function (event) {
                event.stopPropagation()
            })
        getPackItem().then(response => {
            if (response.error !== null) {
                console.log(response.error)
            } else {
                $('#modalBuyDrop').append(buyDropLoader(response.result))
                $('#buyDropBtn').click(() => {
                    openModal($('#modalBuyDrop'))
                })
                $('#modalBuyDropContent').click(function (event) {
                    event.stopPropagation()
                })
                $('.closeModal').click(function (event) {
                    closeModal($('.modal-bg'))
                })
                if($('#buyDropBTN')[0]!==undefined){

                    $('#buyDropBTN').click(()=>{
                        $('#buyDropBtnLoader')[0].style.display = 'inline-block'
                        $('#buyDropBTN')[0].style.display='none';
                        buyBoxRequest().then((response)=>{
                            if (response.error === 'Недостаточно средств'){
                                $('.deposit-container')[0].style.display ='flex';

                            } else if (response.error === 'Не авторизован'){
                                window.location.href = '/signup';
                            }
                            else if (response.error === 'Ошибка присваивания nft'){
                                $('.closeModal').trigger('click')
                            }
                            else {
                                $('.closeModal').trigger('click')
                                $('#modalOpenBox').append(openBoxLoader(response.result))
                                openModal($('#modalOpenBox'))
                                $('.btn-next').trigger('click');
                            }
                            $('#buyDropBtnLoader')[0].style.display = 'none'
                            $('#buyDropBTN')[0].style.display='block';
                        })
                            .catch(err=>{
                                console.log(err)
                            })
                    })

                }
            }

        }).catch(er => {
            console.log(er)
        })
    })

}