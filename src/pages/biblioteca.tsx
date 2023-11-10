import MenuBox from "@/components/MenuBox";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import { useContext, useEffect } from "react";

import styles from "../styles/pages/Biblioteca.module.css";

export default function Dashboard() {
    const { user, logOut } = useContext(AuthContext);

    useEffect(() => {
    }, [])


    return (
        <>
            <Head>
                <title>Dashboard - Aldeia Kamaiurá</title>
            </Head>


            <div className={styles.container}>
                <h1>Livros</h1>
                <ul className={styles.bookList}>
                    <li>
                        <h2>Os Kamaiurá</h2>
                        <p>Descrição do livro</p>
                        <button>Download</button>
                    </li>

                </ul>
            </div>
        </>
    )
}