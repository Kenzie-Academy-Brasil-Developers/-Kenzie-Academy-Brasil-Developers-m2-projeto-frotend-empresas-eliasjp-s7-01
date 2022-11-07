import { deleteDepartmentAPI, allDepartments, allDepartmentsFromCompany } from "../../src/scripts/api.js"
import { renderDepartments } from "../../pages/admin-dashboard/department-navigation.js"
import { getLocal } from "../../src/scripts/storage.js"



export function deleteDepartmentModal (object){
    const section = document.createElement(`section`)
          section.classList = `delete-department-alert`

    const title = document.createElement(`h3`)
          title.classList = `delete-department-title`
          title.innerHTML = `Realmente deseja deletar o departamento ${object.name} e demitir seus funcionários?`

    const button = document.createElement(`button`)
          button.classList = `delete-department-button button-style-4`
          button.innerHTML = `Confirmar`
          button.addEventListener(`click`, () => {
            const storage = getLocal ("user_token")

            deleteDepartmentEvent (storage.token, object)
          })

    section.append(title, button)

    return section
}

async function deleteDepartmentEvent (token, object){
    await deleteDepartmentAPI (token, object.uuid)
    
    const arrayDepartments = await allDepartments (token)
    const departmentsList = document.querySelector(`.department-list`)
    const modal = document.querySelector(`.modal-background`)

    departmentsList.innerHTML = ""
    console.log(arrayDepartments)
    arrayDepartments.forEach(department => {
        departmentsList.append(renderDepartments (department))
    })


    modal.remove()
}