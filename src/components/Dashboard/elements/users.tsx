import React, {ChangeEvent, useEffect, useState} from "react";
import Accordion from "@mui/material/Accordion";
import s1 from "../styles.module.css";
import s2 from "./elements.module.css";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import {IdFiledType} from "../../../store/features/categoriesSlice";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {searchFieldChange, UserType} from "../../../store/features/usersSlice";
import {getUsersThunk} from "../../../store/features/usersThunks";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import Preloader from "../../common/Preloader";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom";

const Users = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getUsersThunk());
    }, []);

    const [selectedId, setSelectedId] = useState<IdFiledType>('');
    const isLoading: boolean = useSelector((state: RootState) => state.users.isLoading);
    const searchField: string = useSelector((state: RootState) => state.users.searchField);
    const users: UserType[] = useSelector((state: RootState) => state.users.users)
        .filter(user => user.name.toLowerCase().includes(searchField.toLowerCase())
            || user.email.toLowerCase().includes(searchField.toLowerCase()));

    const onSearchFieldChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        dispatch(searchFieldChange(e.currentTarget.value))
    }
    //const isLoading: boolean = false;

    return <>
        {
            isLoading
                ? <Preloader/>
                : <div className={s2.div1}>
                    <Accordion className={s1.accordion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant={'h5'}>Пользователи</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={s1.search_div}>
                            <TextField
                                label="Поиск"
                                variant="standard"
                                value={searchField}
                                onChange={(e) => onSearchFieldChange(e)}
                                className={s1.searchField}
                            />
                        </div>

                        {
                            users.map((user, index) => {
                                return <div key={user.userId}
                                            onClick={() => setSelectedId(user.userId)}
                                            className={String(user.userId) === String(selectedId) ? (s1.lineDiv + ' ' + s1.lineDiv_selected) : s1.lineDiv}
                                >
                                    <div className={s1.sdiv_left}>
                                        <div>
                                            {user.isAdmin && <ManageAccountsIcon/>}
                                        </div>
                                        <div>
                                            <b>{user.name}</b>
                                        </div>
                                        <div>
                                            {user.email}
                                        </div>
                                        <div>
                                            <LibraryBooksIcon
                                                cursor={'pointer'}
                                                onClick={() => navigate('/user/'+user.userId)}
                                            />
                                        </div>
                                    </div>
                                    {/*<div>
                                        <ManageAccountsIcon/>
                                    </div>*/}
                                </div>
                            })
                        }
                    </AccordionDetails>
                </Accordion>
                </div>
        }


    </>
}

export default Users;