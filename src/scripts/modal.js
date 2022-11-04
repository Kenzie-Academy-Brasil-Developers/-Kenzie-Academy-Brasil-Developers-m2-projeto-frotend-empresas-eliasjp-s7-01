export function modal (content){
    const modalBackground = document.createElement(`div`)
          modalBackground.classList = `modal-background`

    const modal = document.createElement(`div`)
          modal.classList = `modal-template`
          
    const button = document.createElement(`button`)
          button.classList = `close-modal`
          button.innerHTML = `X`
          button.addEventListener(`click`, (e) => {
              modalBackground.remove()
          })

    modalBackground.append(modal)
    modal.append(button, content)

    return modalBackground
}