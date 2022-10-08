import s1 from "./elements.module.css";
import {Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, {useState} from "react";
import {
    changeNoteStatusThunk,
    changeNoteTextOrTitleThunk,
    deleteNoteThunk,
    NoteType
} from "../../features/dashboardSlice";
import {IdFiledType} from "../../features/categoriesSlice";
import {useAppDispatch} from "../../../store/store";
import TextField from '@mui/material/TextField';

type UserInfoMapTablePropsType = {
    notes: Array<NoteType>,
    userId: IdFiledType,
}
const UserInfoMapTable = (props: UserInfoMapTablePropsType) => {
    const dispatch = useAppDispatch();
    const [selectedId, setSelectedId] = useState<IdFiledType>('');
    const [titleChangeId, setTitleChangeId] = useState<IdFiledType>('');
    const [textChangeId, setTextChangeId] = useState<IdFiledType>('');

    const [newTextTitleValue, setNewTextTitleValue] = useState<string>('');


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
    const changeTitleOrTextHandler = (noteId: IdFiledType, type: 'Title' | 'Text') => {
        //alert(noteId + " " + type + " " + newTextTitleValue);
        dispatch(changeNoteTextOrTitleThunk({userId: props.userId, noteId, type, newTextTitleValue}));
        setTitleChangeId('');
        setTextChangeId('');
    }
    /*const toChangeTextHandler = () => {
        alert(textChangeId);
        setTextChangeId('');
    }*/

    return <>
        <table className={s1.table_body}>
            <tbody className={s1.table_body}>
            {
                props.notes.map(note => {
                    return <tr onClick={() => setSelectedId(note.noteId)}>

                        {/*TITLE*/}
                        <td align={"left"}
                            className={note.noteId === selectedId ? s1.td_selected + " " + s1.col1_first : s1.col1_first}
                            onDoubleClick={() => {
                                setTitleChangeId(note.noteId);
                                setNewTextTitleValue(note.title);
                            }}
                            onBlur={() => changeTitleOrTextHandler(note.noteId, "Title")}
                        >
                            {
                                titleChangeId === note.noteId
                                    ? <TextField label="Заголовок" variant="standard" multiline
                                                 value={newTextTitleValue}
                                                 maxRows={5} className={s1.text_field}
                                                 onChange={(e) => setNewTextTitleValue(e.currentTarget.value)}
                                    />
                                    : <Typography><b>{note.title}</b></Typography>
                            }
                        </td>

                        {/*TEXT*/}
                        <td align={"left"}
                            className={note.noteId === selectedId ? s1.col1_ordinary + " " + s1.td_selected : s1.col1_ordinary}
                            onDoubleClick={() => {
                                setTextChangeId(note.noteId);
                                setNewTextTitleValue(note.text);
                            }}
                            onBlur={() => changeTitleOrTextHandler(note.noteId, "Text")}
                        >
                            {
                                textChangeId === note.noteId
                                    ?
                                    <TextField label="Текст" variant="standard" multiline maxRows={5}
                                               value={newTextTitleValue}
                                               className={s1.text_field}
                                               onChange={(e) => setNewTextTitleValue(e.currentTarget.value)}
                                    />
                                    : <Typography><b>{note.text}</b></Typography>
                            }
                        </td>

                        {/*<td className={note.noteId === selectedId ? s1.td_selected + " " + s1.col1_small : s1.col1_small}>
                            <DeleteIcon onClick={() => deleteNoteClickHandler(note.noteId)}/>
                        </td>*/}

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
