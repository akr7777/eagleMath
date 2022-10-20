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
import {getTestResultsByUserId, TestResultProtocolType, TestResultType} from "../../features/dashboardSlice";
import {IdFiledType} from "../../features/categoriesSlice";
import {v4} from "uuid";

const TestResults = () => {
    const dispatch = useAppDispatch();
    const testResults: Array<TestResultType> = useSelector((state: RootState) => state.dashboard.testResult);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [protocolRowIndex, setProtocolRowIndex] = useState<number>(-1);

    let userId: IdFiledType = useSelector((state: RootState) => state.auth.user.id);

    useEffect(() => {
        dispatch(getTestResultsByUserId(userId));
    }, [userId]);

    //console.log('testResults=', testResults);

    return <div className={s2.div1}>
        <Accordion className={s1.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h5'}>Результаты тестов пользователя</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                            return <>
                                <tr
                                    key={rowIndex}
                                    className={rowIndex === selectedIndex ? s1.table_tr_style_selected : ""}
                                    onClick={() => setSelectedIndex(rowIndex)}
                                >
                                    <td>
                                        {result.title}
                                    </td>
                                    <td>
                                        {100 * result.result / result.protocol.length}%
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
                                    <td colSpan={3}>
                                        {
                                            result.protocol.map((protocolItem: TestResultProtocolType, protocolIndex) => {
                                                return <div
                                                    className={s1.protocol_div}
                                                    key={protocolItem.questionId}
                                                >
                                                    <Typography><b>Вопрос N{protocolIndex+1}: {protocolItem.question}</b></Typography>
                                                    <Typography>Полученный ответ: {protocolItem.receivedAnswer}</Typography>
                                                    <Typography>Верный ответ: {protocolItem.answer}</Typography>
                                                </div>
                                            })
                                        }
                                    </td>
                                </tr>
                                }
                            </>
                        })
                    }
                    </tbody>
                </table>
            </AccordionDetails>
        </Accordion>

    </div>
}

export default TestResults;