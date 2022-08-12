import {AllMAterialsInitialState} from "./materialsAPIData";


export const AuthAPI = {
    Login: (email: string, password: string, captcha?: string) => {
        return {
            resultCode: 0,
            data: {
                authID: 1,
                email: 'myEmailInAPI_Auth@app.com',
                name: 'admin'
            }
        }
    },
    logout: (id: number) => {
        return {
            resultCode: 0
        };
    }
}

export const MaterialsAPI = {
    getMaterials: () => {
        return {
            resultCode: 0,
            data: AllMAterialsInitialState,
        }
    }
}