import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CancelIcon from '@mui/icons-material/Cancel';
import s1 from "./elements.module.css";

type TestResultDashboardFiltersCalendarPropsType = {
    dateFilterValue: Dayjs | null,
    setDateFilterValue: (newDate: Dayjs | null) => void,
}
export default function TestResultDashboardFiltersCalendar(props: TestResultDashboardFiltersCalendarPropsType) {
    return <div className={s1.TestResultDashboardFiltersCalendar_div}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Фильтр по дате"
                    value={props.dateFilterValue}
                    onChange={(newValue) => {
                        //window.alert(newValue?.format('DD.MM.YYYY'))
                        props.setDateFilterValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />

            </LocalizationProvider>
            <CancelIcon onClick={() => props.setDateFilterValue(null)}/>
        </div>
}
