import React from 'react';
import s from './header.module.css';
import headerImage from './../../assets/images/headerImage.jpeg';

export const Header = () => {
    return <div>
        <img
            className={s.header_wrapper}
            src={headerImage}
        />
    </div>
}