import { allWorkers, outOfWorkUsers, hireWorker, allWorkersFromDepartment, fireWorkerFromDepartment } from "../../src/scripts/api.js"
import { getLocal } from "../../src/scripts/storage.js"

export function infoModal (object){
    const section = document.createElement(`section`)
          section.classList = `info-modal`

    const h3 = document.createElement(`h3`)
          h3.classList = `info-modal-title`
          h3.innerHTML = object.name

    const divContainer = document.createElement(`div`)
          divContainer.classList = `info-modal-container`

    const divInfoDepart = document.createElement(`div`)
          divInfoDepart.classList = `info-modal-department`

    const description = document.createElement(`p`)
          description.classList = `info-modal-description`
          description.innerHTML = object.description

    const infoModalCompany = document.createElement(`p`)
          infoModalCompany.classList = `info-modal-company`
          infoModalCompany.innerHTML = object.companies.name

    const divHire = document.createElement(`div`)
          divHire.classList = `info-modal-hire`

    const select = document.createElement(`select`)
          select.classList = `select-out-of-work`
          outOfWorkOptions (select)

    const hireButton = document.createElement(`button`)
          hireButton.classList = `hire-button button-style-3`
          hireButton.innerHTML = `Contratar`
          hireButton.addEventListener(`click`, () => {
                hireButtonEvent (select.value, object)
          })

    const departWorkersSection = document.createElement(`section`)
          departWorkersSection.classList = `department-workers-section`

    const departWorkersUl = document.createElement(`ul`)
          departWorkersUl.classList = `department-workers-list`
          departWorkersArray (object, departWorkersUl)

    section.append(h3, divContainer, departWorkersSection)
    divContainer.append(divInfoDepart, divHire)
    divInfoDepart.append(description, infoModalCompany)
    divHire.append(select, hireButton)
    departWorkersSection.append(departWorkersUl)


    return section
}

async function hireButtonEvent (target, object){
    const tokenStorage = getLocal ("user_token")
    const workers = await allWorkers (tokenStorage.token)
    const modal = document.querySelector(`.modal-background`)

    let userId = {}
    workers.forEach (worker => {
          if (worker.username == target){
                userId.user_uuid = worker.uuid
          }
    })
    userId.department_uuid = object.uuid
    hireWorker (userId, tokenStorage.token)

    modal.remove()
}

async function outOfWorkOptions (tag){
  const savedLocal = getLocal ("user_token")

  const workersArray = await outOfWorkUsers (savedLocal.token)
  workersArray.forEach(worker => {
      const option = document.createElement(`option`)
            option.innerHTML = worker.username

            tag.append(option)
  })
}

async function departWorkersArray (object, ul){
    const savedLocal = getLocal ("user_token")

    const workersArray = await allWorkers (savedLocal.token)
    const filtredWorkers = []
    workersArray.forEach(worker => {
        if (worker.department_uuid == object.uuid){
            filtredWorkers.push(worker)
        }
    })
    filtredWorkers.forEach(worker => {
        const card = document.createElement(`li`)
              card.classList = `department-workers-card`

        const h3 = document.createElement(`h3`)
              h3.classList = `department-workers-card-username`
              h3.innerHTML = worker.username

        const level = document.createElement(`p`)
              level.classList = `department-workers-card-level`
              level.innerHTML = worker.professional_level

        const companyName = document.createElement(`p`)
              companyName.classLsit = `department-workers-card-company-name`
              companyName.innerHTML = object.companies.name

        const buttonContainer = document.createElement(`div`)
              buttonContainer.classList = `department-workers-card-container`

        const fireButton = document.createElement(`button`)
              fireButton.classList = `fire-button button-style-4`
              fireButton.innerHTML = "Desligar"
              fireButton.addEventListener(`click`, () => {
                fireButtonEvent (worker.uuid)
              })

        card.append(h3, level, companyName, buttonContainer)
        buttonContainer.append(fireButton)
        ul.append(card)
    })
}

function fireButtonEvent (id){
    const tokenStorage = getLocal ("user_token")
    const token = tokenStorage.token
    const modal = document.querySelector(`.modal-background`)
    modal.remove()

    fireWorkerFromDepartment (token, id)
}