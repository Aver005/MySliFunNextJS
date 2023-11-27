import styles from '@styles/components/LeftSideMenu.module.css';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LeftSideMenu = ({ links }) => 
{
    const router = useRouter();
    console.log(links);

    return (
        <div className={styles.LeftSideMenu}>
            <div className={styles.LeftSideMenuContainer}>
                {Object.entries(links).map(([label, url]) => 
                (
                    <Link key={url} href={url} className={router.pathname === url ? styles.Selected : ''}>
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LeftSideMenu;