import {useDispatch, useSelector} from "react-redux";
import {getPosts, InitStatePostsType} from './../features/postSlice';
import {RootState, useAppDispatch} from "../../store/store";

export const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useSelector((state:RootState) => state.posts.posts);
    console.log('Posts/posts=' , posts)

    return (<div>
        POSTS:
        <button
            onClick={ () => dispatch(getPosts()) }
        >Get posts
        </button>
        <div>{ posts && posts.map( (p) => <div key={p.id}>{p.title}</div>) }</div>
    </div>);
}