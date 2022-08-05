import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

/*export type AuthorType = {
    photoURL: string,
    description: string,
}
let initialState:AuthorType = {
    photoURL: 'https://avatars.mds.yandex.net/get-zen_doc/105853/pub_5b93dbff602fad00ad9a7e33_5b93f99a47a3c100aa992665/scale_1200',
    description: 'this is a new desc from store!'
}*/

type InitAuthorContentType = {
    title: string;
    photoURL: string;
    description: string;
}
const initContent: InitAuthorContentType = {
    title: 'This is description',
    photoURL: 'https://avatars.mds.yandex.net/get-zen_doc/105853/pub_5b93dbff602fad00ad9a7e33_5b93f99a47a3c100aa992665/scale_1200',
    //photoURL: 'https://scontent-ams4-1.xx.fbcdn.net/v/t1.6435-9/170127601_2253738874757989_2747120576177691105_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Eg8WK2qGxzUAX_k_lO_&_nc_ht=scontent-ams4-1.xx&oh=00_AT87GXPH2usoyIao2XVFeKFHkTMAcx8Xx5wCEovfkKG44Q&oe=63116F67',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n' +
        '                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n' +
        '                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n' +
        '                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
}

export const authorSlice = createSlice({
    name: 'author',
    initialState: initContent,
    reducers: {
        setTitleAC: (state:InitAuthorContentType, action:PayloadAction<string>):void => {
            state.title = action.payload;
        },
        setPhotoURLAC: (state:InitAuthorContentType, action: PayloadAction<string>):void => {
            state.photoURL = action.payload;
        },
        setDescriptionAC: (state:InitAuthorContentType, action: PayloadAction<string>):void => {
            state.description = action.payload;
        },
    }
})
export const {setTitleAC, setPhotoURLAC, setDescriptionAC} = authorSlice.actions;

export default authorSlice.reducer;