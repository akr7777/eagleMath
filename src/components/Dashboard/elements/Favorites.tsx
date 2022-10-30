import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import {RootState, useAppDispatch} from "../../../store/store";
import {getAllTasksThunk, getAllMaterialsThunk} from "../../../store/features/tasksThunks";
import {getAllCategoriesThunk, IdFiledType} from "../../../store/features/categoriesSlice";
import {FavoriteContent, FavoriteContentOutputType} from "../utils/utils";
import s1 from '../styles.module.css';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import IconMaterial from '@mui/icons-material/AutoStories';
import IconTask from '@mui/icons-material/AppRegistration';
import Line from "../../common/line";
import s2 from "./elements.module.css"
import {getFavoritesThunk} from "../../../store/features/dashboardSlice";
import TextField from "@mui/material/TextField";
import {getStudiedMaterialsThunk} from "../../../store/features/contentThunks";
import {useSelector} from "react-redux";

type FavoriteMaterialsPropsType = {userId: IdFiledType}
const FavoriteMaterials = (props: FavoriteMaterialsPropsType) => {

    const dispatch = useAppDispatch();
    //const userId = useSelector((state: RootState) => state.auth.user.id);
    useEffect(() => {
        dispatch(getAllTasksThunk());
        dispatch(getAllMaterialsThunk());
        dispatch(getAllCategoriesThunk());
        dispatch(getFavoritesThunk(props.userId));
        dispatch(getStudiedMaterialsThunk(props.userId));
    }, [props.userId]);

    const [searchValue, setSearchValue] = useState<string>('');
    const list:Array<FavoriteContentOutputType> = FavoriteContent().filter(el => el.label.toLowerCase().includes(searchValue.toLowerCase()));
    const [selectedId, setSelectedId] = useState<IdFiledType>('');

    const studiedMaterials = useSelector((state: RootState) => state.content.studiedMaterials);
    //const isMaterialStudied = studiedMaterials.includes(props.userId)

    return <div className={s2.div1}>
        <Accordion className={s1.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h5'}>Избранные материалы</Typography>
            </AccordionSummary>
            <AccordionDetails>

                    <TextField variant={"standard"}
                               label={"Поиск"}
                               value={searchValue}
                               onChange={(e) => setSearchValue(e.currentTarget.value)}
                               className={s2.text_field_2}
                    />

                    {
                        list.map(item => {
                            return <div key={item.contentId}
                                         onClick={() => setSelectedId(item.contentId)}
                                         className={String(item.contentId) === String(selectedId) ? (s1.lineDiv + ' ' + s1.lineDiv_selected) : s1.lineDiv}
                                    >
                                        <div className={s1.sdiv_left}>
                                            {item.type === "M" && <IconMaterial/>}
                                            {item.type === "T" && <IconTask/>}
                                            <Typography variant={'overline'}>{item.path}</Typography>
                                            <Line
                                                contentId={item.contentId}
                                                label={item.label}
                                                isMaterial={true}
                                                contentType={item.type}
                                                isMaterialStudied={studiedMaterials.includes(item.contentId)}
                                            />

                                        </div>
                                    </div>
                        })
                    }
            </AccordionDetails>
        </Accordion>

    </div>
}

export default FavoriteMaterials;