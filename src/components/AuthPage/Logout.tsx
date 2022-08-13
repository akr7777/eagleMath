import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {logout} from "../features/authSlice";
import {PATHS} from "../AppBar/AppBar";

const Logout = () => {
    const dispatch = useAppDispatch();
    dispatch(logout());
    return <Navigate to={PATHS.description}></Navigate>
}
export default Logout;