import axios from "axios";
import {IdFiledType} from "../features/categoriesSlice";

const instance = axios.create({
    //withCredentials: true,
    /*headers: {
        'Access-Control-Allow-Origin': '*',
    },*/
    //baseURL: 'http://localhost:3001/',
    //baseURL: 'http://192.168.153.17:3001/'
    baseURL: 'https://dry-anchorage-96588.herokuapp.com/',
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
        //console.log('MaterialsAPI / getAllMaterials / instance.get(`materials/getAllMaterials`)= ', instance.get(`materials/getAllMaterials`));
        return instance.get(`materials/getAllMaterials`);
    },
    /* getAllcategories: () => {
         //console.log('MaterialsAPI / getAllcategories / instance.get(`materials/getAllCategories`)=', instance.get(`materials/getAllCategories`))
         return instance.get(`materials/getAllCategories`);
     },*/
}
export const TasksAPI = {
    getAllTasks: () => {
        //console.log('MaterialsAPI / getAllMaterials / instance.get(`materials/getAllMaterials`)= ', instance.get(`materials/getAllMaterials`));
        return instance.get(`tasks/getAllTasks`);
    },
    /*getAllcategories: () => {
        //console.log('MaterialsAPI / getAllcategories / instance.get(`materials/getAllCategories`)=', instance.get(`materials/getAllCategories`))
        return instance.get(`tasks/getAllCategories`);
    },*/
}
export const CategoriesAPI = {
    getAllcategories: () => {
        //console.log('MaterialsAPI / getAllcategories / instance.get(`materials/getAllCategories`)=', instance.get(`materials/getAllCategories`))
        return instance.get(`categories/getAllCategories`);
    },
}

export const authAPI = {
    login: (email: string, password: string) => {
        return instance.post(`users/login`, {email: email, password: password});
    },

    uploadAvatar: (file: any, id: IdFiledType) => {
        console.log('authAPI.uploadAvatar / id=', id, 'file=', file);
        const instance1 = axios.create({
            headers: {
                "Content-Type": "multipart/form-data"
            },
            baseURL: 'https://dry-anchorage-96588.herokuapp.com/',
        });
        return instance1.post(`users/uploadAvatar`, {file: file, id: id});
    }
}

export const descriptionAPI = {
    getDescription: () => {
        return instance.get(`description/getDescription`);
    },
    setDescription: (title: string, photo: string, description: string) => {
        return instance.post(`description/setDescription`, {title: title, photo: photo, description: description});
    }
}

export const contactsAPI = {
    getContacts: () => {
        return instance.get(`contacts/getContacts`);
    },
    setContacts: (title: string, description: string, phone: string, telegram: string, whatsapp: string, email: string, skype: string) => {
        return instance.post(`contacts/setContacts`, {
            title: title, description: description, phone: phone,
            telegram: telegram, whatsapp: whatsapp, email: email, skype: skype
        });
    }
}