import {
    clearTestAnswersAC,
    setTestResultThunk,
    TestAnswersType, TestContentType,
    TestType
} from "../../features/tasksSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import css from "./../content.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../AppBar/AppBar";

type ProtocolType = {
    questionId: string,
    question: string,
    options: Array<any>,
    answer: string,
    receivedAnswer: string | undefined,
}
const TestResults = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const test: TestType = useSelector((state: RootState) => state.tasks.test);
    const testAnswers: TestAnswersType[] | undefined = useSelector((state: RootState) => state.tasks.testAnswers);
    const rightAnswersResult = testAnswers?.filter(answer => answer.isRight).length;

    const date = new Date().toString();
    const testId = useSelector((state: RootState) => state.tasks.test.testId);
    const userId = useSelector((state: RootState) => state.auth.user.id);
    const isAuth = useSelector((state: RootState) => state.auth.isAuth);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const protocol = test.content.map((el: TestContentType) => {
        return {
            ...el,
            receivedAnswer: String(testAnswers?.find(e => e.questionId === el.questionId)?.receivedAnswer)
        }
    })

    const retryTest = () => {
        dispatch(clearTestAnswersAC());
    }

    if (isAuth)
        dispatch(setTestResultThunk({
            userId: userId,
            testId: testId,
            result: rightAnswersResult,
            protocol: protocol,
            date: date,
        }));

    return <>
        {
            isAdmin && test && testAnswers?.length > 0
                ? <div className={css.test_results_main_div}>
                    <div>
                        <Typography variant={'h4'}>Результаты теста:</Typography>
                    </div>
                    <div>
                        <Typography variant={'h5'}>
                            У Вас <b>{rightAnswersResult}</b> правильных ответов из <b>{test.content.length}</b>
                        </Typography>
                    </div>
                    <div>
                        <Button onClick={retryTest} variant={'contained'}>Пройти тест повторно</Button>
                    </div>
                </div>
                : <Button onClick={() => {navigate(PATHS.addTest)}}>Создать новый тест</Button>
        }

    </>

}

export default TestResults;