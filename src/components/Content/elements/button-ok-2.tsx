import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../store/store";

const ButtonOk2 = () => {
    const dispatch = useAppDispatch();

    return <Button
        variant={'outlined'}

    >
        ОК
    </Button>
}

export default ButtonOk2;