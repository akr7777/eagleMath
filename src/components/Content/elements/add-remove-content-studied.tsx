import Switch from '@mui/material/Switch';
import {ChangeEvent, useEffect, useState} from "react";
import s from "../content.module.css";
import Typography from "@mui/material/Typography";
import {setMaterialStudiedThunk} from "../../features/contentSlice";
import {useAppDispatch} from "../../../store/store";
import {IdFiledType} from "../../features/categoriesSlice";

type AddRemoveContentStudiedPropsType = { userId: IdFiledType, contentId: IdFiledType, isMaterialStudied: boolean }

const AddRemoveContentStudied = (props: AddRemoveContentStudiedPropsType) => {
    const dispatch = useAppDispatch();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        //window.alert(event.target.checked);
        dispatch(setMaterialStudiedThunk({userId: props.userId, contentId: props.contentId, value: event.target.checked}));
    };

    return <div className={s.add_remove_content_studied}>
        <Typography>Материал изученный: </Typography>
        <Switch
            checked={props.isMaterialStudied}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    </div>
}

export default AddRemoveContentStudied;