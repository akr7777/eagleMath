import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {logoutThunk} from "../features/authSlice";
import {PATHS} from "../AppBar/AppBar";

const Logout = () => {
    const dispatch = useAppDispatch();
    dispatch(logoutThunk());
    return <Navigate to={PATHS.description}></Navigate>
}
export default Logout;