import React, {ChangeEvent} from "react";
import TextField from "@mui/material/TextField";
import s1 from "./elements.module.css";
import TestResultDashboardFiltersCalendar from "./test-result-dashboard-filters-calendar";
import {Dayjs} from "dayjs";
import {UserAnswerFilterType} from "./objective-results-dashboard";

type ObjectiveResultDashboardUserChooseType = {
    titleResultFilter: string,
    setTitleResultFilter: (val: string) => void,

    contentResultFilter: string,
    setContentResultFilter: (val: string) => void,

    userAnswerFilter: UserAnswerFilterType;
    setUserAnswerFilter: (val: UserAnswerFilterType) => void,

    dateFilterValue: Dayjs | null,
    setDateFilterValue: (newDate: Dayjs | null) => void,
}
const ObjectiveResultsDashboardFilter = (props:ObjectiveResultDashboardUserChooseType) => {

    return <div className={s1.objective_results_filter_div}>
        <div className={s1.test_results_filter_item}>
            <TextField
                /*className={s1.objective_result_fields}*/
                label={'Название задачи'}
                variant={"outlined"}
                value={props.titleResultFilter}
                onChange={(e) => props.setTitleResultFilter(e.currentTarget.value)}
            />
        </div>

        <div className={s1.test_results_filter_item}>
            <TextField
                /*className={s1.objective_result_fields}*/
                label={'Условаия задачи'}
                variant={"outlined"}
                value={props.contentResultFilter}
                onChange={(e) => props.setContentResultFilter(e.currentTarget.value)}
            />
        </div>

        <div className={s1.test_results_filter_item}>
            <select
                className={s1.objective_result_fields}
                onChange={(e) => props.setUserAnswerFilter(e.currentTarget.value as UserAnswerFilterType)}
            >
                <option value={""}>Нет фильтра</option>
                <option value={"Right"}>Верные ответы</option>
                <option value={"Wrong"}>Ошибки</option>
            </select>
        </div>

        <div>
            <TestResultDashboardFiltersCalendar
                dateFilterValue={props.dateFilterValue}
                setDateFilterValue={props.setDateFilterValue}
            />
        </div>

    </div>
}

export default ObjectiveResultsDashboardFilter;