import styles from '@styles/components/releases/ReleasesBlock.module.css';
import Release from '@components/releases/ReleaseBlock';

import { Fetch } from '@api';
import { useState, useEffect } from 'react';

const Releases = ({ artistID }) => 
{
    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    if (!artistID) artistID = -1;

    useEffect(() => 
    {
        const fetchData = async () =>  
        {
            try 
            {
                const data = await Fetch('releases', 'Get', 'v1', {
                    'artistID': artistID
                });

                setReleases(data.Releases);
                setLoading(false);
            } 
            catch (error) 
            {
                console.error('Error fetching data:', error);
                setLoading(true);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.Releases}>
            {loading ? 
            (
                <p>Загрузка данных...</p>
            ) 
            : 
            (
                releases.map((release) => (
                    <Release key={release.ID} {...release} />
                ))
            )}
        </div>
    );
};

export default Releases;
