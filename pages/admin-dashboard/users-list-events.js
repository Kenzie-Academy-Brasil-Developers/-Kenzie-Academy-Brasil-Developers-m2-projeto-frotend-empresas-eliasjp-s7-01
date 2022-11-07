import { editUserInformationADMIN, deleteUserADMIN } from "../../src/scripts/api.js"
import { getLocal } from "../../src/scripts/storage.js"
import { usersList } from "../../pages/admin-dashboard/users-list.js"

export function editUserListEvent (user){
    const form = document.createElement(`form`)
          form.classList = `edit-user-list-form`

    const h3 = document.createElement(`h3`)
          h3.classList = `edit-user-list-title`
          h3.innerHTML = `Editar Usuário`

    const selectModality = document.createElement(`select`)
          selectModality.classList = `edit-user-list-modality`
    const modalities = ["Não informado", "Home office", "Presencial", "Hibrido"]
          modalities.forEach(modality => {
            const optionM = document.createElement(`option`)
                optionM.innerHTML = modality

            selectModality.append(optionM)
          })

    const selectProfessionalLevel = document.createElement(`select`)
          selectProfessionalLevel.classList = `edit-user-list-professional-level`
    const profLevel = ["Não informado", "Estágio", "Júnior", "Pleno", "Sênior"]
          profLevel.forEach(profLevel => {
            const optionPL = document.createElement(`option`)
                optionPL.innerHTML = profLevel

                selectProfessionalLevel.append(optionPL)
          })

    const button = document.createElement(`button`)
          button.classList = `edit-user-list-button button-style-2`
          button.innerHTML = `Editar`

    form.append(h3, selectModality, selectProfessionalLevel, button)

    form.addEventListener(`submit`, async (event) => {
        event.preventDefault()
        const object = {}
        const storage = getLocal ("user_token")

        if (selectModality.value == "Não informado"){
            object.kind_of_work = null
        }else {
            object.kind_of_work = selectModality.value.toLowerCase()
        }

        if (selectProfessionalLevel.value == "Não informado"){
            object.professional_level = null
        }else {
            object.professional_level = selectProfessionalLevel.value.toLowerCase()
        }
        
        await editUserInformationADMIN (storage.token, object, user.uuid)
        usersList ()
        const modal = document.querySelector(`.modal-background`)
        modal.remove()
    })

    return form
}

export function deleteUserListEvent (user){
    const form = document.createElement(`form`)
          form.classList = `delete-user-list-form`

    const h3 = document.createElement(`h3`)
          h3.classList = `delete-user-list-title`
          h3.innerHTML = `Realmente deseja deletar o usuário ${user.username}`

    const button = document.createElement(`button`)
          button.classList = `delete-user-list-button button-style-4`
          button.innerHTML = `Deletar`

    form.addEventListener(`submit`, async (event) => {
        event.preventDefault()
        const storage = getLocal ("user_token")

        await deleteUserADMIN (storage.token, user.uuid)
        usersList ()
        const modal = document.querySelector(`.modal-background`)
        modal.remove()
    })

    form.append(h3, button)

    return form
}