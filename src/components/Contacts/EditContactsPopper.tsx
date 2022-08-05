import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import PopperContentContacts from "./PopperContentContacts";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
const EDIT_CONTACTS_LABEL = EditIcon;//'Редактировать контакты'

export default function EditContactsPopper() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>
           {/* <Button aria-describedby={id} type="button" onClick={handleClick}>
                ииие
            </Button>*/}

            <Fab color="secondary" onClick={handleClick}>
                <EditIcon />
            </Fab>

            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 3, bgcolor: 'background.paper' }}>
                    <PopperContentContacts handleClickClose={handleClick}/>
                </Box>
            </Popper>
        </div>
    );
}