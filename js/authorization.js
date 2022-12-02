//Регистрация

export default function ($){
    'use strict'
    $(document).ready(function (){
        $("#signup_form").on('submit', function (e){

            if($("#signup_form").valid()){
                e.preventDefault();

                let name = $('#name').val();
                let email = $('#signupEmail').val();
                let password = $('#signupPassword').val();
                let repeatPassword = $('#repeatSignupPassword').val();
                let checkbox = $('#checkbox').is(":checked");

                $.ajax({
                    url: "../vendor/sign_up.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        name: name,
                        email: email,
                        password: password,
                        repeatPassword: repeatPassword,
                        checkbox: checkbox ? 1 : 0
                    },
                    success (data){
                        if (data.status){
                            document.location.href = '../confirmation';
                        }
                        else {
                            if (data.type === 1){
                            }
                            console.log(data.message)
                            $('.message').css('display', 'block').text(data.message);
                        }
                    },
                    error: function (exception)
                    {
                        console.log(exception);
                    }
                });
            }
        });

//Авторизация
        $("#login_form").on('submit', function (e){
            if($("#login_form").valid()){
                e.preventDefault();

                let email = $('#loginEmail').val();
                let password = $('#loginPassword').val();

                $.ajax({
                    url: "../vendor/sign_in.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        email: email,
                        password: password
                    },
                    success (data){
                        if (data.status){
                            document.location.href = '../my-profile';
                        }
                        else {
                            if (data['message'] === "Неподтвержден!"){
                                document.location.href = '../confirmation';
                            }

                            $('.message').css('display', 'block').text(data.message);
                        }
                    },
                    error: function (exception)
                    {
                        console.log(exception);
                    }
                });

            }


        });
    })

}


