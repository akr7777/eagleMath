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
import {changeSearchText, NoteType} from "../../../store/features/dashboardSlice";
import {getNotesThunk,setNotesThunk} from "../../../store/features/dashboardThunks";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {v4} from "uuid";
import Button from "@mui/material/Button";
import UserInfoNotesFilters from "./user-info-notes-filters";
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

    const notesStatus = useSelector((state: RootState) => state.dashboard.notesStatus);
    if (notesStatus === "Active")
        notes = notes.filter(note => note.isActive);
    if (notesStatus === "Completed")
        notes = notes.filter(note => !note.isActive);

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