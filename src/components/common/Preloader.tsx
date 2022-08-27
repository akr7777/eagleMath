import imageSrc from "./../../assets/preloader/preloader3.gif";
import s from './commonCSS.module.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Preloader = () => {
    /*return <div className={s.preloaderDiv}>
        <img src={imageSrc} className={s.preloaderImage}/>
    </div>*/
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
    >
        <CircularProgress color="inherit" />
    </Backdrop>
}

export default Preloader;