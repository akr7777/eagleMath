import s from "./commonCSS.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import AddIcon from "@mui/icons-material/Add";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import ReadThisMaterial from "@mui/icons-material/AutoStories";

const MaterialTaskHead = () => {

    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);

    return <div className={s.mat_task_div}>
        { isAdmin &&
            <div className={s.mat_task_inner_div}>
                {/*Edit this material. For admin only*/}
                <Typography>Редактировать название</Typography>
                <ModeEditIcon />
            </div>
        }

        { isAdmin &&
            <div className={s.mat_task_inner_div}>
                {/*Edit this material. For admin only*/}
                <Typography>Избранное (добавить или удалить)</Typography>
                <StarIcon />
            </div>
        }

        { isAdmin &&
            <div className={s.mat_task_inner_div}>
                {/*Move to other folder (category)*/}
                <Typography>Переместить в другую категорию</Typography>
                <DriveFileMoveIcon />
            </div>
        }

        { isAdmin &&
            <div className={s.mat_task_inner_div}>
                {/*delete category*/}
                <Typography>Удалить категорию</Typography>
                <DeleteSweepIcon />
            </div>
        }

        { isAdmin &&
            <div className={s.mat_task_inner_div}>
                {/*add Material Or Task*/}
                <Typography>Добавить материал/задачу</Typography>
                <AddIcon />
            </div>
        }

        { isAdmin &&
            <div className={s.mat_task_inner_div}>
                {/*Add new category*/}
                <Typography>Добавить категорию</Typography>
                <LibraryAddIcon />
            </div>
        }

        { isAdmin &&
            <div className={s.mat_task_inner_div}>
                {/*Edit this material. For admin only*/}
                <Typography>Прочитать материал/задачу</Typography>
                <ReadThisMaterial />
            </div>
        }
    </div>
}

export default MaterialTaskHead;