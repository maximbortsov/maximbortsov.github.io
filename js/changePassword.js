import {localization} from "./constants.js?load=400"


export default function ($){
    'use strict'
    console.log('load')
    $(document).ready(function (){
        $('#changePasswordForm').validate({
            rules: {
                newPassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 24,
                    regex: "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{6,24}"
                },
                newRepeatPassword: {
                    minlength: 6,
                    maxlength: 24,
                    equalTo: "#recoverPassword"
                },

            }
            , messages: {
                newPassword: {
                    required: localization.fieldRequired,
                    minlength: `${localization.minSign} 6`,
                    maxlength: `${localization.maxSign} 24`,
                    regex: localization.passwordRegExp
                },
                newRepeatPassword: {
                    required: localization.fieldRequired,
                    equalTo: localization.passwordNotEqual
                },
            }
        })
        $('#recoverPasswordForm').validate({
            rules: {
                email: {
                    required: true,
                    regex: "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
                }
            },
            messages: {
                email: {
                    required: localization.fieldRequired,
                    regex: localization.emailIncorrect
                }
            }
        })
//смена пароля
        $('#changePasswordForm').on('submit', async function (e) {
            console.log('a')
            if ($('#changePasswordForm').valid()) {
                e.preventDefault();
                let url = window.location.pathname;
                url = url.split('/');
                let token = url[2];
                let password = $('#recoverPassword').val();
                let repeatPassword = $('#repeatRecoverPassword').val();
                const data = new FormData()
                data.append("token", token)
                data.append("password", password)
                data.append("repeatPassword", repeatPassword)
                let response = await fetch("/vendor/change_password.php", {
                    method: 'POST',
                    body: data
                })
                if (response.ok){
                    const data = await response.json()
                    console.log(data)
                    if (data.status){
                        document.location.href = '/signup';
                    } else{
                        $('.message').css('display', 'block').text(data.message);
                    }
                } else{
                    console.log(`Error ${response.status}`)
                }
            }
        });

//ввод почты
        $('#recoverPasswordForm').on('submit', async function (e) {
            if ($('#recoverPasswordForm').valid()) {
                e.preventDefault();

                let email = $('#name').val();
                const data = new FormData();
                data.append('email', email.toString())
                console.log(data)
                let response = await fetch("/vendor/event_to_change_password.php",
                    {
                        method: 'POST',
                        body: data
                    })
                if (response.ok){
                    const data = await response.json()
                    if (data.status) {
                        console.log('true');
                        document.location.href = '/changepasswordmsg';
                    } else {
                        console.log('else');
                        $('.message').css('display', 'block').text(data.message);
                        // $('#name').setCustomValidity('Введите корректную почту');
                    }
                }  else{
                    console.log(`Server error: ${response.status}`)
                }
            }
        });
    })
}
