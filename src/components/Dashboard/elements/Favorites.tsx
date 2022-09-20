import React, {useEffect} from 'react';
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {getAllTasksThunk, getFavoritesThunk} from "../../features/tasksSlice";
import {getAllCategoriesThunk} from "../../features/categoriesSlice";
import {FavoriteContent, FavoriteContentOutputType} from "../utils/utils";
import {getAllMaterialsThunk} from "../../features/materialsSlice";

const FavoriteMaterials = () => {

    const dispatch = useAppDispatch();
    const userId = useSelector((state: RootState) => state.auth.user.id);
    useEffect(() => {
        dispatch(getAllTasksThunk());
        dispatch(getAllMaterialsThunk());
        dispatch(getAllCategoriesThunk());
        dispatch(getFavoritesThunk(userId));
    }, [userId]);

    /*const favoriteIds = useSelector((state: RootState) => state.dashboard.favoriteContent);
    const categories = useSelector((state:RootState) => state.categories.categories);
    const tasks = useSelector((state:RootState) => state.materials.materials);
    const materials = useSelector((state:RootState) => state.tasks.tasks);*/
    const list:Array<FavoriteContentOutputType> = FavoriteContent();

    console.log('FavoriteMaterials / list=', list)

    return <>
        <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
            {
                list.map(item => {
                    return <>
                        <div>
                            {item.type} --- {item.path} --- {item.label}
                        </div>
                    </>
                })
            }
        </Typography>
    </>
}

export default FavoriteMaterials;