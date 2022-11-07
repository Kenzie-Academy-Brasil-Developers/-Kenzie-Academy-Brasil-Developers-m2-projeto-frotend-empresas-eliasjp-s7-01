import { loginAccount, userType } from "../../src/scripts/api.js"
import { setLocal } from "../../src/scripts/storage.js"
import { toastfy } from "../../src/scripts/toastfy.js"

function loginForm (){
    const form = document.querySelector(`#login-form`)
    const formElements = [...form]
    const body = document.querySelector(`body`)

    form.addEventListener(`submit`,async (event) => {
        event.preventDefault()

        const object = {}

        formElements.forEach(element => {
            if (element.name){
                object[element.name] = element.value
            }
        })

        const loginFetch = await loginAccount (object)

        if (loginFetch.token){
            setLocal ("user_token", loginFetch)
            if (await userType (loginFetch.token)){
                window.location.assign("../../pages/admin-dashboard/index.html", "_self")
            } else {
                window.location.assign("../../pages/user-dashboard/index.html", "_self")
            }
        } else {
            console.log(loginFetch)
            body.append(toastfy (loginFetch.error, "fail"))
        }
    })
}

function assignRegisterButton (){
    const button = document.querySelector(`.register-button`)

    button.addEventListener(`click`, () => {
        window.location.assign("../../pages/register/index.html", "_self")
    })
}

assignRegisterButton ()
loginForm ()