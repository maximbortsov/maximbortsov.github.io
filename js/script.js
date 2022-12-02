import "./constants.js?load=100"
import general from "./general.js?load=500"
import profile from "./profile.js?load=100"
import main from "./main.js?load=2000"
import myProfile from "./myProfile.js?load=900"
import signup from "./signup.js?load=500"
import authorization from "./authorization.js";
import boxDetail from "./boxDetail.js?load=400";
import itemDetail from "./itemDetail.js?load=1100";
import changePassword from "./changePassword.js?load=2100";
import myBalance from "./myBalance.js?load=400";
import marketplace from "./marketplace.js?load=600";
import offer from "./offer.js?load=702";

'use strict'

general(jQuery)
const url = window.location.pathname.split('/')
console.log(url[1])
switch (url[1]) {
    case "profile":
        profile(jQuery)
        break
    case "my-profile":
        if (url[2] === "my-balance") {
            myBalance(jQuery)
        } else {
            myProfile(jQuery)
        }
        break
    case "marketplace":
        marketplace(jQuery)
        break
    case "signup":
        signup(jQuery)
        authorization(jQuery)
        break
    case "drop-item":
        boxDetail(jQuery)
        break
    case "item-details":
        itemDetail(jQuery)
        break
    case "recoverpassword":
        changePassword(jQuery)
        break
    case "changepassword":
        changePassword(jQuery)
        break
    case "offer":
        offer(jQuery)
        break
    default:
        main(jQuery)
        break
}


