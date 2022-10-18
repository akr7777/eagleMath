import s1 from "../content.module.css";
import {baseContentImageUrl, ContentType, moveParagraphThunk} from "../../features/contentSlice";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store/store";
import {Typography} from "@mui/material";

type ContentImagePropsType = {
    content: string,
    type: "Title" | "Text" | "Image" | null,
    elementIndex: number,
}

const ContentParagraph = (props: ContentImagePropsType) => {
    const dispatch = useAppDispatch();
    const isAdmin = useSelector((state: RootState) => state.auth.user.isAdmin);
    const content: Array<ContentType> = useSelector((state: RootState) => state.content.content);
    const contentId = content[0].contentId;

    const moveParagraphClickHandler = async (direction: 'up' | 'down') => {
        //[content[props.elementIndex - 1], content[props.elementIndex]] = [content[props.elementIndex - 1], content[props.elementIndex]]
        dispatch(moveParagraphThunk({contentId: contentId, elementIndex: props.elementIndex, direction: direction}));
    }


    return <>
        {
            isAdmin
                ? <div className={s1.paragraph_div_admin}>
                    <div>
                        {props.type === "Title" && <Typography variant={'h4'}>{props.content}</Typography>}
                        {props.type === "Text" && <Typography>{props.content}</Typography>}
                        {props.type === "Image" && <img src={baseContentImageUrl + props.content} className={s1.imageClass}/>}
                    </div>
                    <div className={s1.paragraph_div_admin_right_part}>
                        { props.elementIndex > 0 && <KeyboardArrowUpIcon cursor={'pointer'} onClick={() => moveParagraphClickHandler("up")}/>}
                        { props.elementIndex < (content.length - 1) && <KeyboardArrowDownIcon cursor={'pointer'} onClick={() => moveParagraphClickHandler("down")}/>}
                    </div>

                </div>
                : <img src={baseContentImageUrl + props.content} className={s1.imageClass}/>
        }
    </>
}

export default ContentParagraph;