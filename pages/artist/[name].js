import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Fetch } from '@api';

import Head from 'next/head';
import Header from '@components/Header';
import LeftSideMenu from '@components/menus/LeftSideMenu';
import Releases from '@components/releases/ReleasesBlock';
import Content from '@components/Content';

const Artist = () =>
{
    const [artist, setArtist] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => 
    {
        const fetchData = async () =>  
        {
            const profileName = router.query.name;
            if (!profileName)
                return;
            
            try 
            {
                const d = {"pn": profileName};
                const info = await Fetch('artist', 'Get', "v1", d);
                setArtist(info);
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
        <div>
            {loading ? 
            (
                <p></p>
            ) 
            : 
            (
                <page>
                    <Head>
                        <title>{ artist.Name }</title>
                    </Head>
                    <Header 
                        pagePath={'Главная > Артисты > ' + artist.Name}
                        title={ artist.Name }
                    />
                    <LeftSideMenu />
                    <Content>
                        <p className='Desciption'>{ artist.Description }</p>
                        <Releases />
                    </Content>
                </page>
            )}
        </div>
    )
}

export default Artist;
