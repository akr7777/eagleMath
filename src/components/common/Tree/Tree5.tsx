import s from './tree5.module.css';
import {
    IdFiledType,
    MaterialType
} from "../../features/materialsSlice";
import PlusIcon from '@mui/icons-material/ControlPoint';
import MinusIcon from '@mui/icons-material/RemoveCircleOutline';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import React, {useState} from "react";
import {RootState, useAppDispatch} from "../../../store/store";
import {useSelector} from "react-redux";
import {TaskType} from "../../features/tasksSlice";
import {addToShownCats, deleteFromShownCats} from "../../features/categoriesSlice";
import {CategoryType} from "../../features/categoriesSlice";
import Line, {contentTypeType} from "../line";

export type CategoryLongType = {id: IdFiledType, parentId: IdFiledType, label: string, items: Array<CategoryLongType>}

type DataMutationPropsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType> | Array<TaskType>,
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

type DrawTreePropsType = {
    items: Array<CategoryLongType>,
    isShowArr: Array<IdFiledType>,

    selectedId: string | number,
    setSelected: (id: IdFiledType) => void,

    materialsIds: Array<IdFiledType>,

    plusIconClick: (id: IdFiledType) => void,
    minusIconClick: (id: IdFiledType) => void,

    contentType: contentTypeType,
}
const DrawTree: React.FC<DrawTreePropsType> = ({
                                                   items, isShowArr,
                                                   selectedId, setSelected,
                                                   materialsIds,
                                                   plusIconClick, minusIconClick,
                                                   contentType
                                               }) => {

    return <div className={s.treeLeaf}>
        {
            items.map(item => {
                const isHidden = !isShowArr.some(el => el == item.id);
                const isMaterial = materialsIds.some(mid => mid == item.id);
                return <div key={item.id} className={s.leafAndChildren}>

                    {/* Содержание линии */}
                    <div onClick={() => setSelected(item.id)}
                         className={String(item.id) === String(selectedId) ? (s.treeLine + ' ' + s.selectedLine) : s.treeLine}
                    >
                        {/*Plus or minus or material ICON*/}
                        {
                            (item.items.length > 0 && isHidden)
                                ? <PlusIcon onClick={() => plusIconClick(item.id)}/>
                                : isMaterial
                                    ? <NewspaperIcon/>
                                    : <MinusIcon onClick={() => minusIconClick(item.id)}/>
                        }


                        <Line
                            contentId={item.id}
                            label={item.label}
                            isMaterial={isMaterial}
                            contentType={contentType}
                        />

                    </div>
                    <div hidden={isHidden}>
                        {
                            item.items && DrawTree({
                                items: item.items,
                                isShowArr: isShowArr,
                                selectedId: selectedId,
                                materialsIds: materialsIds,
                                plusIconClick: plusIconClick,
                                minusIconClick: minusIconClick,
                                setSelected: setSelected,
                                contentType: contentType,
                            })
                        }
                    </div>
                </div>
            })
        }
    </div>
}

type TreePropsType = {
    categories: Array<CategoryType>,
    materials: Array<MaterialType>,
    contentType: contentTypeType,
}
export const Tree5: React.FC<TreePropsType> = (props) => {
    const dispatch = useAppDispatch();
    const nodeData0 = dataMutation({
        materials: props.materials,
        categories: props.categories,
    });
    const isShowArr = useSelector((state: RootState) => state.categories.isShownCats);
    const plusIconClick = (id: IdFiledType) => {
        dispatch(addToShownCats(id))
    }
    const minusIconClick = (id: IdFiledType) => {
        dispatch(deleteFromShownCats(id))
    }
    const [selectedId, setSelectedId] = useState<IdFiledType>('');
    const materialIds: Array<IdFiledType> = [...props.materials.map(m => m.id)];

    return <div className={s.wrappedDiv}>
        {
            DrawTree({
                items: nodeData0,
                isShowArr: isShowArr,
                selectedId: selectedId,
                materialsIds: materialIds,
                plusIconClick: plusIconClick,
                minusIconClick: minusIconClick,
                setSelected: setSelectedId,
                contentType: props.contentType,
            })
        }
    </div>

}


