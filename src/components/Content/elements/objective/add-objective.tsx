import Container from "@mui/material/Container";
import s from "../../../common/commonCSS.module.css";
import s1 from './objective.module.css';
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../store/store";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import {IdFiledType} from "../../../../store/features/categoriesSlice";
import Button from "@mui/material/Button";
import {TaskType} from "../../../../store/features/tasksSlice";
import {addNewObjectiveThunk, getAllTasksThunk} from "../../../../store/features/tasksThunks";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../../AppBar/AppBar";

const ERROR_CONTENT_ID = 'Не выбран материал для добавления задачи';
const ERROR_TITLE = 'Не указано название задачи';
const ERROR_CONTENT = 'Не указано содержание задачи';
const ERROR_ANSWER = 'Не указан ответ';
const NO_ERROR = '';

const AddObjective = () => {
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllTasksThunk());
    }, []);

    const allTasks: TaskType[] = useSelector((state: RootState) => state.tasks.tasks);

    const [contentId, setContentId] = useState<IdFiledType>('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [picture, setPicture] = useState<any>('');
    const [error, setError] = useState<string>(NO_ERROR);

    const onPictureChanging = (f: any) => {
        if (f.target.files.length > 0)
            setPicture(f.target.files[0]);
    }

    const addingNewObjective = () => {
        if (!answer) setError(ERROR_ANSWER);
        else if (!content) setError(ERROR_CONTENT);
        else if (!title) setError(ERROR_TITLE);
        else if (!contentId) setError(ERROR_CONTENT_ID);
        else {
            console.log(picture + "/////" + picture.name)
            dispatch(addNewObjectiveThunk({
                _id: '0',
                title: title,
                contentId: contentId,
                content: content,
                answer: answer.toLowerCase(),
                picture: picture.name ? picture : ""
            }));
            navigate(PATHS.tasks);
        }
    }

    return <Container className={s.wrapped_div}>
        {
            isAdmin
                ? <div className={s1.main_div}>

                    <Typography variant={'h4'}>Добавление новой задачи</Typography>

                    <div>
                        <Typography>Выберите практику, к которой надо прикрепить задачу:</Typography>
                        <select
                            className={error === ERROR_CONTENT_ID ? s1.selection + " " + s1.selection_error : s1.selection}
                            onChange={(e) => {
                                setError(NO_ERROR);
                                setContentId(e.currentTarget.value);
                            }}
                        >
                            <option value={''}></option>
                            {
                                allTasks.map(task =>
                                    <option value={task.id}
                                            className={s1.selection_option}
                                            key={task.id}
                                    >
                                        {task.label}
                                    </option>
                                )
                            }
                        </select>
                    </div>

                    <TextField variant={'outlined'}
                               label={'Название задачи'}
                               value={title}
                               onChange={(e) => {
                                   setError(NO_ERROR);
                                   setTitle(e.currentTarget.value);
                               }}
                               error={error === ERROR_TITLE}
                    />

                    {picture && <Typography>{picture.name}</Typography>}

                    <div className={s1.picture_div}>
                        <input
                            accept="image/*"
                            style={{display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={(f) => onPictureChanging(f)}
                        />
                        <label htmlFor="raised-button-file">
                            <Button component="span" variant={'contained'}>
                                Добавить рисунок
                            </Button>
                        </label>
                        <Typography variant={"body2"}>(не обязательно)</Typography>
                    </div>


                    <TextField variant={'outlined'}
                               label={'Содержание задачи'}
                               multiline
                               maxRows={10}
                               value={content}
                               onChange={(e) => {
                                   setError(NO_ERROR);
                                   setContent(e.currentTarget.value);
                               }}
                               error={error === ERROR_CONTENT}
                    />

                    <TextField variant={'outlined'}
                               label={'Правильный ответ'}
                               value={answer}
                               onChange={(e) => {
                                   setError(NO_ERROR);
                                   setAnswer(e.currentTarget.value);
                               }}
                               error={error === ERROR_ANSWER}
                    />

                    <div className={s1.button_div}>
                        {error && <Typography color={"red"}>{error}</Typography>}
                        <Button
                            variant={'contained'}
                            className={s1.button1}
                            onClick={addingNewObjective}
                        >
                            Добавить новую задачу
                        </Button>
                    </div>

                </div>
                : <Typography variant={'h5'}>Вы не авторизированы добавлять новую задачу</Typography>
        }
    </Container>
}

export default AddObjective;