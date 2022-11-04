import { loginAccount } from "../../src/scripts/api.js"
import { modal } from "../../src/scripts/modal.js"
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
        const loginEvent = await loginAccount (object)
        if (typeof loginEvent != "boolean"){
            body.append(toastfy (loginEvent.error, "fail"))
        } else if (loginEvent == true){
            console.log(loginEvent)
            const body = document.querySelector(`body`)
            body.append(modal ("texto", "placeholder"))
            // location admin dashboard
        } else if (!loginEvent == false){
            console.log(loginEvent)
            // location normal user
        }
    })
}

loginForm ()