function menuDropdown (){
    const dropdownButton = document.querySelector(`.dropdown-button`)

    dropdownButton.addEventListener(`click`, (e) => {
        const buttonImage = document.querySelector(`.dropdown-image`)
        const buttonHeaders = document.querySelector(`.buttons-header`)

        if (buttonImage.src.includes(`menu`)){
            buttonImage.src = `../../src/images/icons/close.svg`
            buttonHeaders.style.display = `flex`
        }else if (buttonImage.src.includes(`close`)){
            buttonImage.src = `../../src/images/icons/menu-dropdown.svg`
            buttonHeaders.style.display = `none`
        }


    })
}

function login (){
    const querybutton = document.querySelector(`.home`)

    querybutton.addEventListener(`click`, () => {
        // location login
    })
}

function register (){
    const querybutton = document.querySelector(`.register`)

    querybutton.addEventListener(`click`, () => {
        window.location.assign("../../pages/register/index.html", "_self")
    })
}

menuDropdown ()
login ()
register()