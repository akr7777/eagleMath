import React from 'react';
import s from './header.module.css';

export const Header = () => {
    return <div>
        <img
            className={s.header_wrapper}
            src={'https://rusmystery.ru/wp-content/uploads/2018/11/enisey1.jpg'}
        />
    </div>
}