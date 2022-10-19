import Container from "@mui/material/Container";
import s from "../../common/commonCSS.module.css";
import {IdFiledType} from "../../features/categoriesSlice";
import AddTestAllTasksList from "./add-test-all-tasks-list";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {TaskType, TestContentType, addNewTestToDataBaseThunk} from "../../features/tasksSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import AddTestAddNewQuestion from "./add-test-add-new-question";
import AddTestOneQuestionAdded from "./add-test-one-question-added";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import s1 from "../content.module.css";
import Button from "@mui/material/Button";

const AddTest = () => {
    const dispatch = useAppDispatch();
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    const [currentContentId, setCurrentContentId] = useState<IdFiledType>('');
    const [content, setContent] = useState<Array<TestContentType>>([]);
    const [showNewQuestionAdding, setShowNewQuestionAdding] = useState<boolean>(false);
    //const [error, setError] = useState<string>('');

    const tasks: Array<TaskType> = useSelector((state: RootState) => state.tasks.tasks);
    const testContentIds: Array<IdFiledType> = useSelector((state: RootState) => state.tasks.testContentIds);
    const list: Array<TaskType> = tasks.filter(task => !testContentIds.includes(task.id));
    if (list.length > 0 && currentContentId === '')
        setCurrentContentId(list[0].id);

    const onQuestionAdding = (question: TestContentType) => {
        setContent([...content, question]);
        setShowNewQuestionAdding(false);
    }

    const moveQuestion = (ind: number, direction: "up" | "down") => {
        const newContent = [...content]
        if (direction === "up" && ind !== 0)
            [newContent[ind], newContent[ind - 1]] = [newContent[ind - 1], newContent[ind]]
        if (direction === "down" && ind !== newContent.length - 1)
            [newContent[ind], newContent[ind + 1]] = [newContent[ind + 1], newContent[ind]]
        setContent([...newContent]);
    }
    const deleteQuestion = (questionId: IdFiledType) => {
        setContent([...content.filter(elem => elem.questionId !== questionId)])
    }

    const addNewTestToDataBase = () => {
        dispatch(addNewTestToDataBaseThunk({contentId: currentContentId, content: content}));
    }

    return <>
        {
            isAdmin
                ? <Container className={s.wrapped_div}>
                    <div><Typography variant={'h4'}>Добавить новый тест</Typography></div>

                    <AddTestAllTasksList
                        currentContentId={currentContentId}
                        setCurrentContentId={setCurrentContentId}
                    />

                    {
                        content.map((question, index) => <AddTestOneQuestionAdded
                            key={question.questionId + String(index)}
                            oneQuestion={question}
                            index={index}
                            length={content.length}
                            moveQuestion={moveQuestion}
                            deleteQuestion={deleteQuestion}
                        />)
                    }

                    {
                        showNewQuestionAdding
                            ? <AddTestAddNewQuestion onQuestionAdding={onQuestionAdding}/>
                            : <div className={s1.add_question_div}>
                                <ControlPointIcon onClick={() => setShowNewQuestionAdding(true)}/>
                            </div>
                    }

                    {
                        content.length > 0 && currentContentId &&
                            <button
                                className={s1.add_new_test_to_database}
                                onClick={addNewTestToDataBase}
                            >
                                Добавить новый тест в базу данных
                            </button>
                    }

                </Container>
                : <Typography variant={'h5'}>Вы не авторизованы для создания теста</Typography>
        }
    </>
}

export default AddTest;