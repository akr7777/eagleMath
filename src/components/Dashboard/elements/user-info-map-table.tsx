import s2 from "../styles.module.css";
import s1 from "./elements.module.css";
import {Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, {useState} from "react";
import {changeNoteStatusThunk, deleteNoteThunk, NoteType} from "../../features/dashboardSlice";
import {IdFiledType} from "../../features/categoriesSlice";
import {useAppDispatch} from "../../../store/store";

type UserInfoMapTablePropsType = {
    notes: Array<NoteType>,
    userId: IdFiledType,
}
const UserInfoMapTable = (props: UserInfoMapTablePropsType) => {
    const dispatch = useAppDispatch();
    const [selectedId, setSelectedId] = useState<IdFiledType>('');

    const changeNoteTitleClickHandler = () => {

    }
    const changeNoteStatus = (noteId: IdFiledType, newStatus: boolean) => {
        dispatch(changeNoteStatusThunk({
            userId: props.userId,
            noteId,
            newStatus
        }));
    }
    const deleteNoteClickHandler = (noteId: IdFiledType) => {
        dispatch(deleteNoteThunk({
            userId: props.userId,
            noteId
        }));
    }
    return <>
        <table className={s1.table_body}>
            <tbody className={s1.table_body}>
            {
                props.notes.map(note => {
                    return <tr onClick={() => setSelectedId(note.noteId)}>
                        <td align={"left"} className={note.noteId === selectedId ? s1.td_selected + " " + s1.col1_first : s1.col1_first}>
                            <Typography><b>{note.title}</b></Typography>
                        </td>

                        <td align={"left"} className={note.noteId === selectedId ? s1.col1_ordinary + " " + s1.td_selected : s1.col1_ordinary}>
                            <Typography>{note.text}</Typography>
                        </td>
                        <td className={note.noteId === selectedId ? s1.td_selected + " " + s1.col1_small : s1.col1_small}>
                            <DeleteIcon onClick={() => deleteNoteClickHandler(note.noteId)}/>
                        </td>


                        <td className={note.noteId === selectedId ? s1.td_selected + " " + s1.col1_latest : s1.col1_latest}>{
                            note.isActive
                                ? <div className={s1.div4}>
                                    <CheckBoxOutlineBlankIcon onClick={() => changeNoteStatus(note.noteId, false)}/>
                                </div>
                                : <div className={s1.div4}>
                                    <CheckBoxIcon onClick={() => changeNoteStatus(note.noteId, true)}/>
                                </div>
                        }</td>
                    </tr>

                })
            }
            </tbody>
        </table>


    </>
}

export default UserInfoMapTable;
