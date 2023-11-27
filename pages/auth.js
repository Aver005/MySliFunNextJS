import React from 'react';
import Head from 'next/head';
import Header from '@components/Header';

const AuthPage = () => 
{
    return (
        <div>
            <Head>
                <title>Авторизация</title>
            </Head>
            <Header 
                pagePath='Главная > Авторизация'
                title='Авторизация'
            />
        </div>
    );
};

export default AuthPage;
