import s1 from "./elements.module.css";
import s2 from '../styles.module.css';
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import Accordion from "@mui/material/Accordion";
import React, {useEffect, useState} from "react";
import {IdFiledType} from "../../../store/features/categoriesSlice";
import {
    changeNoteStatusThunk,
    changeSearchText, deleteNoteThunk,
    getNotesThunk,
    NoteType,
    setNotesThunk
} from "../../../store/features/dashboardSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {v4} from "uuid";
import Button from "@mui/material/Button";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import UserInfoNotesFilters from "./user-info-notes-filters";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import UserInfoMapTable from "./user-info-map-table";

type NotesPropsType = { userId: IdFiledType }

const Notes = (props: NotesPropsType) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getNotesThunk(props.userId));
    }, [props.userId])

    const searchText = useSelector((state: RootState) => state.dashboard.searchNotesField);
    let notes: Array<NoteType> = useSelector((state: RootState) => state.dashboard.notes)
        .filter(note => note.title.toLowerCase().includes(searchText.toLowerCase())
            || note.text.toLowerCase().includes(searchText.toLowerCase()));

    //console.log('user-info-notes.tsx / Notes / notes = ', notes)

    const notesStatus = useSelector((state: RootState) => state.dashboard.notesStatus);
    if (notesStatus === "Active")
        notes = notes.filter(note => note.isActive);
    if (notesStatus === "Completed")
        notes = notes.filter(note => !note.isActive);

    /*const [selectedId, setSelectedId] = useState<IdFiledType>('');*/


    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [addTitle, setAddTitle] = useState('');
    const [addText, setAddText] = useState('');

    const addNoteClickHandler = () => {
        const newNote: NoteType = {
            noteId: v4(),
            title: addTitle,
            text: addText,
            isActive: true,
        }
        dispatch(setNotesThunk({
            userId: props.userId,
            notes: [...notes, newNote]
        }));
        setAddTitle('');
        setAddText('');
        setShowAdd(false);
    }
    /*const changeNoteTitleClickHandler = () => {

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
    }*/


    return <div className={s1.div1}>
        <Accordion className={s2.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h5'}>Заметки</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <div className={s2.search_div}>
                    <TextField
                        label="Поиск"
                        variant="standard"
                        value={searchText}
                        onChange={(e) => dispatch(changeSearchText(e.currentTarget.value))}
                        className={s2.searchField}
                    />


                    <UserInfoNotesFilters/>

                </div>


                <div className={s1.div2_1}>
                    {/*{
                        notes.map(note => {
                            //console.log(note.noteId, note.title, note.text, note.isActive)
                            return <div key={note.noteId}
                                        onClick={() => setSelectedId(note.noteId)}
                                        className={String(note.noteId) === String(selectedId) ? (s2.lineDiv + ' ' + s2.lineDiv_selected) : s2.lineDiv}
                            >
                                {note.noteId}
                                <div className={s1.div4}>
                                    <Typography><b>{note.title}</b></Typography>
                                </div>
                                <div className={s1.div4}>
                                    <Typography>{note.text}</Typography>
                                </div>


                                <DeleteIcon onClick={() => deleteNoteClickHandler(note.noteId)}/>
                                {
                                    note.isActive
                                        ? <div className={s1.div4}>
                                            <CheckBoxOutlineBlankIcon onClick={() => changeNoteStatus(note.noteId, false)}/>
                                        </div>
                                        : <div className={s1.div4}>
                                            <CheckBoxIcon onClick={() => changeNoteStatus(note.noteId, true)}/>
                                        </div>
                                }

                            </div>
                        })
                    }
*/}

                    <UserInfoMapTable notes={notes} userId={props.userId}/>

                    {!showAdd && <div className={s1.div3}>
                        <AddIcon onClick={() => setShowAdd(true)} cursor={'pointer'}/>
                    </div>
                    }
                    {showAdd && <div className={s1.div3}>
                        <RemoveIcon onClick={() => setShowAdd(false)} cursor={'pointer'}/>
                    </div>
                    }

                    {showAdd && <div className={s1.div3}>
                        <TextField
                            className={s2.max_width}
                            label="Заголовок"
                            variant="outlined"
                            value={addTitle}
                            onChange={(e) => setAddTitle(e.currentTarget.value)}
                        />

                        <TextField
                            className={s2.max_width}
                            label="Текст"
                            variant="outlined"
                            multiline={true}
                            maxRows={10}
                            value={addText}
                            onChange={(e) => setAddText(e.currentTarget.value)}
                        />

                        <Button
                            variant={'contained'}
                            onClick={addNoteClickHandler}
                        >
                            Добавить заметку
                        </Button>
                    </div>
                    }
                </div>

            </AccordionDetails>
        </Accordion>
    </div>
}

export default Notes;