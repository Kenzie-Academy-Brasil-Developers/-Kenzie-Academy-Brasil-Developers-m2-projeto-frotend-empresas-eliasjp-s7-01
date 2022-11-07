import { getCompany, allCoworkers } from "../../src/scripts/api.js"
import { getLocal } from "../../src/scripts/storage.js"

export async function renderCoworkers (){
    const storage = getLocal ("user_token")
    const section = document.querySelector(`.user-coworkers`)
          section.innerHTML = ""

    const department = await allCoworkers (storage.token)
    if (department.length == 0){
        notHiredStatus (section)
    }else {
        hiredStatus (section, department[0])
    }
}

function notHiredStatus (section){
    const textContainer = document.createElement(`div`)
    textContainer.classList = `text-container`

    const alert = document.createElement(`p`)
    alert.classList = `text-alert`
    alert.innerHTML = "Você ainda não foi contratado"

    section.append(textContainer)
    textContainer.append(alert)
}

async function hiredStatus (section, department){
    const companies = await getCompany ()
    let companyName = ""
    companies.forEach(company => {
        if (company.uuid == department.company_uuid){
            companyName = company.name
        }
    })

    const sectionTitleContainer = document.createElement(`div`)
          sectionTitleContainer.classList = `section-title-container`

    const sectionTitle = document.createElement(`h3`)
          sectionTitle.classList = `section-title`
          sectionTitle.innerHTML = `${companyName} - ${department.name}`

    const ul = document.createElement(`ul`)
          ul.classList = `coworkers-list`

    department.users.forEach(user => {
        coworkersCard (user, ul)
    })

    section.append(sectionTitleContainer, ul)
    sectionTitleContainer.append(sectionTitle)
}

function coworkersCard (coworker, list){
    const li = document.createElement(`li`)
          li.classList = "coworker-card"

    const h4 = document.createElement(`h4`)
          h4.classList = `coworker-name`
          h4.innerHTML = coworker.username

    const p = document.createElement(`p`)
          p.classList = `coworker-level`
          if (coworker.professional_level == null){
            p.innerHTML = "Não especificado"
          }else {
            p.innerHTML = coworker.professional_level
          }

    list.append(li)
    li.append(h4, p)

    return li
}

renderCoworkers ()