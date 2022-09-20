import React from 'react';
import s from './App.module.css';
import MyAppBar, {PATHS} from "./components/AppBar/AppBar";
import {Routes, Outlet, Route} from 'react-router-dom';
import {Description} from "./components/Description/Description";
import {Header} from './components/Header/Header';
import {Error404} from "./components/Error404/Error404";
import {Contacts} from "./components/Contacts/Contacts";
import {Footer} from "./components/Footer/Footer";
import {Tasks} from "./components/Tasks/Tasks";
import Materials from "./components/Materials/Materials";
import Login from "./components/AuthPage/Login";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";

import SingUpPage from "./components/AuthPage/SingUpPage";
import Logout from "./components/AuthPage/Logout";
import InitializeApp from "./components/utils/initializeApp";

const Layout = () => {
    return <div className={s.appWrapper}>
        <Header/>
        <MyAppBar/>
        <div className={s.outletDiv}>
            <Outlet/>
        </div>
        <Footer/>
    </div>
}

function App() {

    //initializeApp
    /*let dispatch = useAppDispatch();
    dispatch(getAllMaterials());*/
    InitializeApp();
    //

    return (<>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Description/>} />
                <Route path={PATHS.materials} element={<Materials/>} />
                <Route path={PATHS.tasks} element={<Tasks/>} />
                <Route path={PATHS.contacts} element={<Contacts/>}/>
                <Route path={PATHS.login} element={<Login/>}/>
                <Route path={PATHS.logout} element={<Logout/>}/>
                <Route path={PATHS.profile} element={<Profile/>}/>
                <Route path={PATHS.dashboard} element={<Dashboard/>}/>

                <Route path={PATHS.singup} element={<SingUpPage/>}/>

                <Route path='/*' element={<Error404/>} />
            </Route>
        </Routes>
    </>);
}

export default App;
