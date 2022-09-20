import {CategoryType, IdFiledType} from "../../features/categoriesSlice";
import {MaterialType} from "../../features/materialsSlice";
import {TaskType} from "../../features/tasksSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";

export type FavoriteContentOutputType = {
    type: "C" | "M" | "T",
    path: Array<string>,
    label: string,
}
export const FavoriteContent = (/*categories: CategoryType, materials: MaterialType, tasks: TaskType*/):Array<FavoriteContentOutputType> => {
    const favoriteIds:IdFiledType[] = useSelector((state: RootState) => state.dashboard.favoriteContent);
    const categories:CategoryType[] = useSelector((state:RootState) => state.categories.categories);
    const tasks:TaskType[] = useSelector((state:RootState) => state.tasks.tasks);
    const materials:MaterialType[] = useSelector((state:RootState) => state.materials.materials);

    const result:Array<FavoriteContentOutputType> = [];

    if (favoriteIds.length > 0 && categories.length > 0 && materials.length > 0 && tasks.length > 0) {

        categories.forEach(c => {
            if (favoriteIds.some(f => f === c.id))
                result.push({
                    type: "C",
                    path: getParents(c.parentId, categories),
                    label: c.label,
                });
        });

        materials.forEach(m => {
            if (favoriteIds.some(f => f === m.id))
                result.push({
                    type: "M",
                    path: getParents(m.parentId, categories),
                    label: m.label,
                });
        });

        tasks.forEach(t => {
            if (favoriteIds.some(f => f === t.id))
                result.push({
                    type: "T",
                    path: getParents(t.parentId, categories),
                    label: t.label,
                });
        });
    }

    /*categories.forEach(c => {
        if (favoriteIds.some(f => f === c.label))
            result.push({
                type: "C",
                path: getParents(c.parentId, categories),
                label: c.label,
            });
    });

    debugger;

    materials.forEach(m => {
        if (favoriteIds.some(f => f === m.label))
            result.push({
                type: "M",
                path: getParents(m.parentId, categories),
                label: m.label,
            });
    });

    tasks.forEach(t => {
        if (favoriteIds.some(f => f === t.label))
            result.push({
                type: "T",
                path: getParents(t.parentId, categories),
                label: t.label,
            });
    });*/

    return result;
}

const getParents = (parentId: IdFiledType, categories:CategoryType[]):Array<string> => {

    const result:Array<string> = [];
    const parentCategory = categories.find(c => c.id === parentId);
    if (parentCategory)
        result.push(parentCategory.label);
    return result;
}