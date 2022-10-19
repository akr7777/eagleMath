import {RootState, useAppDispatch} from "../../../../../store/store";
import {getAllTasksThunk, getAllTestsContentIdsThunk, TaskType} from "../../../../features/tasksSlice";
import {useSelector} from "react-redux";
import {ChangeEvent, useEffect, useState} from "react";
import {IdFiledType} from "../../../../features/categoriesSlice";
import s1 from "../../../content.module.css";
import Typography from "@mui/material/Typography";

type AddTestAllTasksListType = {
    currentContentId: IdFiledType,
    setCurrentContentId: (currentContentId: IdFiledType) => void,
}
const AddTestAllTasksList = (props: AddTestAllTasksListType) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllTasksThunk());
        dispatch(getAllTestsContentIdsThunk());
    }, [])

    const tasks: Array<TaskType> = useSelector((state: RootState) => state.tasks.tasks);
    const testContentIds: Array<IdFiledType> = useSelector((state: RootState) => state.tasks.testContentIds);
    const list: Array<TaskType> = tasks.filter(task => !testContentIds.includes(task.id));

    /*if (list.length > 0 && props.currentContentId === '')
        props.setCurrentContentId(list[0].id);*/

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.setCurrentContentId(e.currentTarget.value)
    }

    return <div>
        {
            list.length > 0
            ? <select
                    onChange={(e) => onSelectChange(e)}
                    className={s1.options_css}
                    defaultValue={props.currentContentId}
                >
                    <option value={""}> </option>
                    {
                        list.map(task => {
                            return <option
                                value={task.id}
                                key={task.id}
                               /* selected={task.id === props.currentContentId}*/
                            >
                                {task.label}
                            </option>
                        })
                    }
                </select>
                : <Typography>Все задачи уже включают в себя тесты</Typography>
        }

    </div>
}

export default AddTestAllTasksList;