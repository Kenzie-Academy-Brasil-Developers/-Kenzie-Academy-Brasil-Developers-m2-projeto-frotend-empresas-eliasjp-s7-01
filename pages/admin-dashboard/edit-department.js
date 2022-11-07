import { allDepartments, editDepartmentAPI } from "../../src/scripts/api.js"
import { renderDepartments } from "../../pages/admin-dashboard/department-navigation.js"
import { getLocal } from "../../src/scripts/storage.js"

export function editDepartmentModal (object){
    const form = document.createElement(`form`)
          form.classList = `edit-department-form`

    const h3 = document.createElement(`h3`)
          h3.classList = `edit-department-title`
          h3.innerHTML = `Editar departamento`

    const textArea = document.createElement(`textarea`)
          textArea.classList = `edit-department-textarea`
          textArea.required = `true`
          textArea.placeholder = "Coloque uma descrição para o departamento"
          textArea.innerHTML = object.description

    const button = document.createElement(`button`)
          button.classList = `edit-department-button button-style-2`
          button.innerHTML = `Salvar Alterações`

    form.addEventListener(`submit`,async (event) => {
        event.preventDefault()
        const newDescription = {}
        const userToken = getLocal ("user_token")
        const formElements = [...form]

        formElements.forEach(element => {
            if (element.required){
                newDescription.description = element.value
            }
        })
        await editDepartmentAPI (userToken.token, object.uuid, newDescription)

        const departmentsList = document.querySelector(`.department-list`)
              departmentsList.innerHTML = ""
        const arrayDepartments = await allDepartments (userToken.token)
        arrayDepartments.forEach(department => {
            departmentsList.append(renderDepartments (department))
        })
        
        const modal = document.querySelector(`.modal-background`)
        modal.remove()
    })

    form.append(h3, textArea, button)

    return form
}