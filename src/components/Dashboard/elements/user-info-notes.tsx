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
import {IdFiledType} from "../../features/categoriesSlice";
import {getNotesThunk, NoteType, setNotesThunk} from "../../features/dashboardSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {v4} from "uuid";
import Button from "@mui/material/Button";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

type NotesPropsType = { userId: IdFiledType }

const Notes = (props: NotesPropsType) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getNotesThunk(props.userId));
    }, [props.userId])


    const notes: Array<NoteType> = useSelector((state: RootState) => state.dashboard.notes);
    const [selectedId, setSelectedId] = useState<IdFiledType>('');

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
        }))
    }

    const changeNoteTitleClickHandler = () => {

    }


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
                <div className={s1.div2_1}>
                    {
                        notes.map(note => {
                            return <div key={note.noteId}
                                        onClick={() => setSelectedId(note.noteId)}
                                        className={String(note.noteId) === String(selectedId) ? (s2.lineDiv + ' ' + s2.lineDiv_selected) : s2.lineDiv}
                            >
                                {/*{note.noteId}*/}
                                <div className={s1.div4}>
                                    <Typography><b>{note.title}</b></Typography>
                                </div>
                                <div className={s1.div4}>
                                    <Typography>{note.text}</Typography>
                                </div>

                                {
                                    note.isActive && <div className={s1.div4}>
                                        <CheckBoxOutlineBlankIcon/>
                                    </div>
                                }
                            </div>
                        })
                    }

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