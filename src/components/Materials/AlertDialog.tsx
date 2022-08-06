import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type DialogPropsType = {
    open: boolean,
    materialID: number,
    title: string,
    handleClose: ()=> void,
    deleteMaterialById: (materialID: number) => void
}

const AlertDialog2 = (props: DialogPropsType) => {
    return <div>
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Вы уверены, что хотите удалить этот материал?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.materialID} === {props.title} ===
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button color={'error'} onClick={() => props.deleteMaterialById(props.materialID)}>Delete</Button>
            </DialogActions>
        </Dialog>
    </div>
}

export default AlertDialog2;