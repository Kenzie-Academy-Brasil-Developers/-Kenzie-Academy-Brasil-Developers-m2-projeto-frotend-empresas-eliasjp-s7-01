import { getCompany, allDepartments} from "../../src/scripts/api.js"
import { getLocal } from "../../src/scripts/storage.js"
import { infoModal } from "../../pages/admin-dashboard/edit-info.js"
import { modal } from "../../src/scripts/modal.js"

async function departments (){
      const select = document.querySelector(`.select-company`)
      const departmentsList = document.querySelector(`.department-list`)

      const userToken = getLocal ("user_token")

      const companies = await getCompany ()
      const arrayDepartments = await allDepartments (userToken.token)

      companies.forEach(company => {
            select.append(createOptions (company.name))
      })

      select.addEventListener(`change`, (e) => {
            console.log(e.target.value)
      })

      arrayDepartments.forEach(department => {
            departmentsList.append(renderDepartments (department))
      })
}

function createOptions (name){
      const option = document.createElement(`option`)
            option.innerHTML = name

      return option
}

function renderDepartments (object){
      const body = document.querySelector(`body`)

      const li = document.createElement(`li`)
            li.classList = `department-card`
            li.id = object.uuid

      const h3 = document.createElement(`h3`)
            h3.classList = `department-name`
            h3.innerHTML = object.name

      const departDescription = document.createElement(`p`)
            departDescription.classList = `department-description`
            departDescription.innerHTML = object.description

      const companyName = document.createElement(`p`)
            companyName.classList = `company-name`
            companyName.innerHTML = object.companies.name

      const buttonsDiv = document.createElement(`div`)
            buttonsDiv.classList = `buttons-container`

      const departmentInfo = document.createElement(`button`)
            departmentInfo.classList = `department-info`
            departmentInfo.addEventListener(`click`, () =>{
                  body.append(modal (infoModal (object)))
            })

      const departmentInfoIcon = document.createElement(`img`)
            departmentInfoIcon.classList = `button-icon`
            departmentInfoIcon.src = "../../src/images/icons/details.svg"

      const changeDescription = document.createElement(`button`)
            changeDescription.classList = `change-department-description`

      const changeDescriptionIcon = document.createElement(`img`)
            changeDescriptionIcon.classList = `button-icon`
            changeDescriptionIcon.src = "../../src/images/icons/edit.svg"

      const deleteDepartment = document.createElement(`button`)
            deleteDepartment.classList = `delete-department`

      const deleteDepartmentIcon = document.createElement(`img`)
            deleteDepartmentIcon.classList = `button-icon`
            deleteDepartmentIcon.src = "../../src/images/icons/delete.svg"

      li.append(h3, departDescription, companyName, buttonsDiv)
      buttonsDiv.append(departmentInfo, changeDescription, deleteDepartment)
      departmentInfo.append(departmentInfoIcon)
      changeDescription.append(changeDescriptionIcon)
      deleteDepartment.append(deleteDepartmentIcon)

      return li
}


departments ()