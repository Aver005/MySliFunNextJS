import React from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Content from '@components/Content';
import Releases from '@components/releases/ReleasesBlock';

const ReleasesPage = () => 
{
    return (
        <div>
            <Head>
                <title>Все релизы</title>
            </Head>
            <Header
                pagePath='Главная > Релизы'
                title='Все релизы'
            />
            <Content large={true}>
                <Releases />
            </Content>
        </div>
    );
};

export default ReleasesPage;
