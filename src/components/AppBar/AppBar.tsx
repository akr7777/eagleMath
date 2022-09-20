import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import {NavLink} from "react-router-dom";
import s from './appbar.module.css';
import PopoverWithAvatar from "./PopoverWithAvatar";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import {baseAvatarPhotoUrl} from "../features/authSlice";

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;

export const PATHS = {
    description: '/',
    tasks: '/tasks',
    materials: 'materials',
    contacts: '/contacts',
    login: '/login',
    profile: '/profile',
    logout: '/logout',
    singup: '/singup',

    dashboard: '/dashboard'
}

const logoText = "Eagle's Math"
const navItemsDesctop = [
    <NavLink className={s.NavLinkCSSDesctop} to={PATHS.description}>Главная страница</NavLink>,
    <NavLink className={s.NavLinkCSSDesctop} to={PATHS.materials}>Материалы</NavLink>,
    <NavLink className={s.NavLinkCSSDesctop} to={PATHS.tasks}>Задачи</NavLink>,
    <NavLink className={s.NavLinkCSSDesctop} to={PATHS.contacts}>Контакты</NavLink>,
    <NavLink className={s.NavLinkCSSDesctop} to={PATHS.dashboard}>DashBoard</NavLink>,
];

const navItemsMobile = [
    <NavLink className={s.NavLinkCSSMobile} to={PATHS.description}>Главная страница</NavLink>,
    <NavLink className={s.NavLinkCSSMobile} to={PATHS.materials}>Материалы</NavLink>,
    <NavLink className={s.NavLinkCSSMobile} to={PATHS.tasks}>Задачи</NavLink>,
    <NavLink className={s.NavLinkCSSMobile} to={PATHS.contacts}>Контакты</NavLink>,
    <NavLink className={s.NavLinkCSSMobile} to={PATHS.dashboard}>DashBoard</NavLink>,
];
const navItemsMobileExtra = [
    <NavLink className={s.NavLinkCSSMobile} to={PATHS.profile}>
        <ManageAccountsIcon/> Профайл
    </NavLink>,
    <NavLink className={s.NavLinkCSSMobile} to={PATHS.logout}>
        <LogoutIcon/>
        <label>Выйти</label>
    </NavLink>,
    /*<Button variant={'text'}><LogoutIcon/>Выйти</Button>,*/
];

export default function MyAppBar(props: Props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    let isAuth = useSelector( (state: RootState) => state.auth.isAuth);
   /* if (isAuth) {
        navItemsDesctop.push(<NavLink className={s.NavLinkCSSDesctop} to={PATHS.dashboard}>DashBoard</NavLink>);
        navItemsMobile.push(<NavLink className={s.NavLinkCSSMobile} to={PATHS.dashboard}>DashBoard</NavLink>);
    }*/

    const userId = useSelector((state:RootState) => state.auth.user.id);
    const avaURL = baseAvatarPhotoUrl + userId;//useSelector( (state: RootState) => state.auth.user.photo);
    const avaPhotoMobile = isAuth
        ? <Avatar src={avaURL}/>
        : <NavLink to={PATHS.login}><Avatar/></NavLink>

    const avatarImageLink = isAuth
        ? <PopoverWithAvatar/>
        : <NavLink to={PATHS.login}><Avatar/></NavLink>

    //Mobile device
    const drawer = (
        <>
            <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
                <Typography variant="h5" sx={{my: 2}}>
                    {logoText}
                </Typography>
                <Divider/>
                <List>
                    {navItemsMobile.map((item, elementIndex) => (
                        <ListItem/* key={item}*/ key={elementIndex} disablePadding>
                            <ListItemButton sx={{textAlign: 'center'}}>
                                <ListItemText primary={item}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider/>

                <div className={s.divForAva12}>
                    {avaPhotoMobile}
                </div>

                {
                    isAuth && <>
                        <Divider/>
                        <List>
                            {navItemsMobileExtra.map((item, elementIndex) => (
                                <ListItem/* key={item}*/ key={elementIndex} disablePadding>
                                    <ListItemButton sx={{textAlign: 'center'}}>
                                        <ListItemText primary={item}/>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </>
                }

            </Box>
        </>

    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar component="nav" position="sticky">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>

                    {/* ---------- DESCTOP DEVISES -------------- */}

                    <Typography
                        variant="h4"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                        /*className={s.logo_text_CSS}*/
                    >
                        {logoText}
                    </Typography>

                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItemsDesctop.map((item, elementIndex) => (
                            <Button key={elementIndex} sx={{color: '#fff'}}>
                                {item}
                            </Button>
                        ))}

                    </Box>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {
                            avatarImageLink
                        }
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

        </Box>
    );
}