import styles from '@styles/components/artists/ArtistsBlock.module.css';
import Artist from '@components/artists/ArtistBlock';

import { Fetch } from '@api';
import { useState, useEffect } from 'react';

const Artists = () => 
{
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => 
    {
        const fetchData = async () =>  
        {
            try 
            {
                const data = await Fetch('artists', 'Get');
                console.log(data);
                setArtists(data.Artists);
                setLoading(false);
            } 
            catch (error) 
            {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.Artists}>
            {loading ? 
            (
                <p>Загрузка данных...</p>
            ) 
            : 
            (
                artists.map((artist) => 
                (
                    <Artist key={artist.ID} {...artist} />
                ))
            )}
        </div>
    );
};

export default Artists;
