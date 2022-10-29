import {useNavigate, useParams} from "react-router-dom";
import css from '../../content.module.css';
import {RootState, useAppDispatch} from "../../../../store/store";
import {useEffect} from "react";
import {pushTestAnswerAC, TestContentType, TestType, TestAnswersType} from "../../../../store/features/tasksSlice";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {MouseEvent} from "react";
import TestResults from "./test-results";
import TestContentButton from "./test-content-button";
import {PATHS} from "../../../AppBar/AppBar";
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import {getTestThunk} from "../../../../store/features/tasksThunks";

const TestContent = () => {
    const {contentId} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getTestThunk(contentId || ""));
    }, [])

    const test: TestType = useSelector((state: RootState) => state.tasks.test);
    const testAnswers: TestAnswersType[] | undefined = useSelector((state: RootState) => state.tasks.testAnswers);

    const onEditTestClickHandler = () => {
        navigate(PATHS.editTest + "/" + String(test.testId));
    }

    return <div className={css.test_main_div}>
        <div>
            <Typography variant={'h4'}>{test.title}</Typography>
            <CreateTwoToneIcon cursor={'pointer'} onClick={onEditTestClickHandler}/>
        </div>

        {
            test.content.map((testItem: TestContentType, index) => {
                const onAnswerButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
                    if (String(testItem.answer) === String(e.currentTarget.value))
                        dispatch(pushTestAnswerAC({
                            questionId: testItem.questionId,
                            receivedAnswer: e.currentTarget.value,
                            isRight: true,
                        }));
                    else
                        dispatch(pushTestAnswerAC({
                            questionId: testItem.questionId,
                            receivedAnswer: e.currentTarget.value,
                            isRight: false
                        }));
                }

                return <div key={testItem.questionId} className={css.test_question_div}>
                    <Typography>Вопрос №{index + 1}</Typography>
                    <Typography variant={'h5'}>{testItem.question}</Typography>
                    <div
                        className={testItem.options.length % 2 === 0 ? css.test_options_div_2 : css.test_options_div_3}>

                        {/*Кнопки с ответами*/}
                        {
                            testItem.options.map((option, btnIndex) => <TestContentButton
                                key={btnIndex}
                                option={option}
                                testItem={testItem}
                                onAnswerButtonClick={onAnswerButtonClick}
                            />)
                        }
                    </div>
                </div>
            })
        }

        {/*Test results*/}
        {testAnswers.length >= test.content.length && test.content.length > 0 && <TestResults/>}

        {/*Create new test*/}
       {/* { isAdmin && (test.content.length === 0) && <Button onClick={() => {navigate(PATHS.addTest)}}>Создать новый тест</Button> }*/}


    </div>
}

export default TestContent;