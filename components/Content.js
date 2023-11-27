import styles from '@styles/components/Content.module.css';
import React from 'react';
import Link from 'next/link';

const Content = ({ large, children }) => 
{
    if (!large) {large = false;}

    return (
        <div className={large ? styles.Content : styles.SmallContent}>
            { children }
        </div>
    );
};

export default Content;
