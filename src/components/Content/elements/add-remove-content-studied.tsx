import Switch from '@mui/material/Switch';
import {ChangeEvent, useEffect, useState} from "react";
import s from "../content.module.css";
import Typography from "@mui/material/Typography";
import {setMaterialStudiedThunk} from "../../features/contentSlice";
import {RootState, useAppDispatch} from "../../../store/store";
import {IdFiledType} from "../../features/categoriesSlice";
import {useSelector} from "react-redux";

type AddRemoveContentStudiedPropsType = {
    userId: IdFiledType,
    contentId: IdFiledType,
    //isMaterialStudied: boolean
}

const AddRemoveContentStudied = (props: AddRemoveContentStudiedPropsType) => {
    const dispatch = useAppDispatch();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        //window.alert(event.target.checked);
        dispatch(setMaterialStudiedThunk({userId: props.userId, contentId: props.contentId, value: event.target.checked}));
    };
    const studiedMaterials: Array<IdFiledType> = useSelector((state: RootState) => state.content.studiedMaterials);

    return <div className={s.add_remove_content_studied}>
        <Typography>Материал изученный: </Typography>
        <Switch
            checked={studiedMaterials.some(elem => elem === props.contentId)}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
}

export default AddRemoveContentStudied;