import {CategoryType, IdFiledType} from "../../../store/features/categoriesSlice";
import {TaskType} from "../../../store/features/tasksSlice";

export type CategoryLongType = {id: IdFiledType, parentId: IdFiledType, label: string, items: Array<CategoryLongType>}

type DataMutationPropsType = {
    categories: Array<CategoryType>,
    materials: Array<TaskType>,
}

export function dataMutation(props: DataMutationPropsType):CategoryLongType[] {
    //add items to every category
    let categories1:Array<CategoryLongType> = [];
    [...props.categories].forEach(c => {
        categories1.push({id: c.id, parentId: c.parentId, label: c.label, items: []});
    });
    [...props.materials].forEach(m => {
        categories1 = [...categories1, {id: m.id, parentId: m.parentId, label: m.label, items: []}]
    });

    //For the first we add materials fileds in items object of the categories
    const nodeData:Array<CategoryLongType> = [...categories1.map(c => {
        c.items = [...categories1.filter(sc => String(c.id) === String(sc.parentId))];
        return c;
    })].filter(pc => pc.parentId === null || String(pc.parentId) === "0")

    return nodeData;
}
