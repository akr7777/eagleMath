import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {ChangeEvent, useState} from "react";
import {changeNotesFilterStatus, NotesStatusType} from "../../features/dashboardSlice";
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
            {/*<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Age"
                    defaultValue={'Ten'}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>*/}
            {/*<FormControl sx={{m: 1, minWidth: 170}} size="small" variant="standard">
                <InputLabel id="demo-simple-select-label">{selectValue}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectValue}
                    label={selectValue}
                    onChange={handleSelectChange}
                    //className={elementCSS.selectClass}
                    defaultValue={selectValue}
                >
                    <MenuItem
                        value={notesStatusFilterValues.allStatus as NotesStatusType}>{notesStatusFilterValues.allTitle}</MenuItem>
                    <MenuItem
                        value={notesStatusFilterValues.activeStatus as NotesStatusType}>{notesStatusFilterValues.activeTitle}</MenuItem>
                    <MenuItem
                        value={notesStatusFilterValues.completedStatus as NotesStatusType}>{notesStatusFilterValues.completedTitle}</MenuItem>
                </Select>
            </FormControl>*/}
        </div>

    </>
}

export default UserInfoNotesFilters;