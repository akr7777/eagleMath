import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AlertDialog2 from './AlertDialog';

//>dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
//<dialog

import s from './materials.module.css';
import {useState} from "react";

export default function ControlledAccordions() {

    const isAdmin = true;

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const deleteMaterialById = (materialID: number) => {
        setOpen(false);
        console.log('deleteMaterialById _ materialID=', materialID);
    }

    // >DIALOG
    const [open, setOpen] = React.useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const onTestClick = (materialID: number) => {
        console.log('onTestClick _ materialID:', materialID);
        debugger
        return <AlertDialog2
            open={true}
            materialID={materialID}
            title={'m.title'}
            handleClose={handleClose}
            deleteMaterialById={deleteMaterialById}
        />
    }
    const handleClose = () => {
        setOpen(false);
    };
    // <DIALOG

    const materialsToMap = useSelector((state: RootState) => state.materials);

    return (
        <div>

            {/*open={open} handleOK={deleteMaterialByID(m.materialID) handleCancel={clo}}*/}
            {
                materialsToMap.map(m => {
                    return <>
                        <Accordion key={m.materialID} expanded={expanded === m.materialID.toString()}
                                   onChange={handleChange(m.materialID.toString())}>

                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{width: '33%', flexShrink: 0}}>
                                    {m.title}
                                </Typography>
                                <Typography sx={{color: 'text.secondary'}}>{m.description}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {m.text}
                                </Typography>
                            </AccordionDetails>

                            <div className={s.understandLabelDiv}>
                                {/*------ ADMIN EDIT & DELETE MATERIAL ---------*/}
                                {
                                    isAdmin && <div className={s.understandLabelDiv}>
                                        <ModeEditIcon/>
                                        <DeleteOutlineIcon onClick={handleClickOpenDialog}/>
                                        <button onClick={() => onTestClick(m.materialID)}>TEST</button>
                                    </div>
                                }

                                {/*--------STUDENT has read ---------*/}
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox/>} label="Прочитал и понял"/>
                                </FormGroup>
                            </div>

                            {m.title}

                            <AlertDialog2
                                open={open}
                                materialID={m.materialID}
                                title={m.title}
                                handleClose={handleClose}
                                deleteMaterialById={deleteMaterialById}
                            />

                        </Accordion>


                        {/*<div>
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Вы уверены, что хотите удалить этот материал?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        {m.materialID} === {m.title} ===
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button color={'error'} onClick={() => deleteMaterialById(m.materialID)}>Delete</Button>
                                </DialogActions>
                            </Dialog>
                        </div>*/}

                    </>
                })
            }

        </div>
    );
}


/*const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});*/

