import Container from "@mui/material/Container";
import s from './materials.module.css';
import Typography from "@mui/material/Typography";
import ControlledAccordions123 from "./_Acc";
import ControlledTreeView from "./MaterialsTree";

const Materials = () => {
    return <>
        <Container className={s.wrapped_div}>
            <div>
                <Typography variant={'h4'}>Материалы</Typography>
            </div>
            <div>
                <Typography variant={'h6'}>
                    На данной странице Вы можете найти метериалы для обучения
                </Typography>
            </div>
            <div>
                <ControlledTreeView/>
            </div>

            {/*<ControlledAccordions123/>*/}

        </Container>
    </>
}

export default Materials;