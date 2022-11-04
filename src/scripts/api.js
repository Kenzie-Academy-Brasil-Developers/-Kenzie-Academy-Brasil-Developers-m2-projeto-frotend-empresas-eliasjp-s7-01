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

export async function createProfile (object){
    const url = "http://localhost:6278"

    const createUser = await fetch (`${url}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    })
    .then(resp => {
        if (!resp.ok){
            return resp.json()   
        } else if (resp.ok){
            return "Conta criada com sucesso, você será redirecionado para o login em breve."
        }
    })

    return createUser
}

export async function loginAccount (object){
    const url = "http://localhost:6278"

    const loginUser = await fetch (`${url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    })
    .then (async resp => {
        if (resp.ok){
            const response = await resp.json()
            const accountToken = response.token
            return userType (accountToken)
        } else if (!resp.ok){
            return resp.json()
        }
    })

    return loginUser
}

export async function userType (token){
    const url = "http://localhost:6278"

    const type = await fetch (`${url}/auth/validate_user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then (async resp => {
        const response = await resp.json()
        return response.is_admin
    })

    return type
}