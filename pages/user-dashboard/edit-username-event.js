import { userInformation, attUserInformation } from "../../src/scripts/api.js"
import { getLocal } from "../../src/scripts/storage.js"
import { modal } from "../../src/scripts/modal.js"
import { informationUsername } from "../../pages/user-dashboard/user-information.js"
import { renderCoworkers } from "../../pages/user-dashboard/user-coworkers.js"

export async function editInformationEvent (){
    const body = document.querySelector(`body`)

    const storage = getLocal ("user_token")
    body.append(modal (editInformationForm (storage.token)))
}

function editInformationForm (token){
    const form = document.createElement(`form`)
          form.classList = `edit-information-form`

    const h3 = document.createElement(`h3`)
          h3.classList = `edit-information-form-title`
          h3.innerHTML = `Editar perfil`

    const usernameInput = document.createElement(`input`)
          usernameInput.classList = `edit-information-form-input-username`
          usernameInput.name = "username"
          usernameInput.placeholder = "Seu nome"
          usernameInput.required = "true"

    const emailInput = document.createElement(`input`)
          emailInput.classList = `edit-information-form-input-email`
          emailInput.name = "email"
          emailInput.type = "email"
          emailInput.placeholder = "Seu email"
          emailInput.required = "true"

    const passwordInput = document.createElement(`input`)
          passwordInput.classList = `edit-information-form-input-password`
          passwordInput.name = `password`
          passwordInput.type = "password"
          passwordInput.placeholder = "Sua senha"
          passwordInput.required = "true"

    const button = document.createElement(`button`)
          button.classList = `edit-information-form-button button-style-2`
          button.innerHTML = `Editar perfil`

    form.append(h3, usernameInput, emailInput, passwordInput, button)
    console.log(token)

    form.addEventListener(`submit`, async (event) => {
        event.preventDefault()
        const formElements = [...event.target]
        const object = {}

        formElements.forEach(element => {
            if (element.name){
                object[element.name] = element.value
            }
        })
        await attUserInformation (token, object)
        await informationUsername ()
        renderCoworkers ()
        
        const modal = document.querySelector(`.modal-background`)
        modal.remove()
    })

    return form
}