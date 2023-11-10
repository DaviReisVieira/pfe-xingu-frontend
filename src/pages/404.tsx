import Link from 'next/link'

import styles from '../styles/pages/404.module.css'
import Head from 'next/head'

export default function NotFound() {
  return (<>
    <Head>
      <title>Erro - Aldeia Kamaiurá</title>
    </Head>
    <div className={styles.container}>
      <h1>404 - Página não encontrada.</h1>
      <Link href="/">
        <p>
          Voltar
        </p>
      </Link>
    </div>
  </>
  )
}