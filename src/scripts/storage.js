export function setLocal (storage, object){
    window.localStorage.setItem(storage, JSON.stringify(object))
}

export function getLocal (storageName){
    const storage = window.localStorage.getItem(storageName)
    return JSON.parse(storage)
}

export function removeLocal (storageName){
    window.localStorage.removeItem(storageName)
}