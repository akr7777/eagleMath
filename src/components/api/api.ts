import axios from "axios";

const instance = axios.create({
    //withCredentials: true,
    /*headers: {
        'Access-Control-Allow-Origin': '*',
    },*/
    baseURL: 'http://localhost:3001',
    //baseURL: 'https://dry-anchorage-96588.herokuapp.com/',
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaNeeded = 10
}

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
    getAllMaterials: () => {
        return instance.get(`materials/getAllMaterials`).then(response => {
            return JSON.parse(response.data);
        });
    },

}