import { Fetch } from '@api';
import Content from '@components/Content';

import Header from '@components/Header';
import LeftSideMenu from '@components/menus/LeftSideMenu';
import Releases from '@components/releases/ReleasesBlock';
import Head from 'next/head';

export default function Home({ items }) 
{
    return (
        <page>
            <Head>
                <title>MySliFun: Главная</title>
            </Head>
            
            <Header 
                pagePath='Главная' 
                title='MySliFun' 
            />

            <LeftSideMenu links={{
                "Главная": "/",
                "Новости": "/news",
                "Релизы": "/releases",
                "Поиск": "/search",
                "О нас": "/about"
            }} />

            <Content>
                <Releases></Releases>
            </Content>
        </page>
    )
}

export async function getServerSideProps() 
{
    return {
        props: {
            items: (await Fetch('artists', 'Get')).Artists,
        },
    };
}
