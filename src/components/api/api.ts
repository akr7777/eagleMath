import axios, {AxiosResponse} from "axios";
import {IdFiledType} from "../features/categoriesSlice";

const accessToken = localStorage.getItem("accessToken") || "";

const instance = axios.create({
    withCredentials: true,
    /*headers: {
        'Access-Control-Allow-Credentials': true,
        'Authorization': 'bearer ' + accessToken,
    },*/
    baseURL: 'http://localhost:4001/',
    //baseURL: 'http://192.168.153.17:3001/'
    //baseURL: 'https://dry-anchorage-96588.herokuapp.com/',
});

instance.interceptors.request.use((config)=> {
    if (config.headers)
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaNeeded = 10
}

/*export const AuthAPI = {
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
}*/

export const MaterialsAPI = {
    getAllMaterials: ():Promise<AxiosResponse> => {
        //console.log('MaterialsAPI / getAllMaterials / instance.get(`materials/getAllMaterials`)= ', instance.get(`materials/getAllMaterials`));
        return instance.get(`materials/getAllMaterials`);
    },
    /* getAllcategories: () => {
         //console.log('MaterialsAPI / getAllcategories / instance.get(`materials/getAllCategories`)=', instance.get(`materials/getAllCategories`))
         return instance.get(`materials/getAllCategories`);
     },*/
}
export const TasksAPI = {
    getAllTasks: ():Promise<AxiosResponse> => {
        //console.log('MaterialsAPI / getAllMaterials / instance.get(`materials/getAllMaterials`)= ', instance.get(`materials/getAllMaterials`));
        return instance.get(`tasks/getAllTasks`);
    },
    /*getAllcategories: () => {
        //console.log('MaterialsAPI / getAllcategories / instance.get(`materials/getAllCategories`)=', instance.get(`materials/getAllCategories`))
        return instance.get(`tasks/getAllCategories`);
    },*/
}
export const CategoriesAPI = {
    getAllcategories: ():Promise<AxiosResponse> => {
        //console.log('MaterialsAPI / getAllcategories / instance.get(`materials/getAllCategories`)=', instance.get(`materials/getAllCategories`))
        return instance.get(`categories/getAllCategories`);
    },
}

export const authAPI = {
    login: (email: string, password: string):Promise<AxiosResponse> => {
        return instance.post(`auth/login`, {email: email, password: password});
    },
    logout: ():Promise<AxiosResponse> => {
        return instance.post('auth/logout', {});
    },
    uploadAvatar: (file: any, id: IdFiledType):Promise<AxiosResponse> => {
        return instance.post(`users/uploadAvatar`, {file: file, id: id}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    updateEmail: (id: IdFiledType, newEmail: string):Promise<AxiosResponse> => {
        return instance.post('users/updateEmail', {id: id, newEmail: newEmail})
    },
    updatePassword: (id: IdFiledType, oldPass: string, newPass: string):Promise<AxiosResponse> => {
        return instance.post('users/updatePassword', {id: id, oldPass: oldPass, newPass: newPass})
    },
    singUpNewUser: (name: string, email: string, password: string):Promise<AxiosResponse> => {
        return instance.post('users/singUpNewUser', {name: name, email: email, password: password})
    },
}

export const descriptionAPI = {
    getDescription: ():Promise<any> => {
        return instance.get(`description/getDescription`);
    },
    setDescription: (title: string,/* photo: string,*/ description: string):Promise<AxiosResponse> => {
        return instance.post(`description/setDescription`, {title: title, /*photo: photo, */description: description});
    },
    getDescriptionPhoto: ():Promise<any> => {
        return instance.get('description/getDescriptionPhoto');
    },
    setDescriptionPhoto: (file:any):Promise<AxiosResponse> => {
        return instance.post(`description/setDescriptionPhoto`, {file: file}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
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