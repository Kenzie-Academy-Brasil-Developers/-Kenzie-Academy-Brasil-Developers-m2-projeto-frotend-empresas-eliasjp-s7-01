import { getSector, getCompany, getCompanyBySector } from "../../src/scripts/api.js"
import { companyCardCreating } from "./company-list.js"

let listShowing = false

function sectorDropdown (){
    const button = document.querySelector(`.sector-dropdown`)

    button.addEventListener(`click`, () => {
        dropdownShowing (listShowing)
        listShowing = !listShowing
    })
}

function dropdownShowing (showing){
    const list = document.querySelector(`.sector-list`)
    const image = document.querySelector(`.sector-dropdown-image`)

    if (!showing){
        list.style.display = `flex`
        image.src = "../../src/images/icons/close.svg"
    }else 
    {
        list.style.display = `none`
        image.src = "../../src/images/icons/expand.svg"
    }
}

async function listCreation (){
    const list = document.querySelector(`.sector-list`)
    const sectors = await getSector ()

    const allSectors = allSectorCardCreation ()
    list.append(allSectors)

    sectors.forEach(element => {
        const card = sectorCardCreation (element)
        list.append(card)
    })
}

function allSectorCardCreation (){
    const allSector = document.createElement(`li`)
          allSector.classList = `sector-card`
          allSector.innerHTML = "Todos"

    allSector.addEventListener(`click`, async () => {
        const buttonInner = document.querySelector(`.button-inner`)
              buttonInner.innerHTML = "Todos"

        const companyList = document.querySelector(`.company-list`)
              companyList.innerHTML = ""

        const companies = await getCompany ()

        companies.forEach(company => {
            companyList.append(companyCardCreating (company))
        })

        dropdownShowing (listShowing)
        listShowing = !listShowing
    })

    return allSector
}

function sectorCardCreation (object) {
    const card = document.createElement(`li`)
          card.classList = `sector-card`
          card.innerHTML = object.description

    card.addEventListener(`click`, async () => {
        const buttonInner = document.querySelector(`.button-inner`)
              buttonInner.innerHTML = object.description

        const companyList = document.querySelector(`.company-list`)
              companyList.innerHTML = ""

        const companyBySector = await getCompanyBySector (object.description)

        companyBySector.forEach(company => {
            companyList.append(companyCardCreating (company))
        })

        dropdownShowing (listShowing)
        listShowing = !listShowing
    })

    return card
}

listCreation ()
sectorDropdown ()