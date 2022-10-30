import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, {PaperProps} from '@mui/material/Paper';
import Draggable from 'react-draggable';
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store/store";
import {CategoryLongType, dataMutation} from "./Tree/data-mutation";
import {CategoryType, changeParentIdThunk, IdFiledType} from "../../store/features/categoriesSlice";
import s1 from "./change-parent.module.css";
import {useState} from "react";
import Typography from "@mui/material/Typography";

type NodeType = {
    id: IdFiledType,
    items: NodeType[],
    label: string,
    parentId: string
}
const DrawingCategoriesTree = (nodeData: Array<CategoryLongType>, selected: IdFiledType, setSelected: (id: IdFiledType) => void) => {
    return <>
        {
            nodeData.map(item => {
                return <div key={item.id} className={s1.treeLeaf}>
                    <div
                        onClick={() => setSelected(item.id)}
                        className={item.id === selected ? s1.treeLine + ' ' + s1.selectedLine : s1.treeLine}
                    >
                        <Typography>{item.label}</Typography>
                    </div>

                    {item.items.length > 0 && DrawingCategoriesTree(item.items, selected, setSelected)}
                </div>
            })
        }
    </>
}

export function PaperComponent1(props: PaperProps) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

type DraggableDialogPropsType = { contentId: IdFiledType }
export default function DraggableDialog(props: DraggableDialogPropsType) {
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const changeParentId = () => {
        dispatch(changeParentIdThunk({contentId: props.contentId, newParentId: selected}));
        handleClose();
    }
    const [selected, setSelected] = useState<IdFiledType>('');

    const categories: CategoryType[] = useSelector((state: RootState) => state.categories.categories);
    const nodeData = dataMutation({categories: categories, materials: []});

    return (
        <div>
            <DriveFileMoveIcon
                onClick={handleClickOpen}
                cursor={'pointer'}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent1}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    Выберите новую категорию
                </DialogTitle>
                <DialogContent>
                    <div
                        onClick={() => setSelected("0")}
                        className={"0" === selected ? s1.treeLine + ' ' + s1.selectedLine : s1.treeLine}
                    >
                        <Typography>RooT</Typography>
                    </div>

                    {DrawingCategoriesTree(nodeData, selected, setSelected)}

                    {/*</DialogContentText>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button onClick={changeParentId}>
                        Изменить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
