import {useAppDispatch} from "../../store/store";
import {renameMaterialThunk} from "../../store/features/tasksThunks";
import {IdFiledType} from "../../store/features/categoriesSlice";

const CorrectContentName = (contentId: IdFiledType, newName: string) => {
    const dispatch = useAppDispatch();
    dispatch(renameMaterialThunk({contentId, newName}));
}

export default CorrectContentName;