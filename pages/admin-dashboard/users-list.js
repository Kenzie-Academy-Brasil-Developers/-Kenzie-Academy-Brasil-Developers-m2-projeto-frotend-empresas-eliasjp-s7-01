import { allWorkers, allDepartments } from "../../src/scripts/api.js"
import { modal } from "../../src/scripts/modal.js"
import { editUserListEvent, deleteUserListEvent } from "../../pages/admin-dashboard/users-list-events.js"
import { getLocal } from "../../src/scripts/storage.js"


export async function usersList (){
    const queryList = document.querySelector(`.users-list`)
    const storage = getLocal ("user_token")
    const array = await allWorkers (storage.token)

    queryList.innerHTML = ""

    array.forEach(async user => {
        if (user.username != "ADMIN"){
            queryList.append(await createCardForUsersList (user))
        }
    })
}

async function createCardForUsersList (user){
    const body = document.querySelector(`body`)

    const li = document.createElement(`li`)
          li.classList = `user-list-card`

    const h3 = document.createElement(`h3`)
          h3.classList = `user-list-username`
          h3.innerHTML = user.username

    const level = document.createElement(`p`)
          level.classList = `user-list-level`
          if (user.professional_level != null){
            level.innerHTML = user.professional_level
          } else {
            level.innerHTML = `Não especificado`
          }

    const kindOfWork = document.createElement(`p`)
          kindOfWork.classList = `user-list-kind-of-work`
          kindOfWork.innerHTML = user.kind_of_work
          if (user.kind_of_work != null){
            kindOfWork.innerHTML = user.kind_of_work
          } else {
            kindOfWork.innerHTML = `Não especificado`
          }

    const hiredCompany = document.createElement(`p`)
          hiredCompany.classList = `user-list-company`
          if (user.department_uuid != null){
            hiredCompany.innerHTML = await findCompany (user)
            }else {
            hiredCompany.innerHTML = `Desempregado`
          }

    const buttonsContainer = document.createElement(`div`)
          buttonsContainer.classList = `user-list-buttons-container`

    const editUser = document.createElement(`button`)
          editUser.classList = `user-list-edit-user`
          editUser.addEventListener(`click`, () => {
            body.append(modal (editUserListEvent (user)))
          })
          
    const editUserIcon = document.createElement(`img`)
          editUserIcon.classList = `user-list-edit-user-icon`
          editUserIcon.src = `../../src/images/icons/edit.svg`

    const deleteUser = document.createElement(`button`)
          deleteUser.classList = `user-list-delete-user`
          deleteUser.addEventListener(`click`, () => {
            body.append(modal (deleteUserListEvent (user)))
          })

    const deleteUserIcon = document.createElement(`img`)
          deleteUserIcon.classList = `user-list-edit-user-icon`
          deleteUserIcon.src = `../../src/images/icons/delete.svg`

    li.append(h3, level, kindOfWork, hiredCompany, buttonsContainer)
    buttonsContainer.append(editUser, deleteUser)
    editUser.append(editUserIcon)
    deleteUser.append(deleteUserIcon)

    return li
}

async function findCompany (user){
    const storage = getLocal ("user_token")
    const allDepart = await allDepartments (storage.token)

    let company = ""

    allDepart.forEach(department => {
        if (department.uuid == user.department_uuid){
            company += department.companies.name
        }
    })

    return company
}

usersList ()