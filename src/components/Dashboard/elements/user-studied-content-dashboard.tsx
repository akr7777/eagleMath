import s2 from "./elements.module.css";
import Accordion from "@mui/material/Accordion";
import s1 from "../styles.module.css";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import LinearProgress from "@mui/material/LinearProgress";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import TestResultDashboardUserChoose from "./test-result-dashboard-user-choose";
import {IdFiledType} from "../../features/categoriesSlice";
import {UserType} from "../../features/usersSlice";
import {
    getFullStudiedContentThunk,
    getUserListThunk,
    StudiesContentType
} from "../../features/dashboardSlice";
import {getStudiedMaterialsThunk} from "../../features/contentSlice";
import TextField from "@mui/material/TextField";
import ReadThisMaterial from "@mui/icons-material/AutoStories";
import {NavLink} from "react-router-dom";
import {PATHS} from "../../AppBar/AppBar";


const UserStudiedContentDashboard = () => {
    const dispatch = useAppDispatch();
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const isLoading = useSelector((state: RootState) => state.dashboard.loading.studiedContentLoading);

    const uid: IdFiledType = useSelector((state: RootState) => state.auth.user.id);
    const [userId, setUserId] = useState<IdFiledType>(uid);
    if (uid !== '0' && userId === '0') setUserId(uid);
    //console.log('UserStudiedContentDashboard / uid=', uid, 'userId=', userId);

    useEffect(() => {
        dispatch(getUserListThunk());
        dispatch(getStudiedMaterialsThunk(userId));
        dispatch(getFullStudiedContentThunk(userId));
    }, [userId]);

    const userList: UserType[] = useSelector((state: RootState) => state.dashboard.userList);
    const [searchField, setSearchField] = useState<string>('');
    const studiedMaterialContent: Array<StudiesContentType> = useSelector((state: RootState) => state.dashboard.studiedMaterialContent)
        .filter(elem => elem.content.toLowerCase().includes(searchField.toLowerCase()));

    const [selectedId, setSelectedId] = useState<IdFiledType>('');

    return <div className={s2.div1}>
        <Accordion className={s1.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h5'}>Изученные материалы</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {isAdmin && <TestResultDashboardUserChoose setUserId={setUserId} userList={userList} userId={userId}/>}
                {
                    isLoading
                        ? <LinearProgress/>
                        : <div>
                            <div className={s1.search_div}>
                                <TextField
                                    label="Поиск"
                                    variant="standard"
                                    value={searchField}
                                    onChange={(e) => setSearchField(e.currentTarget.value)}
                                    className={s1.searchField}
                                />
                            </div>

                            { studiedMaterialContent.length <= 0 && <Typography>У пользователя нет изученных материалов</Typography> }

                            <div className={s2.test_results_filter_div}>
                            {
                                studiedMaterialContent.length > 0 && studiedMaterialContent.map(c =>
                                        <div key={c.contentId}
                                             onClick={() => setSelectedId(c.contentId)}
                                             className={String(c.contentId) === String(selectedId) ? (s1.lineDiv2 + ' ' + s1.lineDiv_selected) : s1.lineDiv2}
                                        >
                                            <Typography>{c.content}</Typography>
                                            {
                                                String(c.contentId) === String(selectedId) &&
                                                    <NavLink to={PATHS.content+"/"+c.contentId}>
                                                        <ReadThisMaterial/>
                                                    </NavLink>
                                            }
                                        </div>)
                            }
                        </div>

                        </div>
                }

            </AccordionDetails>
        </Accordion>

    </div>
}

export default UserStudiedContentDashboard;