import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {ChangeEvent, useState} from "react";
import {changeNotesFilterStatus, NotesStatusType} from "../../../store/features/dashboardSlice";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import elementCSS from "./elements.module.css"
import {FormControl} from "@mui/material";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

type notesStatusFilterValuesType = {
    activeStatus: NotesStatusType, completedStatus: NotesStatusType, allStatus: NotesStatusType,
    activeTitle: string, completedTitle: string, allTitle: string,
}
const notesStatusFilterValues: notesStatusFilterValuesType = {
    activeStatus: "Active", completedStatus: "Completed", allStatus: "All",
    activeTitle: "Активные", completedTitle: "Завершенные", allTitle: "Все"
}

const UserInfoNotesFilters = () => {
    const dispatch = useAppDispatch();

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result:NotesStatusType = (event.target as HTMLInputElement).value as NotesStatusType;
        dispatch(changeNotesFilterStatus(result));
    };

    return <>
        <div>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">По статусу:</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    //defaultValue={notesStatusFilterValues.allStatus}
                    name="radio-buttons-group"
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value={notesStatusFilterValues.allStatus} control={<Radio />} label={notesStatusFilterValues.allTitle} />
                    <FormControlLabel value={notesStatusFilterValues.activeStatus} control={<Radio />} label={notesStatusFilterValues.activeTitle} />
                    <FormControlLabel value={notesStatusFilterValues.completedStatus} control={<Radio />} label={notesStatusFilterValues.completedTitle} />
                </RadioGroup>
            </FormControl>
        </div>

    </>
}

export default UserInfoNotesFilters;