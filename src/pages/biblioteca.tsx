import MenuBox from "@/components/MenuBox";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import styles from "../styles/pages/Biblioteca.module.css";
import { api } from "@/services/api";
import { LoadingBox } from "@/components/LoadingBox";
import { useRouter } from "next/router";

export default function Dashboard() {
    const { user, logOut } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [livros, setLivros] = useState<DocumentProps[] | any>()

    const router = useRouter();

    useEffect(() => {
        async function getAllLivros() {
            try {
                const response = await api.get('/files/livros');

                setLivros(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        getAllLivros();
    }, [])

    const downloadFile = async (url_link: string) => {
        // router.push(url_link);
        window.open(url_link, '_blank');

    }


    return (
        <>
            <Head>
                <title>Biblioteca - Aldeia Kamaiurá</title>
            </Head>


            <div className={styles.container}>
                <h1>Livros e Documentos</h1>
                {isLoading ? (<LoadingBox />) : (<ul className={styles.bookList}>
                    {livros.map((e: DocumentProps) => {
                        return (
                            <li key={e.id}>
                                <h2>{e.title}</h2>
                                <p>{e.description}</p>
                                <button onClick={() => { downloadFile(e.url) }}>Visualizar</button>
                            </li>
                        )
                    })}
                </ul>)}
            </div>
        </>
    )
}