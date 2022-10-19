import css from "../../content.module.css";
import {TestAnswersType, TestContentType} from "../../../features/tasksSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {MouseEvent} from "react";

type TestContentButtonPropsType = {
    option: any,
    testItem: TestContentType,
    onAnswerButtonClick: (e: MouseEvent<HTMLButtonElement>) => void
}
const TestContentButton = (props: TestContentButtonPropsType) => {
    const testAnswers: TestAnswersType[] | undefined = useSelector((state: RootState) => state.tasks.testAnswers);
    const userAnswer: TestAnswersType | undefined = testAnswers.find(el => el.questionId === props.testItem.questionId);

    let button_style = css.colored_button;
    if (userAnswer && String(props.testItem.answer) === String(props.option)) {
        button_style = button_style + " " + css.success_button;
    } else if (userAnswer && String(props.testItem.answer) === String(props.option)) {
        button_style = button_style + " " + css.success_button;
    } else if (userAnswer && String(userAnswer && userAnswer.receivedAnswer) === String(props.option)) {
        button_style = button_style + " " + css.error_button;
    }
    const onHoverEvent = () => {
        if (!userAnswer)
            button_style = button_style + " " + css.colored_button_hover
    }

    return <button
        className={button_style}
        value={props.option}
        onClick={(e) => props.onAnswerButtonClick(e)}
        onMouseOver={onHoverEvent}
        disabled={Boolean(userAnswer)}
    >
        {props.option}
    </button>

}

export default TestContentButton;