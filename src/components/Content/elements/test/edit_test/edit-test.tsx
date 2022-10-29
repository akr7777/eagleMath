import {useNavigate, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../../../store/store";
import Typography from "@mui/material/Typography";
import s from "../../../../common/commonCSS.module.css";
import s1 from "../../../content.module.css";
import {useEffect, useState} from "react";
import {TestContentType, TestType} from "../../../../../store/features/tasksSlice";
import {editTestInDataBaseThunk, getTestByIdThunk} from "../../../../../store/features/tasksThunks";
import {IdFiledType} from "../../../../../store/features/categoriesSlice";
import TextField from '@mui/material/TextField';
import AddTestOneQuestionAdded from "../add_test/add-test-one-question-added";
import AddTestAddNewQuestion from "../add_test/add-test-add-new-question";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {PATHS} from "../../../../AppBar/AppBar";

export type EditingQuestionValuesType = { question: string, answer: string, options:Array<string> }

const EditTest = () => {
    const {testId} = useParams();
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTestByIdThunk(testId || ""))
    }, [])

    const test: TestType = useSelector((state: RootState) => state.tasks.test);
    const [title, setTitle] = useState<string>(test.title);
    const [content, setContent] = useState<TestContentType[]>(test.content);
    const [contentId, setContentId] = useState<IdFiledType>(test.contentId);
    const [error, setError] = useState<string>('');
    const [showNewQuestionAdding, setShowNewQuestionAdding] = useState<boolean>(false);

    const [editingQuestionValues, setEditingQuestionValues] = useState<EditingQuestionValuesType>({
        question: '',
        answer: '',
        options: []
    });

    //const [localStr, setLocalStr] = useState<string>('');

    const onQuestionAdding = (question: TestContentType) => {
        setContent([...content, question]);
        setShowNewQuestionAdding(false);
        setEditingQuestionValues({
            question: '',
            answer: '',
            options: []
        });
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

    const editTestInDataBase = () => {
        if (title && content && testId && contentId) {
            dispatch(editTestInDataBaseThunk({testId: testId, title: title, contentId: contentId, content: content}));
            navigate(PATHS.content+"/"+contentId);
        } else {
            if (!title) setError('Введите заголовок теста');
            if (!content) setError('Нет вопросов');
            if (!contentId) setError('Нет материала, к которому относится тест')
        }
    }

    return <>{
        isAdmin
            ? <Container className={s.wrapped_div}>

                <div><Typography variant={'h4'}>Редактировать тест</Typography></div>

                <div>
                    <TextField
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        label={'Название теста'}
                        multiline
                        className={s1.test_title_textfield}
                    />
                </div>

                {
                    content.map((question, index) => <AddTestOneQuestionAdded
                        key={question.questionId + String(index)}
                        oneQuestion={question}
                        index={index}
                        length={content.length}
                        moveQuestion={moveQuestion}
                        deleteQuestion={deleteQuestion}
                        setEditingQuestionValues={setEditingQuestionValues}
                    />)
                }

                {
                    showNewQuestionAdding
                        ? <AddTestAddNewQuestion onQuestionAdding={onQuestionAdding}/>
                        : editingQuestionValues.options && editingQuestionValues.answer && editingQuestionValues.question && !showNewQuestionAdding
                            ? <AddTestAddNewQuestion
                                onQuestionAdding={onQuestionAdding}
                                question={editingQuestionValues.question}
                                answer={editingQuestionValues.answer}
                                options={editingQuestionValues.options}
                            />
                            : <div className={s1.add_question_div}>
                            <ControlPointIcon onClick={() => setShowNewQuestionAdding(true)}/>
                        </div>
                }


                <div className={s1.paragraph_div_admin_right_part}>
                    <Typography color={"red"}>{error}</Typography>

                    <button
                        className={s1.add_new_test_to_database}
                        onClick={editTestInDataBase}
                    >
                        Редактировать тест в базе данных
                    </button>
                </div>


            </Container>
            : <Typography variant={'h5'}>Вы не авторизованы для редактирования теста</Typography>
    }</>
}

export default EditTest;