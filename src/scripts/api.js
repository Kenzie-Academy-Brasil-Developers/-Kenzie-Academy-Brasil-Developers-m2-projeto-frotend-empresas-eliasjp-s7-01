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
        method: "GET",
        headers: {
            "Authorization": "Bearer null"
        }
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
        return resp.json()
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

export async function allDepartments (token){
    const url = "http://localhost:6278"
    
    const allDepart = await fetch (`${url}/departments`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then (async resp => resp.json())

    return allDepart
}

export async function allWorkers (token){
    const url = "http://localhost:6278"
    
    const everyWorkers = await fetch (`${url}/users`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then (resp => resp.json())

    return everyWorkers
}

export async function outOfWorkUsers (token){
    const url = "http://localhost:6278"

    const outOfWork = await fetch (`${url}/admin/out_of_work`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then (resp => resp.json())

    return outOfWork
}

export async function hireWorker (object, token){
    const url = "http://localhost:6278"

    const hire = await fetch (`${url}/departments/hire/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(object) 
    })
    .then (resp => resp.json())

    return hire
}

export async function allWorkersFromDepartment (token){
    const url = "http://localhost:6278"

    const allWorkersDepart = await fetch (`${url}/users/departments/coworkers`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then (resp => resp.json())

    return allWorkersDepart
}

export async function fireWorkerFromDepartment (token, id){
    const url = "http://localhost:6278"

    const fireWorker = await fetch (`${url}/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then (resp => resp.json())

    return fireWorker
}

export async function createDepartmentAPI (token, object){
    const url = "http://localhost:6278"

    const createDepartment = fetch (`${url}/departments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
}

export async function allDepartmentsFromCompany (token, companyID){
    const url = "http://localhost:6278"
    
    const arrayDepartmentsFromCompany = await fetch (`${url}/departments/${companyID}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then (resp => resp.json())

    return arrayDepartmentsFromCompany
}

export async function editDepartmentAPI (token, departmentID, object){
    const url = "http://localhost:6278"

    await fetch (`${url}/departments/${departmentID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
}

export async function deleteDepartmentAPI (token, departmentID){
    const url = "http://localhost:6278"

    await fetch (`${url}/departments/${departmentID}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function editUserInformationADMIN (token, object, userID){
    const url = "http://localhost:6278"

    await fetch (`${url}/admin/update_user/${userID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
}

export async function deleteUserADMIN (token, userID){
    const url = "http://localhost:6278"

    await fetch (`${url}/admin/delete_user/${userID}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

export async function userInformation (token){
    const url = "http://localhost:6278"

    const userInfo = await fetch (`${url}/users/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then (resp => resp.json())

    return userInfo
}

export async function attUserInformation (token, object){
    const url = "http://localhost:6278"

    const teste =await fetch (`${url}/users`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(object)
    })
    .then (resp => resp.json())
}