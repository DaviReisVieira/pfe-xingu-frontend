import MenuBox from "@/components/MenuBox";
import { AuthContext } from "@/contexts/AuthContext";
import Head from "next/head";
import { useContext, useEffect } from "react";

import styles from "../styles/pages/Downloads.module.css";
import { api } from "@/services/api";
import Image from "next/image";

export default function Dashboard() {
    useEffect(() => {
    }, [])


    async function getItens(name: string) {
        const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/download/${name}`
        if (typeof window !== "undefined") {
            window.location.href = URL
        }
    }

    async function getItensFromWeb(URL: string) {
        if (typeof window !== "undefined") {
            window.location.href = URL
        }
    }

    return (
        <>
            <Head>
                <title>Downloads - Aldeia Kamaiurá</title>
            </Head>


            <div className={styles.container}>
                <h1>Baixar Itens</h1>
                <ul className={styles.downloadList}>
                    {/* <li>
                        <h2>Certificado de Internet</h2>
                        <Image src="/images/internet.png" width={100} height={100} alt={"Android logotipo"} />
                        <p>Baixar o certificado de internet, importante para acessar o sistema.</p>
                        <button onClick={() => getItens('certificado')}>Download</button>
                    </li> */}
                    <li>
                        <h2>Conversa para IPhone</h2>
                        <Image src="/images/ios.png" width={100} height={100} alt={"iOS logotipo"} />
                        <p>Baixar o aplicativo de conversa por voz e texto para IPhone</p>
                        <button onClick={() => getItensFromWeb('https://apps.apple.com/us/app/mumble/id443472808')}>Download</button>
                    </li>
                    <li>
                        <h2>Conversa para Android</h2>
                        <Image src="/images/android.png" width={100} height={100} alt={"Android logotipo"} />
                        <p>Baixar o aplicativo de conversa por voz e texto para Android</p>
                        <button onClick={() => getItensFromWeb('https://play.google.com/store/apps/details?id=se.lublin.mumla')}>Download</button>
                    </li>

                </ul>
            </div>
        </>
    )
}