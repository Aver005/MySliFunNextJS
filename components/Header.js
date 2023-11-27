import styles from '@styles/components/Header.module.css';
import React from 'react';
import Link from 'next/link';

const Header = ({ pagePath, title }) => 
{
    return (
        <header className={styles.Header}>
            <div className={styles.HeaderContainer}>
                <Link href='/'><span>{ pagePath }</span></Link>
                <h1>{ title }</h1>
            </div>
        </header>
    );
};

export default Header;
