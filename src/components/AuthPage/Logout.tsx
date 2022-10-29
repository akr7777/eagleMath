import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {PATHS} from "../AppBar/AppBar";
import {logoutThunk} from "../../store/features/authThunks";

const Logout = () => {
    const dispatch = useAppDispatch();
    dispatch(logoutThunk());
    return <Navigate to={PATHS.description}></Navigate>
}
export default Logout;