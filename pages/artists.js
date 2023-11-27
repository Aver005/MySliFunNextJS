import React from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Artists from '@components/artists/ArtistsBlock';
import Content from '@components/Content';

const ArtistsPage = () => 
{
    return (
        <div>
            <Head>
                <title>Все артисты</title>
            </Head>
            <Header
                pagePath='Главная > Артисты'
                title='Все артисты'
            />
            <Content large={true}>
                <Artists />
            </Content>
        </div>
    );
};

export default ArtistsPage;
