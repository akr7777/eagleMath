import {IdFiledType} from "../../features/tasksSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

export const Change = (id: IdFiledType) => {
    const materials = [...useSelector( (state:RootState) => state.materials.materials)].map(el => el.id);
    const tasks = [...useSelector((state: RootState) => state.tasks.tasks)].map(el => el.id);
    const categories = useSelector((state: RootState) => state.categories)
}

