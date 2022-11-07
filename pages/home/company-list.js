import { getCompany } from "../../src/scripts/api.js"

async function companyList (){
    const companies = await getCompany ()
    const companyList = document.querySelector(`.company-list`)

    companies.forEach(company => {
        const card = companyCardCreating (company)

        companyList.append(card)
    })
}

export function companyCardCreating (object) {
    const card = document.createElement(`li`)
          card.classList = `company-card`

    const companyName = document.createElement(`h2`)
          companyName.classList = `company-name`
          companyName.innerHTML = object.name

    const opening = document.createElement(`small`)
          opening.classList = `opening-hours`
          opening.innerHTML = object.opening_hours

    const sector = document.createElement(`p`)
          sector.classList = `company-card-sector`
          sector.innerHTML = object.sectors.description

    card.append(companyName, opening, sector)

    return card
}

companyList ()