import {useParams} from "react-router-dom";
import css from './../content.module.css';
import {RootState, useAppDispatch} from "../../../store/store";
import {useEffect} from "react";
import {getTestThunk, pushTestAnswerAC, TestContentType, TestType, TestAnswersType} from "../../features/tasksSlice";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {MouseEvent} from "react";
import TestResults from "./test-results";
import TestContentButton from "./test-content-button";

const TestContent = () => {
    const {contentId} = useParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTestThunk(contentId || ""));
    }, [])

    const test: TestType = useSelector((state: RootState) => state.tasks.test);
    const testAnswers: TestAnswersType[] | undefined = useSelector((state: RootState) => state.tasks.testAnswers);

    return <div className={css.test_main_div}>
        {
            test.content.map((testItem: TestContentType, index) => {
                //const userAnswer: TestAnswersType | undefined = testAnswers.find(el => el.questionId === testItem.questionId);
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
        {testAnswers.length >= test.content.length && <TestResults/>}


    </div>
}

export default TestContent;