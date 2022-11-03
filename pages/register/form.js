import { createProfile } from "../../src/scripts/api.js"
import { toastfy } from "../../src/scripts/toastfy.js"

function register (){
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
            const queryToastfy = document.querySelector(`.toastfy-container`)
            setTimeout(() => {
                 queryToastfy.remove() 
                 window.location.assign("../../pages/login/index.html", "_self")
                }, 8000)
        }else {
            body.append(toastfy (response.error[0], "fail"))
            const queryToastfy = document.querySelector(`.toastfy-container`)
            setTimeout(() => { queryToastfy.remove() }, 8000)
        }
    })
}

register ()