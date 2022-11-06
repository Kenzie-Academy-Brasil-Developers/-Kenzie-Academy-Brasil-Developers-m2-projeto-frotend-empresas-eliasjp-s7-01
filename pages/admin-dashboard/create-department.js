import { getCompany, allDepartments, createDepartmentAPI} from "../../src/scripts/api.js"
import { getLocal } from "../../src/scripts/storage.js"
import { modal } from "../../src/scripts/modal.js"
import { renderDepartments } from "../../pages/admin-dashboard/department-navigation.js"

function createDepartmentEvent (){
    const button = document.querySelector(`.create-department`)
    const body = document.querySelector(`body`)
    button.addEventListener(`click`, () => {
        body.append(modal (createDepartmentForm ()))
    })
}

function createDepartmentForm (){
    const form = document.createElement(`form`)
          form.classList = `create-department-form`

    const h3 = document.createElement(`h3`)
          h3.classList = `create-department-title`
          h3.innerHTML = `Criar departamento`

    const departmentName = document.createElement(`input`)
          departmentName.classList = `create-department-name-input`
          departmentName.required = `true`
          departmentName.placeholder = `Nome do departamento`

    const departmentDescription = document.createElement(`input`)
          departmentDescription.classList = `create-department-description-input`
          departmentDescription.required = `true`
          departmentDescription.placeholder = `Descrição`

    const selectCompany = document.createElement(`select`)
          selectCompany.classList = `create-department-select`
          createDepartmentOptions (selectCompany)

    const createButton = document.createElement(`button`)
          createButton.classList = `create-department-button button-style-2`
          createButton.innerHTML = `Criar o departamento`
    
    createDepartmentFormEvent (form, departmentName, departmentDescription, selectCompany)

    form.append(h3, departmentName, departmentDescription, selectCompany, createButton)

    return form
}

async function createDepartmentOptions (select){
    const companies = await getCompany ()
    companies.forEach(company => {
        const option = document.createElement(`option`)
              option.innerHTML = company.name
              
        select.append(option)
    })
}

async function createDepartmentFormEvent (form, inputName, inputDescription, selectCompany){
    const object = {}
    const storage = getLocal("user_token")

    form.addEventListener(`submit`, async (event) => {
        event.preventDefault()
        object.name = inputName.value
        object.description = inputDescription.value
        const companies = await getCompany ()
        companies.forEach(company => {
            if (company.name == selectCompany.value){
                object.company_uuid = company.uuid
            }
        })

        createDepartmentAPI (storage.token, object)
        const departmentsList = document.querySelector(`.department-list`)
        const allDepartmentsArray = await allDepartments (storage.token)

        departmentsList.innerHTML = ""
        allDepartmentsArray.forEach(department => {
            departmentsList.append(renderDepartments (department))
        })

        const modal = document.querySelector(`.modal-background`)
        modal.remove()
    })

}

createDepartmentEvent ()