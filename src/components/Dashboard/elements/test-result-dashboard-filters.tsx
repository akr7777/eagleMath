import {UserType} from "../../../store/features/usersSlice";
import React, {ChangeEvent} from "react";
import TextField from "@mui/material/TextField";
import s1 from "./elements.module.css";
import Slider from '@mui/material/Slider';
import Typography from "@mui/material/Typography";
import TestResultDashboardFiltersCalendar from "./test-result-dashboard-filters-calendar";
import {Dayjs} from "dayjs";

type TestResultDashboardUserChooseType = {
    testResultTitleFilter: string,
    setTestResultTitleFilter: (searchStr: string) => void,

    resultValueRange: Array<number>
    setResultValueRange: (resultValueRange: Array<number>) => void,

    dateFilterValue: Dayjs | null,
    setDateFilterValue: (newDate: Dayjs | null) => void,
}
const TestResultDashboardFilters = (props:TestResultDashboardUserChooseType) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        props.setResultValueRange(newValue as number[]);
    };

    return <div className={s1.test_results_filter_div}>
        <div className={s1.test_results_filter_item}>
            <TextField
                label={'Название теста'}
                variant={"outlined"}
                value={props.testResultTitleFilter}
                onChange={(e) => props.setTestResultTitleFilter(e.currentTarget.value)}
            />
        </div>

        <div className={s1.test_results_filter_item}>
            <Typography>Результат %:</Typography>
            <Slider
                value={props.resultValueRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </div>

        <div>
            <TestResultDashboardFiltersCalendar
                dateFilterValue={props.dateFilterValue}
                setDateFilterValue={props.setDateFilterValue}
            />
        </div>

    </div>
}

export default TestResultDashboardFilters;