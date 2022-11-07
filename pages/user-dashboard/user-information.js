import { userInformation } from "../../src/scripts/api.js"
import { getLocal } from "../../src/scripts/storage.js"
import { editInformationEvent } from "../../pages/user-dashboard/edit-username-event.js"

export async function informationUsername (){
    const storage = getLocal ("user_token")
    const usernameObject = await userInformation (storage.token)

    createInformation (usernameObject)
}

function createInformation (userDetails){
      const section = document.querySelector(`.user-information`)
            section.innerHTML = ""

      const h2 = document.createElement(`h2`)
            h2.classList = `user-username`
            h2.innerHTML = userDetails.username

      const infoContainer = document.createElement(`div`)
            infoContainer.classList = `user-info-container`

      const email = document.createElement(`p`)
            email.classList = `user-info-email`
            email.innerHTML = `Email: ${userDetails.email}`

      const level = document.createElement(`p`)
            level.classList = `user-info-level`
            level.innerHTML = userDetails.professional_level

      const kindOfWord = document.createElement(`p`)
            kindOfWord.classList = `user-info-kind-of-work`
            kindOfWord.innerHTML = userDetails.kind_of_work

      const button = document.createElement(`button`)
            button.classList = `edit-username-information`
            button.addEventListener(`click`, () => {
                  editInformationEvent ()
            })

      const buttonIcon = document.createElement(`img`)
            buttonIcon.classList = `edit-username-information-icon`
            buttonIcon.src = "../../src/images/icons/edit.svg"

    section.append(h2, infoContainer, button)
    infoContainer.append(email, level, kindOfWord)
    button.append(buttonIcon)
}

informationUsername ()