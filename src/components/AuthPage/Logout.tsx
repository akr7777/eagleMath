import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../store/store";
import {logout} from "../features/authSlice";

const Logout = () => {
    const dispatch = useAppDispatch();
    dispatch(logout());
    return <Navigate to='/'></Navigate>
}
export default Logout;