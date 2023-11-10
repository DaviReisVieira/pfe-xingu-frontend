import React from 'react';
import CadastroForm from '../components/CadastroForm';
import Head from 'next/head';

import styles from "../styles/pages/Cadastro.module.css";


const CadastroPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Cadastro - Aldeia Kamaiurá</title>
            </Head>
            <div className={styles.container}>
                <h1>Cadastro de Usuário</h1>
                <CadastroForm />
            </div>
        </>
    );
};

export default CadastroPage;
