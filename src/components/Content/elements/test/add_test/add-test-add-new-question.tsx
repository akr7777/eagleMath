import {TestContentType} from "../../../../../store/features/tasksSlice";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import s1 from "../../../content.module.css";
import {v4} from 'uuid';
import Button from "@mui/material/Button";
import {useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';

type AddTestAddNewQuestionType = {
    onQuestionAdding: (question: TestContentType) => void,
    question?: string,
    options?: Array<string>,
    answer?: string,
}

const AddTestAddNewQuestion = (props: AddTestAddNewQuestionType) => {

    const [question, setQuestion] = useState<string>(props.question || '');
    const [options, setOptions] = useState<Array<string>>(props.options || []);
    const [newCurrentOption, setNewCurrentOption] = useState<string>('');
    const [answer, setAnswer] = useState<string>(props.answer || '');
    const [error, setError] = useState<string>('');

    const deleteOption = (opt: string) => {
        setOptions(options.filter(el => el !== opt));
        if (opt === answer)
            setAnswer('');
    }

    const onAddButtonClickHandler = () => {
        if (question && options.length > 1 && answer) {
            const newQuestion: TestContentType = {
                questionId: v4(),
                question: question,
                options: options,
                answer: answer,
            }
            props.onQuestionAdding(newQuestion);
            setQuestion('');
            setOptions([]);
            setNewCurrentOption('');
            setAnswer('');
            setError('');
        } else {
            if (!answer)
                setError('Не указан правильный ответ');
            if (options.length <= 1)
                setError('Мало вариантов ответа');
            if (!question)
                setError('Поле вопрос не заполнено');
        }
    }

    return <div className={s1.add_question_div}>
        <Typography variant={'h5'}>Добавить новый вопрос:</Typography>
        <>
            <label>Вопрос:</label>
            <TextField
                variant={'outlined'}
                multiline
                maxRows={15}
                className={s1.add_question_question_title}
                value={question}
                onChange={(e) => setQuestion(e.currentTarget.value)}
            />
        </>

        <>
            <label>Вариант ответа:</label>
            <TextField
                variant={'outlined'}
                multiline
                maxRows={15}
                className={s1.add_question_question_title}
                value={newCurrentOption}
                onChange={(e) => setNewCurrentOption(e.currentTarget.value)}
            />
            <Button
                variant={'outlined'}
                className={s1.add_question_button_add}
                onClick={() => {
                    if (newCurrentOption) {
                        setOptions([...options, newCurrentOption])
                        setNewCurrentOption('');
                    }
                }}
            >Добавить вариант ответа
            </Button>
        </>

        <> {
            options.length > 0 && <fieldset className={s1.options_fieldset}>
                <legend>Выберите правильный ответ:</legend>
                {
                    options.map((opt, index) => <div key={index} className={s1.options_fieldset_one_option}>
                        {
                            opt === answer
                                ? <input type={'radio'} value={opt} checked={true}/>
                                : <input type={'radio'} value={opt} checked={false} onChange={() => setAnswer(opt)}/>
                        }
                        <Typography
                            className={s1.options_fieldset_text}
                            variant={opt === answer ? "h5" : "body1"}
                        > {opt} </Typography>

                        <ClearIcon cursor={'pointer'} onClick={() => deleteOption(opt)}/>

                    </div>)
                }
            </fieldset>
        }

        </>

        <>
            {error && <Typography color={'red'}>{error}</Typography>}
        </>

        <>
            <Button
                variant={'contained'}
                className={s1.add_question_button_add}
                onClick={onAddButtonClickHandler}
            >
                Добавить новый вопрос
            </Button>
        </>

    </div>
}

export default AddTestAddNewQuestion;