import styles from '@styles/components/artists/ArtistBlock.module.css';
import Link from 'next/link';

import { Fetch } from '@api';

const Artist = ({ID, Name, CoverURL, ProfileName}) => 
{
    return (
        <div className={styles.Artist}>
            <img src={CoverURL}/>
            <Link href={'/artist/' + ProfileName}>
                <strong>{Name}</strong>
            </Link>
        </div>
    );
};

export default Artist;
