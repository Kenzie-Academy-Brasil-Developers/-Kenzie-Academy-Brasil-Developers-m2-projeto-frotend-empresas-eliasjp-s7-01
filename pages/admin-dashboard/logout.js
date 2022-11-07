import { removeLocal } from "../../src/scripts/storage.js"

function logoutEvent (){
    const button = document.querySelector(`.logout`)

    button.addEventListener(`click`, () => {
        removeLocal ("user_token")
        window.location.assign("../../index.html", "_self")
    })
}

logoutEvent ()