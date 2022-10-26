import s2 from "./elements.module.css";
import Accordion from "@mui/material/Accordion";
import s1 from "../styles.module.css";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {
    getTestResultsByUserId,
    getUserListThunk,
    TestResultProtocolType,
    TestResultType
} from "../../features/dashboardSlice";
import {IdFiledType} from "../../features/categoriesSlice";
import {UserType} from "../../features/usersSlice";
import TestResultDashboardUserChoose from "./test-result-dashboard-user-choose";
import TestResultDashboardFilters from "./test-result-dashboard-filters";
import {Dayjs} from "dayjs";
import {v4} from "uuid";
import LinearProgress from '@mui/material/LinearProgress';

const TestResultsDashboard = () => {
    const dispatch = useAppDispatch();

    //const testResultsResults = useSelector((state: RootState) => state.dashboard.testResult);
    //const minTestResult = Math.min(...testResultsResults.map(el => el.result));
    //const maxTestResult = Math.max(...testResultsResults.map(el => el.result));
    const [dateFilterValue, setDateFilterValue] = React.useState<Dayjs | null>(null);

    const [testResultTitleFilter, setTestResultTitleFilter] = useState<string>('');
    const [resultValueRange, setResultValueRange] = React.useState<number[]>([0, 100]);

    const testResults: Array<TestResultType> = useSelector((state: RootState) => state.dashboard.testResult).filter(el => {
            const resultPercent = Math.round(100 * el.result / el.protocol.length);
            if (dateFilterValue) {
                if (
                    el.title.toLowerCase().includes(testResultTitleFilter.toLowerCase()) &&
                    resultPercent >= Number(resultValueRange[0]) && resultPercent <= Number(resultValueRange[1]) &&
                    dateFilterValue.format('DD.MM.YYYY') === el.date.slice(0, 10)
                ) return el;
            } else if (
                el.title.toLowerCase().includes(testResultTitleFilter.toLowerCase()) &&
                resultPercent >= Number(resultValueRange[0]) && resultPercent <= Number(resultValueRange[1])
            ) return el;
        }
    );

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [protocolRowIndex, setProtocolRowIndex] = useState<number>(-1);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const userList: UserType[] = useSelector((state: RootState) => state.dashboard.userList);

    //let userId: IdFiledType = useSelector((state: RootState) => state.auth.user.id);
    //const [userId, setUserId] = useState<IdFiledType>(useSelector((state: RootState) => state.auth.user.id));
    const uid:IdFiledType = useSelector((state: RootState) => state.auth.user.id);
    const [userId, setUserId] = useState<IdFiledType>(uid);
    if (uid !== '0' && userId === '0') setUserId(uid);

    useEffect(() => {
        dispatch(getUserListThunk());
        dispatch(getTestResultsByUserId(userId));
    }, [userId]);

    const isLoading:boolean = useSelector((state: RootState) => state.dashboard.loading.testsResultsLoading);

    return <div className={s2.div1}>
        <Accordion className={s1.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h5'}>Результаты тестов</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    isAdmin && <TestResultDashboardUserChoose setUserId={setUserId} userList={userList} userId={userId}/>
                }

                {
                    isLoading
                        ? <LinearProgress/>
                        : <>


                            <TestResultDashboardFilters
                                testResultTitleFilter={testResultTitleFilter} setTestResultTitleFilter={setTestResultTitleFilter}
                                resultValueRange={resultValueRange} setResultValueRange={setResultValueRange}
                                dateFilterValue={dateFilterValue} setDateFilterValue={setDateFilterValue}
                            />

                            <table className={s1.results_table}>
                                <thead>
                                <tr>
                                    <th>Название теста</th>
                                    <th>Результат</th>
                                    <th>Время завершения теста</th>
                                    <th>Детали</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    testResults.map((result, rowIndex) => {
                                        return (<>
                                            <tr
                                                key={rowIndex}
                                                className={rowIndex === selectedIndex ? s1.table_tr_style_selected : ""}
                                                onClick={() => setSelectedIndex(rowIndex)}
                                            >
                                                <td>
                                                    {result.title}
                                                </td>
                                                <td>
                                                    {Math.round(100 * result.result / result.protocol.length)}%
                                                    : {result.result} из {result.protocol.length}
                                                </td>
                                                <td>
                                                    {result.date}
                                                </td>
                                                <td>
                                                    {
                                                        rowIndex === protocolRowIndex
                                                            ? <KeyboardArrowUpIcon
                                                                className={s1.arrow}
                                                                onClick={() => setProtocolRowIndex(-1)}
                                                            />
                                                            : <KeyboardArrowDownIcon
                                                                className={s1.arrow}
                                                                onClick={() => setProtocolRowIndex(rowIndex)}
                                                            />
                                                    }
                                                </td>
                                            </tr>
                                            {rowIndex === protocolRowIndex && <tr>
                                                <td colSpan={3} key={v4()}>
                                                    {
                                                        result.protocol.map((protocolItem: TestResultProtocolType, protocolIndex) => {
                                                            return <div
                                                                className={s1.protocol_div}
                                                                key={protocolItem.questionId}
                                                            >
                                                                <Typography className={
                                                                    protocolItem.answer === protocolItem.receivedAnswer ? s1.question_success : s1.question_error
                                                                }>
                                                                    <b>Вопрос N{protocolIndex + 1}: {protocolItem.question}</b>
                                                                </Typography>
                                                                <Typography>
                                                                    Полученный ответ: {protocolItem.receivedAnswer}
                                                                </Typography>
                                                                <Typography>
                                                                    Верный ответ: {protocolItem.answer}
                                                                </Typography>
                                                            </div>
                                                        })
                                                    }
                                                </td>
                                            </tr>
                                            }
                                        </>)
                                    })
                                }
                                </tbody>
                            </table>
                        </>
                }


            </AccordionDetails>
        </Accordion>

    </div>
}

export default TestResultsDashboard;