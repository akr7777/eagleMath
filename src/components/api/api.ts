import axios, {AxiosResponse} from "axios";
import {IdFiledType} from "../../store/features/categoriesSlice";
import {ContentType} from "../../store/features/contentSlice";
import {NoteType} from "../../store/features/dashboardSlice";
import {ObjectiveType, TestContentType} from "../../store/features/tasksSlice";
import {ObjectiveResultType, TestResultType} from "../../store/features/tasksThunks"
import {baseSiteURL} from "../../env";

//const accessToken = localStorage.getItem("accessToken") || "";

const instance = axios.create({
    withCredentials: true,
    baseURL: baseSiteURL,
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
        return instance.post('content/setContentImage', {file: file, fileName: fileName}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    renameMaterial: (contentId: IdFiledType, newName: string):Promise<AxiosResponse> => {
        return instance.post('content/renameContent', {contentId, newName});
    },
    changeParentId: (contentId: IdFiledType, newParentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/changeParentId', {contentId, newParentId});
    },
    deleteContent: (contentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/deleteContent', {contentId});
    },
    contentType: (contentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/getContentType', {contentId});
    },
    addMaterial: (parentContentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/addMaterial', {parentContentId});
    },
    addTask: (parentContentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/addTask', {parentContentId});
    },
    addCategory: (parentContentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/addCategory', {parentContentId});
    },
    deleteCategory: (contentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/deleteCategory', {contentId});
    },
    moveParagraph: (contentId: IdFiledType, elementIndex: number, direction: "up"|"down"):Promise<AxiosResponse> => {
        return instance.post('content/moveParagraph', {contentId: contentId, elementIndex:elementIndex, direction:direction});
    },

    studiedMaterials: (userId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('content/studiedMaterials', {userId: userId});
    },
    setMaterialStudied: (userId: IdFiledType, contentId: IdFiledType, value: boolean):Promise<AxiosResponse> => {
        return instance.post('content/setMaterialStudied', {userId: userId, contentId: contentId, value: value});
    },
    getFullStudiedContent: (userId: IdFiledType): Promise<AxiosResponse> => {
        return instance.post('content/getFullStudiedContent', {userId: userId});
    },
    getContentTitleById: (contentId: IdFiledType): Promise<AxiosResponse> => {
        return instance.post('content/getContentTitleById', {contentId: contentId});
    }
}

export const NotesAPI = {
    setNotes: (userId: IdFiledType, notes: NoteType[]):Promise<AxiosResponse> => {
        return instance.post('notes/setNotes', {userId, notes});
    },
    getNotes: (userId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('notes/getNotes', {userId});
    },
    changeNoteStatus: (userId: IdFiledType, noteId: IdFiledType, newStatus: boolean):Promise<AxiosResponse> => {
        return instance.post('notes/changeNoteStatus', {userId, noteId, newStatus});
    },
    deleteNote: (userId: IdFiledType, noteId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('notes/deleteNote', {userId, noteId});
    },
    changeNoteTitle: (userId: IdFiledType, noteId: IdFiledType, newTextTitleValue: string):Promise<AxiosResponse> => {
        return instance.post('notes/changeNoteTitle', {userId, noteId, newTextTitleValue});
    },
    changeNoteText: (userId: IdFiledType, noteId: IdFiledType, newTextTitleValue: string):Promise<AxiosResponse> => {
        return instance.post('notes/changeNoteText', {userId, noteId, newTextTitleValue});
    },
}

export const testAPI = {
    getTests: (contentId: IdFiledType):Promise<AxiosResponse> => {
        return instance.get('test/getTest?contentId='+contentId);
    },
    getTestById: (testId: string):Promise<AxiosResponse> => {
        return instance.get('test/getTest?testId='+testId);
    },
    setTestResult: (data: TestResultType):Promise<AxiosResponse> => {
        return instance.post('test/setTestResults', {...data});
    },
    getAllTestsContentIds: ():Promise<AxiosResponse> => {
        return instance.get('test/getAllTestsContentIds');
    },
    addNewTestToDataBase: (title: string, contentId: IdFiledType, content:Array<TestContentType>):Promise<AxiosResponse> => {
        return instance.post('test/addNewTestToDataBase', {title: title, contentId: contentId, content: content});
    },
    editTestInDataBase: (testId: string, title: string, contentId: IdFiledType, content:Array<TestContentType>):Promise<AxiosResponse> => {
        return instance.post('test/editTestInDataBase', {testId: testId, title: title, contentId: contentId, content: content});
    },
    getTestResultsByUserId: (userId: IdFiledType): Promise<AxiosResponse> => {
        return instance.post('test/getTestResultsByUserId', {userId: userId});
    }
}

export const objectiveAPI = {
    getObjectiveByContentId: (contentId: IdFiledType): Promise<AxiosResponse> => {
        return instance.post('objectives/getObjectiveByContentId', {contentId: contentId})
    },
    addNewObjective: (data: ObjectiveType): Promise<AxiosResponse> => {
        console.log('objectiveAPI / addNewObjective / data=', data)
        return instance.post('objectives/addObjective', {...data}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    setObjectiveResult:(data: ObjectiveResultType): Promise<AxiosResponse> => {
        return instance.post('objectives/setObjectiveResult', {...data})
    },
    getObjectiveResultsByUserId: (userId: IdFiledType): Promise<AxiosResponse> => {
        return instance.post('objectives/getObjectiveResultsByUserId', {userId: userId});
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
    getContacts: ():Promise<AxiosResponse> => {
        return instance.get(`content/getContacts`);
    },
    setContacts: (title: string, description: string, phone: string, telegram: string, whatsapp: string, email: string, skype: string):Promise<AxiosResponse> => {
        return instance.post(`content/setContacts`, {
            title: title, description: description, phone: phone,
            telegram: telegram, whatsapp: whatsapp, email: email, skype: skype
        });
    }
}

export const usersAPI = {
    getUsers: () => {
        return instance.get(`users/getUsers`);
    },
    getOneUser: (userId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('users/getOneUser', {userId});
    },
    deleteUser: (userId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('users/deleteUser', {userId});
    },
    makeUserAdmin: (userId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('users/makeUserAdmin', {userId})
    },
    makeUserAsUser: (userId: IdFiledType):Promise<AxiosResponse> => {
        return instance.post('users/makeUserAsUser', {userId})
    }
}

