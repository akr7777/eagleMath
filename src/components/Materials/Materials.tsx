import Container from "@mui/material/Container";
import s from "../common/commonCSS.module.css";
import Typography from "@mui/material/Typography";
import {RootState, useAppDispatch} from "../../store/store";
import {
    addMaterialToFavoritesThunk,
    deleteMaterialFromFavoritesThunk,
    getAllMaterialsThunk, getFavoritesThunk
} from "../features/materialsSlice";
import React, {useEffect} from "react";
import {Tree5} from "../common/Tree/Tree5";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader";
import {getAllCategoriesThunk, IdFiledType} from "../features/categoriesSlice";

const Materials = () => {

    const userId = useSelector((state: RootState) => state.auth.user.id);
    const isLoading = useSelector((state: RootState) => state.materials.isLoading);
    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllCategoriesThunk());
        dispatch(getAllMaterialsThunk());
        if (userId !== '0') dispatch(getFavoritesThunk(userId))
    }, []);

    const categories = [...useSelector((state: RootState) => state.categories.categories)];
    const materials = [...useSelector((state: RootState) => state.materials.materials)];
    const favoritesIds = useSelector((state: RootState) => state.materials.favoriteMaterialIds);

    const addToFavorite = (contentId: IdFiledType) => {
        //dispatch(addIdToFavoritesMaterialsAC(userId, contentId));
        dispatch(addMaterialToFavoritesThunk({userId, contentId}))
    }
    const deleteFromFavorite = (contentId: IdFiledType) => {
        //dispatch(deleteIdFromFavoritesMaterialsAC(userId, contentId))
        dispatch(deleteMaterialFromFavoritesThunk({userId, contentId}))

    }

    return <>
        {
            isLoading
                ? <Preloader/>
                : <Container className={s.wrapped_div}>
                    <div className={s.someDiv1}>
                        <Typography variant={'h4'}>Материалы</Typography>
                    </div>
                    <div className={s.someDiv1}>
                        <Typography variant={'h6'}>
                            На данной странице Вы можете найти метериалы для обучения
                        </Typography>
                    </div>

                    <div className={s.someDiv1}>
                        <Tree5
                            categories={categories}
                            materials={materials}
                            addToFavorite={addToFavorite}
                            deleteFromFavorite={deleteFromFavorite}
                            favoritesIds={favoritesIds}
                        />
                    </div>

                </Container>
        }
    </>
}

export default Materials;