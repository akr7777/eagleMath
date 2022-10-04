import {useAppDispatch} from "../../store/store";
import {renameMaterialThunk} from "../features/materialsSlice";
import {IdFiledType} from "../features/categoriesSlice";

const CorrectContentName = (contentId: IdFiledType, newName: string) => {
    const dispatch = useAppDispatch();
    dispatch(renameMaterialThunk({contentId, newName}));
}

export default CorrectContentName;