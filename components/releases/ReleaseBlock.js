import styles from '@styles/components/releases/ReleaseBlock.module.css';
import { Fetch } from '@api';
import Link from 'next/link';

const Release = ({ID, Name, Artists, CoverURL}) => 
{
    return (
        <div className={styles.Release}>
            <img src={CoverURL}/>
            <Link href='/releases/'><strong>{Name}</strong></Link>
            <Link href='/'><small>{Artists}</small></Link>
        </div>
    );
};

export default Release;
