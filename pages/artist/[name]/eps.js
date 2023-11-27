import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Fetch } from '@api';

import Header from '@components/Header';
import LeftSideMenu from '@components/menus/LeftSideMenu';
import Releases from '@components/releases/ReleasesBlock';

const ArtistEPs = () =>
{
    return (
        <page>
            <Header 
                pagePath={'Главная > Артисты > ' + artist.Name}
                title={artist.Name}
            />
            <LeftSideMenu />

            <div className='Content'>
                <p className='Desciption'>{artist.Description}</p>
                <Releases></Releases>
            </div>
        </page>
    )
}

export default ArtistEPs;
