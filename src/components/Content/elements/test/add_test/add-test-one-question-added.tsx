import {TestContentType} from "../../../../features/tasksSlice";
import Typography from "@mui/material/Typography";
import s1 from "../../../content.module.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {IdFiledType} from "../../../../features/categoriesSlice";

type AddTestOneQuestionAdded = {
    oneQuestion: TestContentType,
    index: number,
    length: number,
    moveQuestion: (ind: number, direction: "up" | "down") => void,
    deleteQuestion: (questionId: IdFiledType) => void,
}
const AddTestOneQuestionAdded = (props: AddTestOneQuestionAdded) => {

    return <div className={s1.addTestOneQuestionAdded_div_main}>
        <div className={s1.side_div}>
            <DeleteForeverIcon className={s1.delete_icon} onClick={() => props.deleteQuestion(props.oneQuestion.questionId)}/>
        </div>
        <div>
            <Typography variant={'h5'}>{props.oneQuestion.question}</Typography>
            <div className={props.oneQuestion.options.length % 2 === 0 ? s1.test_options_div_2 : s1.test_options_div_3}>
                {
                    props.oneQuestion.options.map((opt, index) =>
                        <Typography
                            key={index}
                            variant={opt === props.oneQuestion.answer ? 'body1' : 'body2'}
                            color={opt === props.oneQuestion.answer ? 'green' : 'black'}
                        >{opt}
                        </Typography>
                    )
                }
            </div>
        </div>
        <div className={s1.side_div}>
            { props.index !== 0 &&  <KeyboardArrowUpIcon
                className={s1.vertical_arrow}
                onClick={() => props.moveQuestion(props.index, "up")}
            /> }
            { props.index !== props.length - 1 && <KeyboardArrowDownIcon
                className={s1.vertical_arrow}
                onClick={() => props.moveQuestion(props.index, "down")}
            /> }
        </div>

    </div>
}

export default AddTestOneQuestionAdded;