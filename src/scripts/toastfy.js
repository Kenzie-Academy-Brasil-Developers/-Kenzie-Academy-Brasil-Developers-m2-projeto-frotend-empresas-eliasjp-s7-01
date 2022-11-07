export function toastfy (message, type){
    const toastfyContainer = document.createElement(`div`)
          toastfyContainer.classList = `toastfy-container`

    const popUp = document.createElement(`div`)
          popUp.classList = `toastfy toastfy-${type}`

    const content = document.createElement(`p`)
          content.classList = `toastfy-content`
          content.innerHTML = message

    toastfyContainer.append(popUp)      
    popUp.append(content)

    setTimeout(() => {
      toastfyContainer.remove()
    }, 8100)

    return toastfyContainer
}