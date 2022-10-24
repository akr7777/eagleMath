import s2 from "./elements.module.css";
import Accordion from "@mui/material/Accordion";
import s1 from "../styles.module.css";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Typography} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {
    getObjectiveResultsByUserId,
    getUserListThunk, ObjectiveResultsType,
} from "../../features/dashboardSlice";
import {IdFiledType} from "../../features/categoriesSlice";
import {UserType} from "../../features/usersSlice";
import TestResultDashboardUserChoose from "./test-result-dashboard-user-choose";
import {Dayjs} from "dayjs";
import ObjectiveResultsDashboardFilter from "./objective-result-dashboard-filters";
import LinearProgress from '@mui/material/LinearProgress';
import Preloader from "../../common/Preloader";

export type UserAnswerFilterType = "Wrong" | "Right" | "";
const ObjectiveResultDashboard = () => {
    const dispatch = useAppDispatch();

    const [dateFilterValue, setDateFilterValue] = useState<Dayjs | null>(null);

    const [titleResultFilter, setTitleResultFilter] = useState<string>('');
    const [contentResultFilter, setContentResultFilter] = useState<string>('');
    const [userAnswerFilter, setUserAnswerFilter] = useState<UserAnswerFilterType>("");

    //const objectiveResults: Array<ObjectiveResultsType> = useSelector((state: RootState) => state.dashboard.objectiveResults);
    const objectiveResults: Array<ObjectiveResultsType> = useSelector((state: RootState) => state.dashboard.objectiveResults).filter(el => {
            //const resultPercent = Math.round(100 * el.result / el.protocol.length);
            if (dateFilterValue) {
                if (
                    el.title.toLowerCase().includes(titleResultFilter.toLowerCase()) &&
                    el.content.toLowerCase().includes(contentResultFilter.toLowerCase()) &&
                    //resultPercent >= Number(resultValueRange[0]) && resultPercent <= Number(resultValueRange[1]) &&
                    dateFilterValue.format('DD.MM.YYYY') === el.date.slice(0, 10)
                ) return el;
            } else if (
                el.title.toLowerCase().includes(titleResultFilter.toLowerCase()) &&
                el.content.toLowerCase().includes(contentResultFilter.toLowerCase())
            ) return el;
        }
    ).filter(el => {
        if (userAnswerFilter === "") return el;
        if (userAnswerFilter === "Right" && el.result === el.answer) return el;
        if (userAnswerFilter === "Wrong" && el.result !== el.answer) return el;
    });

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const userList: UserType[] = useSelector((state: RootState) => state.dashboard.userList);

    const [userId, setUserId] = useState<IdFiledType>(useSelector((state: RootState) => state.auth.user.id))

    useEffect(() => {
        dispatch(getUserListThunk());
        dispatch(getObjectiveResultsByUserId(userId));
    }, [userId]);

    const isLoading:boolean = useSelector((state: RootState) => state.dashboard.loading.objectivesResultsLoading);

    return <div className={s2.div1}>
        <Accordion className={s1.accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography variant={'h5'}>Результаты решенных задач пользователя</Typography>
            </AccordionSummary>
            <AccordionDetails>

                {
                    isAdmin && <TestResultDashboardUserChoose setUserId={setUserId} userList={userList}/>
                }

                {
                    isLoading
                        ? <LinearProgress/>
                        : <>
                            <ObjectiveResultsDashboardFilter
                                titleResultFilter={titleResultFilter} setTitleResultFilter={setTitleResultFilter}
                                contentResultFilter={contentResultFilter} setContentResultFilter={setContentResultFilter}
                                userAnswerFilter={userAnswerFilter} setUserAnswerFilter={setUserAnswerFilter}
                                dateFilterValue={dateFilterValue} setDateFilterValue={setDateFilterValue}
                            />

                            <table className={s1.results_table}>
                                <thead>
                                <tr>
                                    <th>Название задачи</th>
                                    <th>Условия задачи</th>
                                    <th>Полученный ответ</th>
                                    <th>Время завершения теста</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    objectiveResults.map((result, rowIndex) => {
                                        return <tr
                                            key={rowIndex}
                                            className={rowIndex === selectedIndex ? s1.table_tr_style_selected : ""}
                                            onClick={() => setSelectedIndex(rowIndex)}
                                        >
                                            <td>
                                                {result.title}
                                            </td>
                                            <td>
                                                {result.content}
                                            </td>
                                            <td className={rowIndex !== selectedIndex
                                                ? result.result === result.answer
                                                    ? s2.objective_result_cell_success
                                                    : s2.objective_result_cell_error
                                                : ""
                                            }
                                            >
                                                {result.result}
                                            </td>
                                            <td>
                                                {result.date}
                                            </td>
                                        </tr>
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

export default ObjectiveResultDashboard;