export async function getSector (){
    const url = "http://localhost:6278"

    const sector = await fetch (`${url}/sectors`, {
        method: "GET"   
    })
    .then(resp => resp.json())

    return sector
}

export async function getCompany (){
    const url = "http://localhost:6278"
    
    const companies = await fetch (`${url}/companies`, {
        method: "GET"
    })
    .then(resp => resp.json())

    return companies
}

export async function getCompanyBySector (sector){
    const url = "http://localhost:6278"
    
    const companies = await fetch (`${url}/companies/${sector}`, {
        method: "GET"
    })
    .then(resp => resp.json())

    return companies
}