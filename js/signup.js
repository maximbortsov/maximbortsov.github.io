import {activeStyle, deActiveStyle, localization} from "./constants.js?load=500"
export default function ($){
    'use strict'

    function active(el) {
        el.css(activeStyle)
    }

    function deActive(el) {
        el.css(deActiveStyle)
    }

    $(document).ready(function () {
            active($('#loginBtn'))
            $('#signupBtn').click(function (e) {
                $('#signup').css('display', ' flex')
                $('#login').css('display', ' none')
                active($('#signupBtn'))
                deActive($('#loginBtn'))
            })
            $('#loginBtn').click(function (e) {
                $('#login').css('display', 'flex')
                $('#signup').css('display', ' none')
                active($('#loginBtn'))
                deActive($('#signupBtn'))
            })
            $("#login_form").validate({
                rules: {
                    email: {
                        required: true,
                        regex:"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
                    },
                    password: {
                        required: true,
                        maxlength: 24,
                    },
                },
                messages: {
                    email: {
                        required: localization.fieldRequired,
                        regex: localization.emailIncorrect
                    },
                    password: {
                        required: localization.fieldRequired,
                    },
                }
            })
            $("#signup_form").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 3,
                        maxlength: 16,
                    },
                    email: {
                        required: true,
                        regex:"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])",
                    },
                    password: {
                        required: true,
                        minlength: 6,
                        maxlength: 24,
                        regex:  "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{6,24}"
                    },
                    repeatPassword: {
                        minlength: 6,
                        maxlength: 24,
                        equalTo: "#signupPassword"
                    },
                    checkbox: {
                        required: true
                    },
                    checkboxPersonal: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: localization.fieldRequired,
                        minlength: `${localization.minSign} 3`,
                        maxlength: `${localization.maxSign} 16`,
                    },
                    email: {
                        required: localization.fieldRequired,
                        regex: localization.emailIncorrect
                    },
                    password: {
                        required: localization.fieldRequired,
                        minlength: `${localization.minSign} 6`,
                        maxlength: `${localization.maxSign} 24`,
                        regex: localization.passwordRegExp
                    },
                    repeatPassword: {
                        required: localization.fieldRequired,
                        equalTo: localization.passwordNotEqual
                    },
                    checkbox: {
                        required: localization.acceptTOS
                    },
                    checkboxPersonal: {
                        required: localization.acceptTOS
                    }
                },
            })
        }
    )
}