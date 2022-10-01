import axios, {AxiosResponse} from "axios";
import {IdFiledType} from "../features/categoriesSlice";
import {ContentType} from "../features/contentSlice";

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


export const ContentAPI = {
    getAllMaterials: ():Promise<AxiosResponse> => {
        //console.log('MaterialsAPI / getAllMaterials / instance.get(`materials/getAllMaterials`)= ', instance.get(`materials/getAllMaterials`));
        return instance.get(`content/getAllMaterials`);
    },
    getAllTasks: ():Promise<AxiosResponse> => {
        //console.log('MaterialsAPI / getAllMaterials / instance.get(`materials/getAllMaterials`)= ', instance.get(`materials/getAllMaterials`));
        return instance.get(`content/getAllTasks`);
    },

    getFavoriteContent: (userId: IdFiledType): Promise<AxiosResponse> => {
        return instance.post(`content/getFavorites`, {userId: userId});
    },
    addToFavorites: (userId: IdFiledType, contentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/addContentToFavorites', {userId: userId, contentId: contentId});
    },
    deleteFromFavorites: (userId: IdFiledType, contentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/deleteContentFromFavorites', {userId: userId, contentId: contentId});
    },
    getContent: (contentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.get('content/getContent/'+contentId);
    },
    setContent: (content: ContentType[], contentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/setContent', {content: content, contentId: contentId})
    },
    uploadContentImage: (file: any, fileName: string):Promise<AxiosResponse> => {
        //console.log('api / uploadContentImage / file=', file)
        return instance.post('content/setContentImage', {file: file, fileName: fileName}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}

export const CategoriesAPI = {
    getAllcategories: ():Promise<AxiosResponse> => {
        return instance.get(`content/getAllCategories`);
    },
}

export const authAPI = {
    login: (email: string, password: string):Promise<AxiosResponse> => {
        return instance.post(`auth/login`, {email: email, password: password});
    },
    logout: ():Promise<AxiosResponse> => {
        return instance.post('auth/logout', {});
    },
    refresh: () => {
        return instance.get('auth/refresh');
    },
    uploadAvatar: (file: any, id: IdFiledType):Promise<AxiosResponse> => {
        return instance.post(`auth/uploadAvatar`, {file: file, id: id}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    updateEmail: (id: IdFiledType, newEmail: string):Promise<AxiosResponse> => {
        return instance.post('users/updateEmail', {id: id, newEmail: newEmail})
    },
    updatePassword: (id: IdFiledType, oldPass: string, newPass: string):Promise<AxiosResponse> => {
        return instance.post('auth/updatePassword', {id: id, oldPass: oldPass, newPass: newPass})
    },
    registration: (name: string, email: string, password: string):Promise<AxiosResponse> => {
        return instance.post('auth/registration', {name: name, email: email, password: password})
    },
}

export const descriptionAPI = {
    getDescription: ():Promise<any> => {
        return instance.get(`content/getDescription`);
    },
    setDescription: (title: string,/* photo: string,*/ description: string):Promise<AxiosResponse> => {
        return instance.post(`content/setDescription`, {title: title, /*photo: photo, */description: description});
    },
    getDescriptionPhoto: ():Promise<any> => {
        return instance.get('content/getDescriptionPhoto');
    },
    setDescriptionPhoto: (file:any):Promise<AxiosResponse> => {
        return instance.post(`content/setDescriptionPhoto`, {file: file}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
}

export const contactsAPI = {
    getContacts: () => {
        return instance.get(`content/getContacts`);
    },
    setContacts: (title: string, description: string, phone: string, telegram: string, whatsapp: string, email: string, skype: string) => {
        return instance.post(`content/setContacts`, {
            title: title, description: description, phone: phone,
            telegram: telegram, whatsapp: whatsapp, email: email, skype: skype
        });
    }
}

