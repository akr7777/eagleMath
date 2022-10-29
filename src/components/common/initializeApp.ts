import {useAppDispatch} from "../../store/store";
import {refreshThunk} from "../features/authThunks";

const InitializeApp = () => {
    const dispatch = useAppDispatch();
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        dispatch(refreshThunk());
    }
}


export default InitializeApp;