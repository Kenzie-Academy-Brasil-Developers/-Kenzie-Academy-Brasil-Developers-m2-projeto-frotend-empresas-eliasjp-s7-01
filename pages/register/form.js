import { createProfile } from "../../src/scripts/api.js"
import { toastfy } from "../../src/scripts/toastfy.js"

function registerForm (){
    const form = document.querySelector(`#register-form`)
    const body = document.querySelector(`body`)
    const formElements = [...form]

    form.addEventListener(`submit`,async (e) => {
        e.preventDefault()

        const formInfo = {}
        formElements.forEach(element => {
            if(element.name){
                formInfo[element.name] = element.value   
            }
        })
        if (formInfo.profession_level == ""){
            formInfo.profession_level = null
        }
        const response = await createProfile (formInfo)
        if (typeof response == "string"){
            body.append(toastfy (response, "success"))
            setTimeout(() => {
                 window.location.assign("../../pages/login/index.html", "_self")
                }, 8000)
        }else {
            body.append(toastfy (response.error[0], "fail"))
        }
    })
}

registerForm ()