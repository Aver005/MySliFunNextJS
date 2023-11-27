import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';

const RegisterPage = () => 
{
    return (
        <div>
            <Head>
                <title>Регистрация</title>
            </Head>
            <Header 
                pagePath='Главная > Регистрация'
                title='Регистрация'
            />
        </div>
    );
};

export default RegisterPage;
