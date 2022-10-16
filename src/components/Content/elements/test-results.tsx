import {clearTestAnswersAC, TestAnswersType, TestType} from "../../features/tasksSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import css from "./../content.module.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const TestResults = () => {
    const dispatch = useAppDispatch();
    const test: TestType = useSelector((state: RootState) => state.tasks.test);
    const testAnswers: TestAnswersType[] | undefined = useSelector((state: RootState) => state.tasks.testAnswers);
    const rightAnswersResult = testAnswers?.filter(answer => answer.isRight).length;
    const retryTest = () => {
        dispatch(clearTestAnswersAC());
    }

    return <div className={css.test_results_main_div}>
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
}

export default TestResults;