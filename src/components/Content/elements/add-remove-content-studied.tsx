import Switch from '@mui/material/Switch';
import {ChangeEvent} from "react";
import s from "../content.module.css";
import Typography from "@mui/material/Typography";
import {setMaterialStudiedThunk} from "../../../store/features/contentThunks";
import {RootState, useAppDispatch} from "../../../store/store";
import {IdFiledType} from "../../../store/features/categoriesSlice";
import {useSelector} from "react-redux";

type AddRemoveContentStudiedPropsType = {
    userId: IdFiledType,
    contentId: IdFiledType,
}

const AddRemoveContentStudied = (props: AddRemoveContentStudiedPropsType) => {
    const dispatch = useAppDispatch();
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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