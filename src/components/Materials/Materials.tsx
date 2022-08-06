import Container from "@mui/material/Container";
import s from './materials.module.css';
import Typography from "@mui/material/Typography";
import ControlledAccordions123 from "./Acc";

const Materials = () => {
    return <>
        <Container className={s.wrapped_div}>
            <Typography variant={'h4'}>
                Материалы
            </Typography>
            <Typography variant={'h6'}>
                На данной странице Вы можете найти метериалы для обучения
            </Typography><Typography variant={'h6'}>
                Математика
            </Typography>
            <ControlledAccordions123/>
        </Container>
    </>
}

export default Materials;