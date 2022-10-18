import Container from "@mui/material/Container";
import s from "../../common/commonCSS.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {IdFiledType} from "../../features/categoriesSlice";
import {v4} from "uuid";

const AddTest = () => {
    const contentId:IdFiledType = useSelector((state: RootState) => state.tasks.addTest.contentId);

    return <Container className={s.wrapped_div}>
        AddTEst
    </Container>
}

export default AddTest;