import {localization} from "./constants.js?load=240";

export default function ($){
    'use strict'
    $(document).ready(function (){
        console.log('load')
        $("#offerForm").validate({
            rules: {
                email: {
                    required: true,
                    regex:"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
                },
                fio:{
                    required: true,
                },
                twitchLink:{
                    required: true,
                },
                checkbox: {
                    required: true
                },
                checkboxPersonal: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: localization.fieldRequired,
                    regex: localization.emailIncorrect
                },
                checkbox: {
                    required: localization.acceptPolicy
                },
                checkboxPersonal: {
                    required: localization.acceptTOS
                },
                fio: {
                    required: localization.fieldRequired
                },
                twitchLink: {
                    required: localization.fieldRequired
                }
            }
        })
        $("#offerForm").on('submit', async function (e){

            if($("#offerForm").valid()){
                e.preventDefault();
                let email = $('#email').val();
                let checkbox = $('#checkbox').is(":checked");
                let checkboxPersonal = $('#checkboxPersonal').is(":checked");
                let fio = $('#fio').val();
                let twitchLink = $('#twitchLink').val();

                const data = new FormData();
                data.append('email', email.toString());
                data.append('checkbox', checkbox.toString());
                data.append('checkboxPersonal', checkboxPersonal.toString());
                data.append('fio', fio.toString());
                data.append('twitchLink', twitchLink.toString());
                console.log(data);

                let response = await fetch("/vendor/offer.php",
                    {
                        method: 'POST',
                        body: data
                    })
                if (response.ok){
                    const data = await response.json()
                    if (data.status) {
                        console.log('true');
                        document.location.href = '/';
                    } else {
                        console.log('else');
                        $('.message').css('display', 'block').text(data.message);
                    }
                }  else{
                    console.log(`Server error: ${response.status}`)
                }
            }
        });
    })
}