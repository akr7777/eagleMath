import * as React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import {NavLink} from "react-router-dom";
import {PATHS} from "./AppBar";
import s from './appbar.module.css';
import {RootState} from "../../store/store";
import {useSelector} from "react-redux";
import {baseAvatarPhotoUrl} from "../../assets/env";

export default function PopoverWithAvatar() {

    const userId = useSelector((state:RootState) => state.auth.user.id);
    const avaPhoto = baseAvatarPhotoUrl+userId;//useSelector( (state: RootState) => state.auth.user.photo);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant='text' onClick={handleClick}>
                <Avatar alt=""
                        src={avaPhoto}
                />
            </Button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                {/*<Typography sx={{p: 2}}>*/}
                    <Box sx={{
                        width: '100%',
                        maxWidth: 300,
                        bgcolor: 'background.paper',
                    }}
                        className={s.BoxPopover}
                    >
                        <List>
                            <ListItem disablePadding>
                                <NavLink to={PATHS.profile}>
                                    <ListItemButton sx={{width: '90%'}}>
                                        <ListItemIcon>
                                            <ManageAccountsIcon/>
                                        </ListItemIcon>
                                        <ListItemText className={s.SmallMenuLinks} primary="Профайл"/>
                                    </ListItemButton>
                                </NavLink>
                            </ListItem>
                            <ListItem disablePadding>
                                <NavLink to={PATHS.logout}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LogoutIcon/>
                                        </ListItemIcon>
                                        <ListItemText className={s.SmallMenuLinks} primary="Выйти"/>
                                    </ListItemButton>
                                </NavLink>
                            </ListItem>
                        </List>
                    </Box>
            </Popover>
        </div>
    );
}