import {RootState, useAppDispatch} from "../../../../store/store";
import {ChangeEvent, useEffect, useState} from "react";
import {ObjectiveType} from "../../../../store/features/tasksSlice";
import {getObjectiveByContentIdThunk, setObjectiveResultThunk} from "../../../../store/features/tasksThunks";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import s1 from "./objective.module.css";
import Button from "@mui/material/Button";
import {baseObjectiveImageUrl} from "../../../../env";

type AnswerType = {objId: string, answer: string, isGiven: boolean, isRight: boolean}
const ObjectiveContent = () => {
    const {contentId} = useParams();
    const dispatch = useAppDispatch();
    const userId = useSelector((state: RootState) => state.auth.user.id);

    useEffect(() => {
        dispatch(getObjectiveByContentIdThunk(contentId || ""));
    }, []);

    const objectives: Array<ObjectiveType> = useSelector((state: RootState) => state.tasks.objectives);
    const [answers, setAnswers] = useState<AnswerType[]>(objectives.map(el => {
        return {objId: el._id, answer: "", isGiven: false, isRight: false}
    }));

    return <div className={s1.content_object_div}>
        { objectives.length > 0 && <Typography variant={'h4'}>Задачи:</Typography> }
        {
            objectives.map( (obj:ObjectiveType) => {

                const answerInput = answers.find(el => el.objId === obj._id) ? answers.find(el => el.objId === obj._id) : {objId: "", answer: "", isGiven: false, isRight: false};

                const onAnswerInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    //console.log(e.currentTarget.value)
                    setAnswers(answers.map(el => {
                        if (el.objId !== obj._id)
                            return el;
                        else
                            return {...el, answer: e.currentTarget.value}
                    }))
                }
                const onOkClickHandler = () => {
                    // Записываем результат в БД
                    const date = new Date().toLocaleString('ru-RU');
                    dispatch(setObjectiveResultThunk({
                        userId: userId,
                        objectiveId: obj._id,
                        title: obj.title,
                        content: obj.content,
                        answer: obj.answer,
                        result: answerInput?.answer.toLowerCase().trim() || "",
                        date: date
                    }))

                    if (answerInput?.answer.toLowerCase().trim() === obj.answer.toLowerCase().trim()) {
                        //window.alert("Right");
                        // выставляем значения isGiven: true, isRight: true
                        setAnswers(answers.map(el => {
                            if (el.objId !== obj._id) return el;
                            else return {...el, isGiven: true, isRight: true}
                        }))
                    }
                    else {
                        //выставляем значения isGiven: true, isRight: false
                        setAnswers(answers.map(el => {
                            if (el.objId !== obj._id) return el;
                            else return {...el, isGiven: true, isRight: false}
                        }))
                        //window.alert("Wrong")
                    }
                }

                let cssForTextField = s1.content_answer_div;
                if (answerInput && answerInput.isGiven)
                    if (answerInput.isRight) cssForTextField = cssForTextField + " " + s1.content_answer_div_success;
                    else cssForTextField = cssForTextField + " " + s1.content_answer_div_error;

                return <div key={obj._id} className={s1.content_one_objective_div}>

                    <Typography variant={'h5'}>{obj.title}</Typography>

                    { obj.picture && <img src={baseObjectiveImageUrl+obj.picture} width={250} height={250}/> }

                    <Typography>{obj.content}</Typography>

                    <Typography>Ваш ответ:</Typography>
                    <input type={'text'}
                               value={answerInput?.answer || ""}
                               onChange={(e) => onAnswerInputChange(e)}
                               className={cssForTextField}
                               disabled={answerInput?.isGiven}
                    />
                    <Button onClick={onOkClickHandler} disabled={answerInput?.isGiven}>OK</Button>

                </div>
            })
        }
    </div>
}

export default ObjectiveContent;