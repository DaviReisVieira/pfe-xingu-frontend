import styles from "../styles/pages/Index.module.css";

import Head from "next/head";
import { GetServerSideProps } from "next";

import SVGIconComponent from "@/components/SVGIconComponent";
import { useRouter } from "next/router";



export default function Login() {
  const router = useRouter();

  const clickSite = (site: string) => () => {
    router.push(`/${site}`);
  }
  return (
    <>
      <Head>
        <title>Portal - Aldeia Kamaiurá</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.formsContainer}>
          <div className={styles.imgContainer}>
            <SVGIconComponent width={254} height={250} />
          </div>
          <h2>Seja bem-vindo(a)!</h2>
          <div className={styles.divContainer}>
            <button onClick={clickSite('sistema')}>Sistema Kamaiurá</button>
            <button onClick={clickSite('biblioteca')}>Biblioteca Digital</button>
            <button onClick={clickSite('downloads')}>Baixar Arquivos</button>
          </div>
        </div>
      </div>
      <div id="bg">
        <div className={
          [styles.ball, styles.top].join(' ')
        }></div>
        <div className={
          [styles.ball, styles.bottom].join(' ')
        }></div>
      </div>
      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { ["PfeXinguInsper.accessToken"]: accessToken } = parseCookies(ctx);

  // if (accessToken) {
  //   return {
  //     redirect: {
  //       destination: "/dashboard",
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
