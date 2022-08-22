import imageSrc from "./../../assets/preloader/preloader3.gif";
import s from './commonCSS.module.css';

const Preloader = () => {
    return <div className={s.preloaderDiv}>
        <img src={imageSrc} className={s.preloaderImage}/>
    </div>
}

export default Preloader;