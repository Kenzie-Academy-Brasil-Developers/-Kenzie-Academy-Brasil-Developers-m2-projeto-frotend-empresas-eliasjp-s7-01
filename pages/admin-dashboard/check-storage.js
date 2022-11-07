import { getLocal } from "../../src/scripts/storage.js"
import { userType } from "../../src/scripts/api.js"

export async function checkLocal (){
    const storage = getLocal ("user_token")
    
    if (storage){
        const isAdmin = await userType (storage.token)
        if (!isAdmin){
            window.location.assign("../../pages/user-dashboard/index.html", "_self")
        }
    }else {
        window.location.assign("../../pages/login/index.html", "_self")
    }
}

checkLocal ()